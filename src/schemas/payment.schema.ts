import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PaymentStatus } from 'src/app.types';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop({ required: true, index: true, unique: true })
  paymentId: number;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  status: PaymentStatus;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
