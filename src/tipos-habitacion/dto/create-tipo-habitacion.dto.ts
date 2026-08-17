import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTipoHabitacionDto {
  @ApiProperty({ example: 'Matrimonial' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: 120.50 })
  @IsNumber()
  @Min(0)
  precioNoche!: number;
}