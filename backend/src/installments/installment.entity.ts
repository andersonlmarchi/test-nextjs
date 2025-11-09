import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Contract } from '../contracts/contract.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('installments')
export class Installment {
  @ApiProperty({ example: '4', description: 'ID da Parcela' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '2020-09-30',
    description: 'Data de vencimento da parcela',
  })
  @Column({ name: 'due_date', type: 'date' })
  dueDate: Date;

  @ApiProperty({
    example: 100.0,
    description: 'Valor da parcela no vencimento',
  })
  @Column({ name: 'due_amount', type: 'numeric', precision: 12, scale: 2 })
  dueAmount: number;

  @ApiProperty({
    example: '2025-08-30',
    nullable: true,
    description: 'Data do último pagamento da parcela',
  })
  @Column({ name: 'last_payment_date', type: 'date', nullable: true })
  lastPaymentDate: Date | null;

  @ApiProperty({
    example: 100.0,
    description: 'Valor total pago até o momento',
  })
  @Column({ name: 'total_paid', type: 'numeric', precision: 12, scale: 2 })
  totalPaid: number;

  @ApiProperty({
    example: 400.0,
    description: 'Saldo devedor (capital em aberto)',
  })
  @Column({ name: 'open_balance', type: 'numeric', precision: 12, scale: 2 })
  openBalance: number;

  @ManyToOne(() => Contract, (contract) => contract.installments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;
}
