import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository } from '../../src/order/order.repository';
import { PrismaService } from '../../src/prisma/prisma.service';

const mockOrder = {
  id: 1,
  customerId: 1,
  orderDate: new Date(),
};

describe('OrderRepository', () => {
  let repository: OrderRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderRepository,
        {
          provide: PrismaService,
          useValue: {
            order: {
              findMany: jest.fn().mockResolvedValue([mockOrder]),
              findUnique: jest.fn().mockResolvedValue(mockOrder),
              create: jest.fn().mockResolvedValue(mockOrder),
              update: jest.fn().mockResolvedValue(mockOrder),
              delete: jest.fn().mockResolvedValue(mockOrder),
            },
          },
        },
      ],
    }).compile();
    repository = module.get<OrderRepository>(OrderRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should find all orders', async () => {
    const result = await repository.findAll();
    expect(result).toEqual([mockOrder]);
  });

  it('should find order by id', async () => {
    const result = await repository.findById(1);
    expect(result).toEqual(mockOrder);
  });

  it('should create an order', async () => {
    const result = await repository.create({ customerId: 1, orderDate: new Date() });
    expect(result).toEqual(mockOrder);
  });

  it('should update an order', async () => {
    const result = await repository.update(1, { customerId: 2 });
    expect(result).toEqual(mockOrder);
  });

  it('should delete an order', async () => {
    const result = await repository.delete(1);
    expect(result).toEqual(mockOrder);
  });
});
