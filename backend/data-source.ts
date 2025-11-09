import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Contract } from 'src/contracts/contract.entity';
import { Installment } from 'src/installments/installment.entity';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Contract, Installment],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  synchronize: false,
});
