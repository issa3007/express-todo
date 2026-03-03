import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todo.service";

const service = new TodoService();

export class TodoController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.title) {
        return res.status(400).json({ message: "Title is required" });
      }

      const todo = await service.create(req.body);
      res.status(201).json(todo);
    } catch (err) {
      next(err);
    }
  }

  async findAll(req: Request, res: Response) {
    const todos = await service.findAll(req.query.completed as string);
    res.json(todos);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await service.update(Number(req.params.id), req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await service.delete(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
