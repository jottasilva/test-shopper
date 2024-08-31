import { conn } from "./database";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function Measure(measure_value: string) {
    const monthNumber = (new Date().getMonth() + 1).toString();
  try {
    prisma.$connect();
    const existingMeasure = await prisma.measureuser.findMany({
      where: { 
        measure_value: measure_value.toString(),
        measure_month:monthNumber,
    },
    });
    if (existingMeasure.length >= 1 ) {
      return { error: "Esta Leitura Já foi realizada nesse Mês"};
    }
    const lastMeasure = await prisma.measureuser.findFirst({
      orderBy: { id: "desc" },
    });

    const nextId = lastMeasure ? lastMeasure.id + 1 : 1;

    const newMeasure = await prisma.measureuser.create({
      data: {
        id: nextId,
        customer_code: nextId.toString(),
        measure_value: measure_value,
        measure_datetime: new Date(),
        measure_type:"WATER",
        measure_month:monthNumber,
       
      },
    });
    return newMeasure;
  } catch (error: any) {
    return { error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserMeasures() {
  try {
    prisma.$connect();
    const measures = prisma.measureuser.findMany();
    return measures;
  } catch (error: any) {
    return { error: error.message };
  }finally {
    await prisma.$disconnect();
  }
}
export async function Update_Measure() {}
