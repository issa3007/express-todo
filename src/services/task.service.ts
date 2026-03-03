import { Task, TaskCreationAttributes } from "../models/task.model";
import { User } from "../models/user.model";

export class TaskService {
  async create(data: TaskCreationAttributes) {
    return await Task.create(data);
  }

  async findAll(query: any) {
    const {
      status,
      priority,
      userId,
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "DESC",
    } = query;

    const where: any = {};

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (userId) where.userId = Number(userId);

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const offset = (pageNumber - 1) * limitNumber;

    const allowedSortFields = ["createdAt", "priority", "status", "title"];
    const sortField = allowedSortFields.includes(sort) ? sort : "createdAt";

    const result = await Task.findAndCountAll({
      where,
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
      limit: limitNumber,
      offset,
      order: [[sortField, order === "ASC" ? "ASC" : "DESC"]],
    });

    return {
      total: result.count,
      page: pageNumber,
      totalPages: Math.ceil(result.count / limitNumber),
      data: result.rows,
    };
  }

  async findById(id: number) {
    return await Task.findByPk(id, {
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    });
  }

  async update(id: number, data: Partial<TaskCreationAttributes>) {
    const task = await Task.findByPk(id);

    if (!task) {
      throw new Error("Task not found");
    }

    await task.update(data);
    return task;
  }

  async delete(id: number) {
    const task = await Task.findByPk(id);

    if (!task) {
      throw new Error("Task not found");
    }

    await task.destroy();
  }
}
