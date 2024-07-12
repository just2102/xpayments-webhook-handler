import { Injectable } from '@nestjs/common';

import { PostPaymentRequestDto, PostPaymentResponseDto } from './app.dto';
import { AppDbService } from './app.db';
import { UserDocument } from './schemas/user.schema';
import { PaymentDocument } from './schemas/payment.schema';

import { UserNotFoundError } from './errors/user.errors';
import {
  DuplicatePaymentError,
  PaymentProcessingError,
} from './errors/payment.errors';

@Injectable()
export class AppService {
  constructor(private readonly appDbService: AppDbService) {}

  async postPayment(
    postPaymentDto: PostPaymentRequestDto,
  ): Promise<PostPaymentResponseDto> {
    if (postPaymentDto.status === 'failed') {
      return await this.handleFailedPayment(postPaymentDto);
    }

    const [existingPayment, user] = await Promise.all([
      this.appDbService.getPayment(postPaymentDto.id),
      this.appDbService.getUser(postPaymentDto.metadata.user_id),
    ]);

    if (!user) {
      throw new UserNotFoundError(postPaymentDto.metadata.user_id);
    }

    if (!existingPayment) {
      return await this.handleSuccessfulPayment(postPaymentDto, user);
    }

    if (existingPayment.status === 'success') {
      throw new DuplicatePaymentError(postPaymentDto.id);
    }

    if (existingPayment.status === 'failed') {
      return await this.handleSuccessfulPayment(
        postPaymentDto,
        user,
        existingPayment,
      );
    }

    throw new PaymentProcessingError();
  }

  private async handleSuccessfulPayment(
    postPaymentDto: PostPaymentRequestDto,
    user: UserDocument,
    existingPayment?: PaymentDocument,
  ): Promise<PostPaymentResponseDto> {
    const { newPayment, updatedUserBalance } =
      await this.appDbService.handleSuccessfulPaymentTransaction(
        postPaymentDto,
        user,
        existingPayment,
      );

    if (newPayment !== null && updatedUserBalance?.modifiedCount === 1) {
      return {
        success: true,
      };
    }

    throw new PaymentProcessingError();
  }

  private async handleFailedPayment(
    postPaymentDto: PostPaymentRequestDto,
  ): Promise<PostPaymentResponseDto> {
    await this.appDbService.createPayment(postPaymentDto);

    return {
      success: false,
      message: `Failed payment with id ${postPaymentDto.id}, no action taken, payment saved in database to notify user`,
    };
  }
}
