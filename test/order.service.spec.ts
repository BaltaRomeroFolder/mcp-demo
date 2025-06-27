import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../src/order/order.service';
import { OrderRepository } from '../../src/order/order.repository';

const mockOrder = {
  id: 1,
  customerId: 1,
  orderDate: new Date(),
};

const mockOrderRepository = {
  findAll: jest.fn().mockResolvedValue([mockOrder]),
  findById: jest.fn().mockResolvedValue(mockOrder),
  create: jest.fn().mockResolvedValue(mockOrder),
  update: jest.fn().mockResolvedValue(mockOrder),
  delete: jest.fn().mockResolvedValue(mockOrder),
};

describe('OrderService', () => {
  let service: OrderService;
  let repository: OrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useValue: mockOrderRepository,
        },
      ],
    }).compile();
    service = module.get<OrderService>(OrderService);
    repository = module.get<OrderRepository>(OrderRepository);
  });

  it('should find all orders', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockOrder]);
  });

  it('should find order by id', async () => {
    const result = await service.findById(1);
    expect(result).toEqual(mockOrder);
  });

  it('should create an order', async () => {
    const result = await service.create({ customerId: 1, orderDate: new Date() });
    expect(result).toEqual(mockOrder);
  });

  it('should update an order', async () => {
    const result = await service.update(1, { customerId: 2 });
    expect(result).toEqual(mockOrder);
  });

  it('should delete an order', async () => {
    const result = await service.delete(1);
    expect(result).toEqual(mockOrder);
  });
});
