import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './schemas/user.schema';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { AppDbService } from './app.db';
import { getDbUri } from './db/db';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(getDbUri()),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, AppDbService],
})
export class AppModule {}
