import { AddTaskDTO, DeleteTaskDTO, UpdateCompleteDTO, UpdateTaskDTO } from 'src/dto/task.dto';
import { TaskService } from './task.service';
export declare class TaskController {
    private task;
    constructor(task: TaskService);
    getTasks(pagina?: number): Promise<any>;
    postTask(taskDto: AddTaskDTO): Promise<{
        status: number;
        data: string;
        errors: any;
    }>;
    updateDone(taskDto: UpdateCompleteDTO): Promise<import("../database/datatabase.interface").IQuery>;
    updateTask(taskDTO: UpdateTaskDTO): Promise<import("../database/datatabase.interface").IQuery>;
    deleteTask(taskDTO: DeleteTaskDTO): Promise<import("../database/datatabase.interface").IQuery>;
}
