import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Nuevo nombre del producto',
    example: 'Laptop Dell XPS',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Nueva descripción del producto',
    example: 'Laptop Dell XPS 15, 16GB RAM, 512GB SSD',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Nuevo precio del producto',
    example: 999.99,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    description: 'Nueva cantidad en inventario',
    example: 30,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity?: number;
}
