import { Request, Response } from 'express';
import * as service from '../services/stockEntry.service';

export const create = async (req: Request, res: Response) => {
  try {
    const entry = await service.createEntry(req.body);
    res.status(201).json(entry);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const entries = await service.getAllEntries();
    res.json(entries);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener las entradas' });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updated = await service.updateEntry(id, req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
