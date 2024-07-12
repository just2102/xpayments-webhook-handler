import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PostPaymentRequestDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  postPayment(@Body() postPaymentDto: PostPaymentRequestDto) {
    return this.appService.postPayment(postPaymentDto);
  }
}
