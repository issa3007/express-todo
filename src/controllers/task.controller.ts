import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/task.service";

const taskService = new TaskService();

export class TaskController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, status, priority, userId } = req.body;

      if (!title || !userId) {
        return res.status(400).json({
          message: "Title and userId are required",
        });
      }

      const task = await taskService.create({
        title,
        status,
        priority,
        userId,
      });

      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await taskService.findAll(req.query);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await taskService.findById(Number(req.params.id));

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await taskService.update(Number(req.params.id), req.body);

      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await taskService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
