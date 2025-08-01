import { prisma } from "../utils/prisma";
import { StockExitSchema } from "../schemas/stockExit.schema";
import { StockExitUpdateSchema } from "../schemas/stockExitUpdate.schema";
import { createMovement } from "./stockMovement.service";
import {
  decrementProductStock,
  incrementProductStock,
  checkProductExists,
} from "../utils/productClient";

// Crear una nueva salida
export const createExit = async (data: unknown) => {
  const validated = StockExitSchema.parse(data);

  // Validar existencia del producto
  const exists = await checkProductExists(validated.productId);
  if (!exists) throw new Error("El producto no existe.");

  const exit = await prisma.stockExit.create({
    data: validated,
  });

  await decrementProductStock(validated.productId, validated.quantity);

  await createMovement({
    type: "exit",
    productId: validated.productId,
    quantity: validated.quantity,
  });

  return exit;
};

// Obtener todas las salidas
export const getAllExits = async () => {
  return prisma.stockExit.findMany({ orderBy: { createdAt: "desc" } });
};

// Actualizar una salida
export const updateExit = async (id: string, data: unknown) => {
  const validated = StockExitUpdateSchema.parse(data);

  const existing = await prisma.stockExit.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Salida de stock no encontrada.");
  }

  // Validar existencia del producto
  const exists = await checkProductExists(existing.productId);
  if (!exists) throw new Error("El producto no existe.");

  const difference = validated.quantity - existing.quantity;

  if (difference > 0) {
    // Se está sacando más stock → reducir más
    await decrementProductStock(existing.productId, difference);
  } else if (difference < 0) {
    // Se está reduciendo la salida → devolver stock
    await incrementProductStock(existing.productId, Math.abs(difference));
  }

  const updated = await prisma.stockExit.update({
    where: { id },
    data: {
      quantity: validated.quantity,
      reason: validated.reason, // guardamos justificación si está habilitado
    },
  });

  // Auditoría pendiente
  return updated;
};
