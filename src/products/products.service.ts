import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return await this.prisma.product.findMany();
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
