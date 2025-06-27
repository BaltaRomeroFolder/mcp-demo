import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async findById(id: number): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async create(data: Omit<Order, 'id'>): Promise<Order> {
    return this.orderRepository.create(data);
  }

  async update(id: number, data: Partial<Omit<Order, 'id'>>): Promise<Order> {
    return this.orderRepository.update(id, data);
  }

  async delete(id: number): Promise<Order> {
    return this.orderRepository.delete(id);
  }
}
