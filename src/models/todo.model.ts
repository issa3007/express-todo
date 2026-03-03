import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface TodoEntity {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface TodoCreation extends Optional<TodoEntity, "id" | "completed"> {}

export class Todo
  extends Model<TodoEntity, TodoCreation>
  implements TodoEntity
{
  public id!: number;
  public title!: string;
  public description?: string;
  public completed!: boolean;
}

Todo.init(
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
    description: {
      type: DataTypes.TEXT,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "todos",
    timestamps: true,
  },
);
