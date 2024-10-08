import { Module } from '@nestjs/common';
import { db } from '@/db';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

@Module({
  providers: [
    {
      provide: "DB",
      useValue: db,
    },
    TodosService,
  ],
  controllers: [TodosController],
})
export class TodosModule {}
