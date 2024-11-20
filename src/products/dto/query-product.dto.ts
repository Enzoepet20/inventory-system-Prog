import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class QueryProductDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number; // Página actual

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number; // Cantidad de productos por página

  @IsOptional()
  @IsString()
  orderBy?: string; // Campo para ordenar (ej: 'price', 'name')

  @IsOptional()
  @IsString()
  search?: string; // Búsqueda por nombre o categoría
}
