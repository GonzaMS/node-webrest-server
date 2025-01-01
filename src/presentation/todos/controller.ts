import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy cereal", completedAt: new Date() },
  { id: 3, text: "Buy eggs", completedAt: new Date() },
];

export class TodosController {
  //* DI (Dependency Injection)
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) res.status(400).json({ error: `Id is not an valid number` });

    const todo = todos.find((todo) => todo.id === id);

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} cannot been found` });
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) res.status(400).json({ error: "Text property is required" });

    const newTodo = {
      id: todos.length + 1,
      text,
      completedAt: new Date(),
    };

    todos.push(newTodo);

    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) res.status(400).json({ error: `Id is not an valid number` });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      res.status(404).json({ error: `Todo with id ${id} cannot been found` });

    const { text, completedAt } = req.body;

    if (todo) {
      if (completedAt === "null") {
        todo.completedAt = null as any;
      } else {
        todo.completedAt = new Date(completedAt);
      }
    }

    if (todo) {
      todo.text = text;
    }

    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) res.status(400).json({ error: `Id is not an valid number` });

    const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      res.status(404).json({ error: `Todo with id ${id} cannot been found` });

    // const newArrayTodo = todos.splice(todos.indexOf(todo), 1);

    todos.filter((todo) => !(todo.id === id));

    res.json(todo);
  };
}
