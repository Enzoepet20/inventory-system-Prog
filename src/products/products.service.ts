import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(query: QueryProductDto) {
    const { page = 1, limit = 10, orderBy = 'name', search } = query;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { category: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const products = await this.prisma.product.findMany({
      where,
      orderBy: { [orderBy]: 'asc' }, // Orden dinámico
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.prisma.product.count({ where });

    return {
      total,
      page,
      limit,
      products,
    };
  }

  async findById(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }

  async update(productId: number, updateProductDto: UpdateProductDto) {
    const product = await this.findById(productId);
    return await this.prisma.product.update({
      where: { id: product.id },
      data: updateProductDto,
    });
  }

  async remove(productId: number) {
    await this.findById(productId); // Verifica si existe
    return await this.prisma.product.delete({
      where: { id: productId },
    });
  }
}
