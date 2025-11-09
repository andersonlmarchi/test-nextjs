/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Readable } from 'stream';
import { Contract } from './contract.entity';
import { Contract as ContractType } from '../types/contract.type';
import { InstallmentService } from '../installments/installment.service';
import { Data } from 'src/types/data.type';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
    private readonly installmentService: InstallmentService,
  ) {}

  async createContract(contractData: Partial<Contract>): Promise<Contract> {
    const contract = this.contractRepository.create(contractData);
    return this.contractRepository.save(contract);
  }

  async processContractsStream(stream: Readable): Promise<void> {
    const decoder = new TextDecoder();
    let buffer = '';

    for await (const chunk of stream) {
      buffer += decoder.decode(chunk, { stream: true });
    }

    try {
      const json = JSON.parse(buffer) as { contratos: ContractType[] };

      for (const contrato of json.contratos) {
        const contract = await this.contractRepository.save({
          contractNumber: contrato.contrato,
          contractDate: new Date(contrato.data),
          totalValue: contrato.valortotal,
          entryValue: contrato.valorentrada,
          financedValue: contrato.valorfinanciado,
        });

        for (const parcela of contrato.parcelas) {
          await this.installmentService.createInstallment({
            contract,
            dueDate: new Date(parcela.datavencimento),
            dueAmount: parcela.valorvencimento,
            lastPaymentDate: parcela.dataultimopagamento
              ? new Date(parcela.dataultimopagamento)
              : null,
            totalPaid: parcela.totalpago,
            openBalance: parcela.capitalaberto,
          });
        }
        console.log(
          `Contrato ${contrato.contrato} salvo com ${contrato.parcelas.length} parcelas!`,
        );
      }

      console.log('Processamento finalizado com sucesso');
    } catch (err) {
      console.error('Erro ao processar JSON', err);
      throw err;
    }
  }

  async findAll(): Promise<Contract[]> {
    return this.contractRepository.find({ relations: ['installments'] });
  }

  async findOne(id: number): Promise<Contract | null> {
    return this.contractRepository.findOne({
      where: { id },
      relations: ['installments'],
    });
  }

  async findAllContractData(): Promise<Data> {
    let totalOpenValue = 0;
    const contracts = await this.contractRepository.find({
      relations: ['installments'],
    });

    const totalValue = contracts.reduce(
      (sum, contract) => sum + Number(contract.totalValue),
      0,
    );

    const monthOpenCount: Record<string, number> = {};
    const monthOpenValue: Record<string, number> = {};

    for (const contract of contracts) {
      if (contract.installments) {
        for (const installment of contract.installments) {
          if (installment.openBalance > 0) {
            totalOpenValue += Number(installment.openBalance);

            const date = new Date(installment.dueDate);
            const month = new Intl.DateTimeFormat('pt-BR', {
              month: '2-digit',
              year: 'numeric',
            }).format(date);

            monthOpenCount[month] = (monthOpenCount[month] || 0) + 1;
            monthOpenValue[month] =
              (monthOpenValue[month] || 0) + Number(installment.openBalance);
          }
        }
      }
    }

    const monthMostOpen = Object.entries(monthOpenCount).reduce(
      (max, [month, count]) => (count > max.count ? { month, count } : max),
      { month: '', count: 0 },
    ).month;

    const monthMostOpenValue = monthOpenValue[monthMostOpen] || 0;

    return {
      totalValue,
      monthMostOpen,
      totalOpenValue,
      totalContracts: contracts.length,
      monthMostOpenValue,
    };
  }
}
