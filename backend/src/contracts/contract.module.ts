import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractController } from './contract.controller';
import { Contract } from './contract.entity';
import { ContractService } from './contract.service';
import { InstallmentModule } from '../installments/installment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contract]), InstallmentModule],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
