import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../../src/customer/customer.service';
import { CustomerRepository } from '../../src/customer/customer.repository';

const mockCustomer = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
};

const mockCustomerRepository = {
  findAll: jest.fn().mockResolvedValue([mockCustomer]),
  findById: jest.fn().mockResolvedValue(mockCustomer),
  create: jest.fn().mockResolvedValue(mockCustomer),
  update: jest.fn().mockResolvedValue(mockCustomer),
  delete: jest.fn().mockResolvedValue(mockCustomer),
};

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository,
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();
    service = module.get<CustomerService>(CustomerService);
    repository = module.get<CustomerRepository>(CustomerRepository);
  });

  it('should find all customers', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockCustomer]);
  });

  it('should find customer by id', async () => {
    const result = await service.findById(1);
    expect(result).toEqual(mockCustomer);
  });

  it('should create a customer', async () => {
    const result = await service.create({ name: 'Test User', email: 'test@example.com' });
    expect(result).toEqual(mockCustomer);
  });

  it('should update a customer', async () => {
    const result = await service.update(1, { name: 'Updated' });
    expect(result).toEqual(mockCustomer);
  });

  it('should delete a customer', async () => {
    const result = await service.delete(1);
    expect(result).toEqual(mockCustomer);
  });
});
