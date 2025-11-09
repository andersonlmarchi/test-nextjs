import { Test, TestingModule } from '@nestjs/testing';
import { InstallmentService } from './installment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Installment } from './installment.entity';

describe('InstallmentService', () => {
  let service: InstallmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstallmentService,
        {
          provide: getRepositoryToken(Installment),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<InstallmentService>(InstallmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
