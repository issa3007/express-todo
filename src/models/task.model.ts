import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface TaskAttributes {
  id: number;
  title: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  userId: number;
}

export interface TaskCreationAttributes
  extends Optional<TaskAttributes, "id"> {}

export class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: number;
  public title!: string;
  public status!: "todo" | "in_progress" | "done";
  public priority!: "low" | "medium" | "high";
  public userId!: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("todo", "in_progress", "done"),
      defaultValue: "todo",
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium",
    },
    userId: {                     
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true,
  }
);