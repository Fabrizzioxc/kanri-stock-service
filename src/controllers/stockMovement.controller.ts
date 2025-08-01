// src/controllers/stockMovement.controller.ts
import { Request, Response } from "express";
import * as service from "../services/stockMovement.service";

export const getAll = async (_: Request, res: Response) => {
  const movements = await service.getAll();
  return res.json(movements);
};

export const getById = async (req: Request, res: Response) => {
  const movement = await service.getById(req.params.id);
  if (!movement) return res.status(404).json({ message: "Not found" });
  return res.json(movement);
};

export const create = async (req: Request, res: Response) => {
  const newMovement = await service.create(req.body);
  return res.status(201).json(newMovement);
};

export const update = async (req: Request, res: Response) => {
  const updated = await service.update(req.params.id, req.body);
  return res.json(updated);
};

export const remove = async (req: Request, res: Response) => {
  await service.remove(req.params.id);
  return res.status(204).send();
};
