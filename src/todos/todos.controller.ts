import { Controller, Get, Render, Post, Body, UsePipes, Param, Put } from '@nestjs/common';
import { DefaultLayout } from "@/kita-views";
import { TodosService, upsertTodoSchema } from './todos.service';
import { z, ZodValidationPipe } from "@/zod-nestjs";

@Controller('todos')
@DefaultLayout("layouts/base")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get("/")
  @Render("index")
  async index() {
    const todos = await this.todosService.getTodos();
    return { todos };
  }

  @Post("/")
  @Render("todos")
  @UsePipes(new ZodValidationPipe(upsertTodoSchema))
  async create(@Body() todoData: z.infer<typeof upsertTodoSchema>) {
    const todo = await this.todosService.create(todoData);
    const todos = await this.todosService.getTodos();
    return { todos };
  }

  @Put("/:id")
  @Render("todos")
  async update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(upsertTodoSchema)) todoData: z.infer<typeof upsertTodoSchema>
  ) {
    const todo = await this.todosService.update(id, todoData);
    const todos = await this.todosService.getTodos();
    return { todos };
  }

  @Put("/:id/toggle")
  @Render("todo-row")
  async toggle(@Param("id") id: string) {
    const todo = await this.todosService.toggle(id);
    return { todo };
  }
}
