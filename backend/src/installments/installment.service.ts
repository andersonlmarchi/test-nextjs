import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Installment } from './installment.entity';

@Injectable()
export class InstallmentService {
  constructor(
    @InjectRepository(Installment)
    private installmentRepository: Repository<Installment>,
  ) {}

  async createInstallment(
    installmentData: Partial<Installment>,
  ): Promise<Installment> {
    const installment = this.installmentRepository.create(installmentData);
    return this.installmentRepository.save(installment);
  }

  async findAll(): Promise<Installment[]> {
    return this.installmentRepository.find({ relations: ['contract'] });
  }

  async findOne(id: number): Promise<Installment> {
    const installment = await this.installmentRepository.findOne({
      where: { id },
      relations: ['contract'],
    });

    if (!installment) {
      throw new NotFoundException(`Parcela com ID ${id} não encontrada!`);
    }

    return installment;
  }
}
