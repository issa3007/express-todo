import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/database";
import todoRoutes from "./routes/todo.routes";
import { errorMiddleware } from "./middleware/error-middleware";
import "./models/user.model";
import "./models/task.model";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/todos", todoRoutes);
app.use(errorMiddleware);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server started");
  });
});
