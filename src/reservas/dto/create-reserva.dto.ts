import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateReservaDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  huespedId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  habitacionId!: number;

  @ApiProperty({ example: '2026-08-20' })
  @IsDateString()
  fechaEntrada!: string;

  @ApiProperty({ example: '2026-08-22' })
  @IsDateString()
  fechaSalida!: string;
}