import { User } from "./user.model";
import { Task } from "./task.model";

User.hasMany(Task, {
  foreignKey: "userId",
  as: "tasks",
});

Task.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export { User, Task };
