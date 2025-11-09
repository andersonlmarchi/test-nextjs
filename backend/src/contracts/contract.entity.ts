import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Installment } from '../installments/installment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('contracts')
export class Contract {
  @ApiProperty({ example: 1, description: 'ID do Contrato' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '0482599770000000000001669920131221',
    description: 'Número do Contrato',
  })
  @Column({ name: 'contract_number', type: 'varchar', length: 50 })
  contractNumber: string;

  @ApiProperty({ example: '2025-09-27', description: 'Data do Contrato' })
  @Column({ name: 'contract_date', type: 'date' })
  contractDate: Date;

  @ApiProperty({ example: '550.00', description: 'Valor total' })
  @Column({ name: 'total_value', type: 'numeric', precision: 12, scale: 2 })
  totalValue: number;

  @ApiProperty({ example: '55.65', description: 'Valor de entrada' })
  @Column({ name: 'entry_value', type: 'numeric', precision: 12, scale: 2 })
  entryValue: number;

  @ApiProperty({ example: '98.87', description: 'Valor financiado' })
  @Column({ name: 'financed_value', type: 'numeric', precision: 12, scale: 2 })
  financedValue: number;

  @OneToMany(() => Installment, (installment) => installment.contract, {
    cascade: true,
  })
  installments: Installment[];
}
