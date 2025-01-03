import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
  //* DI (Dependency Injection)
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todoList = await prisma.todo.findMany();

    res.json(todoList);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) res.status(400).json({ error: `Id is not an valid number` });

    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} cannot been found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) res.status(400).json({ error: `Id is not an valid number` });

    const [error, updateTodoDto] = UpdateTodoDto.update({
      ...req.body,
      id,
    });

    if (error) res.status(400).json({ error });

    const todo = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todo)
      res.status(404).json({ error: `Todo with id ${id} cannot been found` });

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });

    res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) res.status(400).json({ error: `Id is not an valid number` });

    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    if (!todo)
      res.status(404).json({ error: `Todo with id ${id} cannot been found` });

    const deleted = await prisma.todo.delete({
      where: {
        id,
      },
    });

    deleted
      ? res.json(deleted)
      : res.status(400).json({ error: `Todo with id ${id} doesnt exist` });
  };
}
