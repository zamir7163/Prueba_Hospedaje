import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHuespedDto {
  @ApiProperty({ example: '72839401' })
  @IsString()
  @IsNotEmpty()
  docIdentidad!: string;

  @ApiProperty({ example: 'Vittor Valerio' })
  @IsString()
  @IsNotEmpty()
  nombreCompleto!: string;

  @ApiProperty({ example: '987654321', required: false })
  @IsOptional()
  @IsString()
  telefono?: string;
}