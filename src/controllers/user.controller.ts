import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({
          message: "Name and email are required",
        });
      }

      const user = await userService.create({ name, email });

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await userService.findById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUsersWithTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsersWithTasks();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

    async delete(req: Request, res: Response, next: NextFunction) {
      try {
        await userService.delete(Number(req.params.id));
        res.status(204).send();
      } catch (error) {
        next(error);
      }
    }
}
