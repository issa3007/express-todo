import { User } from "../models/user.model";
import { Task } from "../models";
export class UserService {
  async create(data: { name: string; email: string }) {
    return await User.create(data);
  }

  async findAll() {
    return await User.findAll();
  }

  async getUsersWithTasks() {
    return await User.findAll({
      include: {
        model: Task,
        as: "tasks",
      },
    });
  }

  async findById(id: number) {
    return await User.findByPk(id);
  }

  async delete(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    await user.destroy();
  }
}
