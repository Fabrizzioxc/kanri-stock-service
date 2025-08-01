// src/schemas/stockMovement.schema.ts
import { z } from 'zod';

export const StockMovementSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  type: z.enum(['entry', 'exit']),
});

export const StockMovementUpdateSchema = StockMovementSchema.partial();
