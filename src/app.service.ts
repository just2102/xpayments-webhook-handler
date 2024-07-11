import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  postPayment() {
    return {
      success: true,
    };
  }
}
