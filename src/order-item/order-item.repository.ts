import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderItem } from '@prisma/client';

@Injectable()
export class OrderItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<OrderItem[]> {
    return this.prisma.orderItem.findMany();
  }

  async findById(id: number): Promise<OrderItem | null> {
    return this.prisma.orderItem.findUnique({ where: { id } });
  }

  async create(data: Omit<OrderItem, 'id'>): Promise<OrderItem> {
    return this.prisma.orderItem.create({ data });
  }

  async update(id: number, data: Partial<Omit<OrderItem, 'id'>>): Promise<OrderItem> {
    return this.prisma.orderItem.update({ where: { id }, data });
  }

  async delete(id: number): Promise<OrderItem> {
    return this.prisma.orderItem.delete({ where: { id } });
  }
}
