import { Op } from "sequelize";
import { Task } from "../models/task.model";

export class TaskService {
  async findAll(query: any) {
    const {
      status,
      priority,
      page = 1,
      limit = 10,
      sort = "createdAt",
    } = query;

    const where: any = {};

    if (status) where.status = status;
    if (priority) where.priority = priority;

    return await Task.findAndCountAll({
      where,
      order: [[sort, "DESC"]],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
  }
}
