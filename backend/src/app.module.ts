import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ContractModule } from './contracts/contract.module';
import { InstallmentModule } from './installments/installment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ContractModule,
    InstallmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
