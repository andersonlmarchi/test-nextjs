import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContractsAndInstallmentsTables1759093934894
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE contracts (
            id SERIAL PRIMARY KEY,
            contract_number VARCHAR(50) NOT NULL,
            contract_date DATE NOT NULL,
            total_value NUMERIC(12,2) NOT NULL,
            entry_value NUMERIC(12,2) NOT NULL,
            financed_value NUMERIC(12,2) NOT NULL
        )
    `);

    await queryRunner.query(`
        CREATE TABLE installments (
            id SERIAL PRIMARY KEY,
            contract_id INT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
            due_date DATE NOT NULL,
            due_amount NUMERIC(12,2) NOT NULL,
            last_payment_date DATE,
            total_paid NUMERIC(12,2) NOT NULL,
            open_balance NUMERIC(12,2) NOT NULL
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "installments"`);
    await queryRunner.query(`DROP TABLE "contracts"`);
  }
}
