import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async findById(id: number): Promise<Customer | null> {
    return this.customerRepository.findById(id);
  }

  async create(data: Omit<Customer, 'id'>): Promise<Customer> {
    return this.customerRepository.create(data);
  }

  async update(id: number, data: Partial<Omit<Customer, 'id'>>): Promise<Customer> {
    return this.customerRepository.update(id, data);
  }

  async delete(id: number): Promise<Customer> {
    return this.customerRepository.delete(id);
  }
}
