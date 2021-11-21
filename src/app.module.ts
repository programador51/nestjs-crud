import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TaskService } from './task/task.service';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [TaskModule, ConfigModule.forRoot({
    isGlobal: true
  }), DatabaseModule],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService, DatabaseService],
})
export class AppModule { }
