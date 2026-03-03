import { Todo } from "../models/todo.model";

export class TodoService {
  async create(data: { title: string; description?: string }) {
    return await Todo.create(data);
  }

  async findAll(completed?: string) {
    if (completed !== undefined) {
      return await Todo.findAll({
        where: { completed: completed === "true" },
      });
    }
    return await Todo.findAll();
  }

  async findById(id: number) {
    return await Todo.findByPk(id);
  }

  async update(id: number, data: Partial<Todo>) {
    const todo = await Todo.findByPk(id);
    if (!todo) throw new Error("Todo not found");

    return await todo.update(data);
  }

  async delete(id: number) {
    const todo = await Todo.findByPk(id);
    if (!todo) throw new Error("Todo not found");

    await todo.destroy();
  }
}
