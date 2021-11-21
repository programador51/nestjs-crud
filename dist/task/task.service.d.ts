import { DatabaseService } from 'src/database/database.service';
import { IQuery } from 'src/database/datatabase.interface';
import { ResTaskDTO } from 'src/dto/task.dto';
export declare class TaskService {
    private sql;
    constructor(sql: DatabaseService);
    getTasks(page: number | string): Promise<ResTaskDTO>;
    postTask(task: string, idUser: number): Promise<void>;
    updateStatus(task: (number | string), status: (0 | 1)): Promise<IQuery>;
    updateTask(idTask: number, content: string): Promise<IQuery>;
    deleteTask(idTask: number): Promise<IQuery>;
}
