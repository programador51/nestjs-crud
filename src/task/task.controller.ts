import { Body, Controller, Delete, Get, Post, Put, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddTaskDTO, DeleteTaskDTO, ResTaskDTO, TaskDTO, UpdateCompleteDTO, UpdateTaskDTO } from 'src/dto/task.dto';
import { TaskService } from './task.service';

@Controller('api/v1/task')
export class TaskController {

    constructor(private task: TaskService) { }

    @Get()
    async getTasks(@Query('pagina') pagina: number = 1): Promise<any> {

        const { result, status, errors } = await this.task.getTasks(pagina);

        return {
            status: status,
            data: result,
            errors
        }

    }

    @Post()
    @UsePipes(new ValidationPipe())
    async postTask(@Body() taskDto: AddTaskDTO) {

        const { task, idUser } = taskDto;

        await this.task.postTask(task, idUser);

        return {
            status: 200,
            data: 'Tarea agregado',
            errors: null
        }
    }

    @Put('/status')
    @UsePipes(new ValidationPipe())
    async updateDone(@Body() taskDto: UpdateCompleteDTO) {

        const { status, idTask } = taskDto;

        const data = await this.task.updateStatus(idTask, status);

        return data;
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateTask(@Body() taskDTO: UpdateTaskDTO) {

        const { content, idTask } = taskDTO;

        const data = await this.task.updateTask(idTask, content);

        return data;
    }

    @Delete()
    async deleteTask(@Body() taskDTO: DeleteTaskDTO) {
        const { idTask } = taskDTO;

        const data = await this.task.deleteTask(idTask);

        return data;
    }

}
