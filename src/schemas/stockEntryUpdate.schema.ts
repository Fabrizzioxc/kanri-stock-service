import { z } from "zod";

export const StockEntryUpdateSchema = z.object({
  quantity: z.number().int().positive("La cantidad debe ser mayor que cero"),
  reason: z.string().min(5, "Debes ingresar una razón válida para modificar la entrada"),
});
