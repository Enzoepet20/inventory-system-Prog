import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryProductDto {
  @ApiPropertyOptional({
    description: 'Página actual para la paginación',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: 'Cantidad de productos por página',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Campo para ordenar los productos (ej: "price", "name")',
    example: 'price',
  })
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiPropertyOptional({
    description: 'Búsqueda por nombre o categoría del producto',
    example: 'Laptop',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
