import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AppService } from "./app.service";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  root(@Req() req: Request, @Res() res: Response) {
    return res.redirect("/todos");
  }
}
