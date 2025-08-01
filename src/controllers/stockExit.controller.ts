import { Request, Response } from 'express';
import * as service from '../services/stockExit.service';

export const getAll = async (_req: Request, res: Response) => {
  const exits = await service.getAllExits();
  res.json(exits);
};

export const create = async (req: Request, res: Response) => {
  const exit = await service.createExit(req.body);
  res.status(201).json(exit);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await service.updateExit(id, req.body);
  res.json(updated);
};
