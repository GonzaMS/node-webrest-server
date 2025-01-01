import { Router } from "express";
import { TodoRoutes } from "./todos/todo-routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //* Routes (Middleware)
    router.use("/api/v1/todos", TodoRoutes.routes);

    return router;
  }
}
