import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';

import { Payment, PaymentDocument } from './schemas/payment.schema';
import { User, UserDocument } from './schemas/user.schema';
import { PostPaymentRequestDto } from './app.dto';
import { d } from './utils/conversion';

@Injectable()
export class AppDbService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  public async getPayment(paymentId: number): Promise<PaymentDocument | null> {
    return await this.paymentModel.findOne({ paymentId });
  }

  public async getUser(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id);
  }

  public async handleSuccessfulPaymentTransaction(
    paymentDto: PostPaymentRequestDto,
    user: UserDocument,
    existingPayment?: PaymentDocument,
  ) {
    const session = await this.userModel.startSession();
    session.startTransaction();

    try {
      const newPayment = await this.createPayment(paymentDto, existingPayment);
      const updatedUserBalance = await this.updateUserBalance(
        user,
        paymentDto.amount,
      );
      await session.commitTransaction();
      session.endSession();

      return { newPayment, updatedUserBalance };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  public async createPayment(
    paymentData: PostPaymentRequestDto,
    existingPayment?: PaymentDocument,
  ): Promise<PaymentDocument | null> {
    if (existingPayment && existingPayment.paymentId === paymentData.id) {
      existingPayment.status = paymentData.status;
      existingPayment.date = paymentData.date;

      return await existingPayment.save();
    }

    const newPayment: Payment = {
      paymentId: paymentData.id,
      date: paymentData.date,
      status: paymentData.status,
    };

    return await this.paymentModel.create(newPayment);
  }

  private async updateUserBalance(
    user: UserDocument,
    amount: number,
  ): Promise<UpdateWriteOpResult | void> {
    if (!user) {
      return;
    }

    const newBalance = d(user.balance).add(amount).toString();

    return await user.updateOne({ balance: newBalance });
  }
}
