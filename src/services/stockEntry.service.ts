import { prisma } from "../utils/prisma";
import { StockEntrySchema } from "../schemas/stockEntry.schema";
import { StockEntryUpdateSchema } from "../schemas/stockEntryUpdate.schema";
import { createMovement } from "./stockMovement.service";
import {
  incrementProductStock,
  decrementProductStock,
  checkProductExists,
} from "../utils/productClient";

// Crear una nueva entrada
export const createEntry = async (data: unknown) => {
  const validated = StockEntrySchema.parse(data);

  // Validar existencia del producto
  const exists = await checkProductExists(validated.productId);
  if (!exists) throw new Error("El producto no existe.");

  const entry = await prisma.stockEntry.create({
    data: validated,
  });

  await incrementProductStock(validated.productId, validated.quantity);

  await createMovement({
    type: "entry",
    productId: validated.productId,
    quantity: validated.quantity,
  });

  return entry;
};

// Obtener todas las entradas
export const getAllEntries = async () => {
  return prisma.stockEntry.findMany({ orderBy: { createdAt: "desc" } });
};

// Actualizar una entrada existente
export const updateEntry = async (id: string, data: unknown) => {
  const validated = StockEntryUpdateSchema.parse(data);

  const existing = await prisma.stockEntry.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Entrada de stock no encontrada.");
  }

  // Validar existencia del producto
  const exists = await checkProductExists(existing.productId);
  if (!exists) throw new Error("El producto no existe.");

  const difference = validated.quantity - existing.quantity;

  if (difference > 0) {
    await incrementProductStock(existing.productId, difference);
  } else if (difference < 0) {
    await decrementProductStock(existing.productId, Math.abs(difference));
  }

  const updated = await prisma.stockEntry.update({
    where: { id },
    data: { quantity: validated.quantity },
  });

  // Auditoría pendiente
  return updated;
};
