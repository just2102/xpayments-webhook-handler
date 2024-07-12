import {
  IsDateString,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaymentMetadata, PaymentStatus } from './app.types';
import { Type } from 'class-transformer';

export class PostPaymentRequestDto {
  @IsNumber()
  id: number;

  @IsDateString()
  date: string;

  @ValidateNested({ each: true })
  @IsNotEmptyObject()
  @Type(() => PaymentMetadata)
  metadata: PaymentMetadata;

  @IsString()
  status: PaymentStatus;

  @IsNumber()
  amount: number;
}

export class PostPaymentResponseDto {
  success: boolean;
  message?: string;
}
