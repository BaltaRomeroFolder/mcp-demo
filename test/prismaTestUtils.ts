import { PrismaClient } from '@prisma/client';

class PrismaTestClient {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!PrismaTestClient.instance) {
      PrismaTestClient.instance = new PrismaClient();
    }
    return PrismaTestClient.instance;
  }

  static async rollback() {
    const prisma = PrismaTestClient.getInstance();
    await prisma.$executeRawUnsafe('ROLLBACK');
    await prisma.$executeRawUnsafe('BEGIN');
  }

  static async begin() {
    const prisma = PrismaTestClient.getInstance();
    await prisma.$executeRawUnsafe('BEGIN');
  }

  static async close() {
    if (PrismaTestClient.instance) {
      await PrismaTestClient.instance.$disconnect();
      PrismaTestClient.instance = undefined as any;
    }
  }
}

export { PrismaTestClient };
