import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemService } from '../../src/order-item/order-item.service';
import { OrderItemRepository } from '../../src/order-item/order-item.repository';

const mockOrderItem = {
  id: 1,
  orderId: 1,
  productName: 'Test Product',
  quantity: 2,
  price: 10.5,
};

const mockOrderItemRepository = {
  findAll: jest.fn().mockResolvedValue([mockOrderItem]),
  findById: jest.fn().mockResolvedValue(mockOrderItem),
  create: jest.fn().mockResolvedValue(mockOrderItem),
  update: jest.fn().mockResolvedValue(mockOrderItem),
  delete: jest.fn().mockResolvedValue(mockOrderItem),
};

describe('OrderItemService', () => {
  let service: OrderItemService;
  let repository: OrderItemRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemService,
        {
          provide: OrderItemRepository,
          useValue: mockOrderItemRepository,
        },
      ],
    }).compile();
    service = module.get<OrderItemService>(OrderItemService);
    repository = module.get<OrderItemRepository>(OrderItemRepository);
  });

  it('should find all order items', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockOrderItem]);
  });

  it('should find order item by id', async () => {
    const result = await service.findById(1);
    expect(result).toEqual(mockOrderItem);
  });

  it('should create an order item', async () => {
    const result = await service.create({ orderId: 1, productName: 'Test Product', quantity: 2, price: 10.5 });
    expect(result).toEqual(mockOrderItem);
  });

  it('should update an order item', async () => {
    const result = await service.update(1, { quantity: 3 });
    expect(result).toEqual(mockOrderItem);
  });

  it('should delete an order item', async () => {
    const result = await service.delete(1);
    expect(result).toEqual(mockOrderItem);
  });
});
