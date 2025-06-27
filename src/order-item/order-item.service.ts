import { Injectable } from '@nestjs/common';
import { OrderItemRepository } from './order-item.repository';
import { OrderItem } from '@prisma/client';

@Injectable()
export class OrderItemService {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.findAll();
  }

  async findById(id: number): Promise<OrderItem | null> {
    return this.orderItemRepository.findById(id);
  }

  async create(data: Omit<OrderItem, 'id'>): Promise<OrderItem> {
    return this.orderItemRepository.create(data);
  }

  async update(id: number, data: Partial<Omit<OrderItem, 'id'>>): Promise<OrderItem> {
    return this.orderItemRepository.update(id, data);
  }

  async delete(id: number): Promise<OrderItem> {
    return this.orderItemRepository.delete(id);
  }
}
