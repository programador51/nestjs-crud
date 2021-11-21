import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, DatabaseService]
})
export class TaskModule { }
