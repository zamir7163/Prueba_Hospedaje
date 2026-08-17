import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateHabitacionDto {
  @ApiProperty({ example: '101' })
  @IsString()
  @IsNotEmpty()
  numero!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  piso!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  tipoId!: number;
}