import { z } from 'zod';

export const StockExitSchema = z.object({
  productId: z.string().uuid('El ID del producto debe ser un UUID válido'),
  quantity: z.number().int().positive('La cantidad debe ser mayor que cero'),
});
