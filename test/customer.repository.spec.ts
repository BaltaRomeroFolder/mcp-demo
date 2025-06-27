import { Test, TestingModule } from '@nestjs/testing';
import { CustomerRepository } from '../../src/customer/customer.repository';
import { PrismaService } from '../../src/prisma/prisma.service';

const mockCustomer = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
};

describe('CustomerRepository', () => {
  let repository: CustomerRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerRepository,
        {
          provide: PrismaService,
          useValue: {
            customer: {
              findMany: jest.fn().mockResolvedValue([mockCustomer]),
              findUnique: jest.fn().mockResolvedValue(mockCustomer),
              create: jest.fn().mockResolvedValue(mockCustomer),
              update: jest.fn().mockResolvedValue(mockCustomer),
              delete: jest.fn().mockResolvedValue(mockCustomer),
            },
          },
        },
      ],
    }).compile();
    repository = module.get<CustomerRepository>(CustomerRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should find all customers', async () => {
    const result = await repository.findAll();
    expect(result).toEqual([mockCustomer]);
  });

  it('should find customer by id', async () => {
    const result = await repository.findById(1);
    expect(result).toEqual(mockCustomer);
  });

  it('should create a customer', async () => {
    const result = await repository.create({ name: 'Test User', email: 'test@example.com' });
    expect(result).toEqual(mockCustomer);
  });

  it('should update a customer', async () => {
    const result = await repository.update(1, { name: 'Updated' });
    expect(result).toEqual(mockCustomer);
  });

  it('should delete a customer', async () => {
    const result = await repository.delete(1);
    expect(result).toEqual(mockCustomer);
  });
});
