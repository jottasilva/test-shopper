import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function conn() {
  try {
    await prisma.$connect();
    return true;
  } catch (error) {
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
export {prisma};