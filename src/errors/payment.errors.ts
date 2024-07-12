import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicatePaymentError extends HttpException {
  constructor(paymentId: number) {
    super(
      `Successful payment with id ${paymentId} already exists`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class PaymentProcessingError extends HttpException {
  constructor() {
    super('Payment processing failed', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
