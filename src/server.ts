import express from "express";
import { sequelize } from "./config/database";
import "./models";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import { errorMiddleware } from "./middleware/error-middleware";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.use(errorMiddleware);

async function start() {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync();

    app.listen(3000, () => {
      console.log(`Server started on Port ${port}`);
    });
  } catch (err) {
    console.error("Server error:", err);
  }
}

start();
