import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async findById(id: number): Promise<Order | null> {
    return this.prisma.order.findUnique({ where: { id } });
  }

  async create(data: Omit<Order, 'id'>): Promise<Order> {
    return this.prisma.order.create({ data });
  }

  async update(id: number, data: Partial<Omit<Order, 'id'>>): Promise<Order> {
    return this.prisma.order.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Order> {
    return this.prisma.order.delete({ where: { id } });
  }
}
