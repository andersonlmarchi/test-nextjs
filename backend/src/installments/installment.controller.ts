import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { InstallmentService } from './installment.service';
import { Installment } from './installment.entity';

@ApiTags('Parcelas')
@Controller('installments')
export class InstallmentController {
  constructor(private readonly installmentsService: InstallmentService) {}

  @ApiResponse({
    status: 200,
    description: 'Cria uma nova parcela',
  })
  @Post()
  async createInstallment(
    @Body() installmentData: Partial<Installment>,
  ): Promise<Installment> {
    return this.installmentsService.createInstallment(installmentData);
  }

  @ApiResponse({
    status: 200,
    description: 'Lista todas as parcelas',
  })
  @Get()
  async findAll(): Promise<Installment[]> {
    return this.installmentsService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Lista uma parcela pelo ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Installment> {
    return this.installmentsService.findOne(id);
  }
}
