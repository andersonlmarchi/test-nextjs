import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { Contract } from './contract.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { Data } from 'src/types/data.type';

@ApiTags('Contratos')
@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @ApiResponse({ status: 200, description: 'Cria um novo contrato' })
  @Post()
  async createContract(
    @Body() contractData: Partial<Contract>,
  ): Promise<Contract> {
    return this.contractService.createContract(contractData);
  }

  @ApiResponse({ status: 200, description: 'Upload de arquivo JSON' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const stream = Readable.from(file.buffer);
    await this.contractService.processContractsStream(stream);
    return { message: 'Arquivo processado com sucesso' };
  }

  @ApiResponse({ status: 200, description: 'Lista todos os contratos' })
  @Get()
  async findAll(): Promise<Contract[]> {
    return this.contractService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Lista os dados do contrato' })
  @Get(':id')
  async findByContractId(@Body('id') id: number): Promise<Contract | null> {
    return this.contractService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Lista os totalizadores de contratos',
  })
  @Get('data/list')
  async findAllContractData(): Promise<Data> {
    return this.contractService.findAllContractData();
  }
}
