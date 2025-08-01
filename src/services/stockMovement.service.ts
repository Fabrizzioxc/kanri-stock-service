// src/services/stockMovement.service.ts
import { prisma } from "../utils/prisma";
import { StockMovementSchema, StockMovementUpdateSchema } from "../schemas/stockMovement.schema";

export const getAll = () => {
  return prisma.stockMovement.findMany({ orderBy: { createdAt: "desc" } });
};

export const getById = (id: string) => {
  return prisma.stockMovement.findUnique({ where: { id } });
};

export const create = async (data: unknown) => {
  const validated = StockMovementSchema.parse(data);
  return prisma.stockMovement.create({ data: validated });
};

export const update = async (id: string, data: unknown) => {
  const validated = StockMovementUpdateSchema.parse(data);
  return prisma.stockMovement.update({ where: { id }, data: validated });
};

export const remove = async (id: string) => {
  return prisma.stockMovement.delete({ where: { id } });
};

export const createMovement = async (data: unknown) => {
  const validated = StockMovementSchema.parse(data);
  return prisma.stockMovement.create({ data: validated });
};
