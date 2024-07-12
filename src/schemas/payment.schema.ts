import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PaymentStatus } from 'src/app.types';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop()
  paymentId: number;

  @Prop()
  date: string;

  @Prop()
  status: PaymentStatus;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
