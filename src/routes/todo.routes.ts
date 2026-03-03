import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";

const router = Router();
const controller = new TodoController();

router.post("/", controller.create);
router.get("/", controller.findAll);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
