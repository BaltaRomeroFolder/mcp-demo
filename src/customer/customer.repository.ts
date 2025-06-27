import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  async findById(id: number): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  async create(data: Omit<Customer, 'id'>): Promise<Customer> {
    return this.prisma.customer.create({ data });
  }

  async update(id: number, data: Partial<Omit<Customer, 'id'>>): Promise<Customer> {
    return this.prisma.customer.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Customer> {
    return this.prisma.customer.delete({ where: { id } });
  }
}
