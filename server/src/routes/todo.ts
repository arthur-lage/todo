import express from "express";

import { TodoController } from "../controllers/TodoController";

const routes = express.Router();

routes.get("/", TodoController.getAll);
routes.get("/:id", TodoController.getByUser);

// @ts-ignore
routes.post("/", TodoController.create);

routes.patch("/:todo_id", TodoController.complete);

routes.delete("/", TodoController.deleteAll);
routes.delete("/:todo_id", TodoController.deleteById);

export { routes as todoRoutes };
