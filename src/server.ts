import express from "express";
import { sequelize } from "./config/database";
import "./models";

const app = express();
app.use(express.json());

async function start() {
  await sequelize.sync({ force: true });

  app.listen(3000, () => {
    console.log("Server started");
  });
}

start();
