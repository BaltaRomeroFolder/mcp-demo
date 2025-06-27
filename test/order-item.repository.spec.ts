import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemRepository } from '../../src/order-item/order-item.repository';
import { PrismaService } from '../../src/prisma/prisma.service';

const mockOrderItem = {
  id: 1,
  orderId: 1,
  productName: 'Test Product',
  quantity: 2,
  price: 10.5,
};

describe('OrderItemRepository', () => {
  let repository: OrderItemRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemRepository,
        {
          provide: PrismaService,
          useValue: {
            orderItem: {
              findMany: jest.fn().mockResolvedValue([mockOrderItem]),
              findUnique: jest.fn().mockResolvedValue(mockOrderItem),
              create: jest.fn().mockResolvedValue(mockOrderItem),
              update: jest.fn().mockResolvedValue(mockOrderItem),
              delete: jest.fn().mockResolvedValue(mockOrderItem),
            },
          },
        },
      ],
    }).compile();
    repository = module.get<OrderItemRepository>(OrderItemRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should find all order items', async () => {
    const result = await repository.findAll();
    expect(result).toEqual([mockOrderItem]);
  });

  it('should find order item by id', async () => {
    const result = await repository.findById(1);
    expect(result).toEqual(mockOrderItem);
  });

  it('should create an order item', async () => {
    const result = await repository.create({ orderId: 1, productName: 'Test Product', quantity: 2, price: 10.5 });
    expect(result).toEqual(mockOrderItem);
  });

  it('should update an order item', async () => {
    const result = await repository.update(1, { quantity: 3 });
    expect(result).toEqual(mockOrderItem);
  });

  it('should delete an order item', async () => {
    const result = await repository.delete(1);
    expect(result).toEqual(mockOrderItem);
  });
});
