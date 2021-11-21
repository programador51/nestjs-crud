import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { IQuery } from 'src/database/datatabase.interface';
import { ResTaskDTO, TaskDTO } from 'src/dto/task.dto';
import { IResTasks, ITask } from './task.interface';

@Injectable()
export class TaskService {
    constructor(private sql: DatabaseService) { }

    async getTasks(page: number | string): Promise<ResTaskDTO> {

        const resQuery = await this.sql.query(`CALL v1_GetTasksPaginated(?,?)`, [page, process.env.DB_REGISTERS_PER_PAGE]);

        const tasks = resQuery.result[0];
        const pages: number = resQuery.result[1][0]['totalPages'];

        const parsedTasks: ITask[] = tasks.map((task: ITask) => ({
            ...task,
            completed: task.completed === 1 ? true : false
        }));



        const dtoTasks: ResTaskDTO = {
            ...resQuery,
            result: {
                tasks: parsedTasks,
                pages,
                actualPage: +page
            }

        }

        return dtoTasks;
    }

    async postTask(task: string, idUser: number) {
        return this.sql.query(`INSERT INTO tasks
        (description,userId) VALUES (?,?)`, [task, idUser]);
    }

    /**
     * Update the status of a task (complete/uncomplete)
     * @param task - Id of the task to toggle it's status
     * @param status - Status to set on the task
     * @returns {IQuery} Result of the update status task
     */
    async updateStatus(task: (number | string), status: (0 | 1)) {
        return await this.sql.query(`CALL v1_UpdateTaskStatus(?,?)`, [status, task]);
    }

    /**
     * Update the information content of the task
     * @param idTask - Id of the task
     * @param content - Content of the task to do
     * @returns {IQuery} Result of the update
     */
    async updateTask(idTask: number, content: string) {
        return await this.sql.query(`CALL v1_UpdateTask(?,?)`, [idTask, content]);
    }

    /**
     * Do a logical delete of the task
     * @param idTask - Id of the task to delete
     * @returns {IQuery}
     */
    async deleteTask(idTask: number) {
        return await this.sql.query(`CALL v1_DeleteTask(?)`, [idTask]);
    }
}
