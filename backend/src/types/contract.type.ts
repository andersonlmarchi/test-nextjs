import { Installment } from './installment.type';

export type Contract = {
  contrato: string;
  data: string;
  valortotal: number;
  valorentrada: number;
  valorfinanciado: number;
  parcelas: Installment[];
};
