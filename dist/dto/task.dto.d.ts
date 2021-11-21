import { IQueryError } from "src/database/datatabase.interface";
import { ITask } from "src/task/task.interface";
export declare class TaskDTO {
    readonly id: number;
    readonly description: string;
    readonly createdDate: string;
}
export declare class ResTaskDTO {
    readonly status: number;
    readonly result: TaskDTORes;
    readonly columns?: any[];
    readonly errors?: IQueryError | null | any[];
}
declare class TaskDTORes {
    readonly tasks: ITask[];
    readonly pages: number;
    readonly actualPage: number;
}
export declare class AddTaskDTO {
    readonly task: string;
    readonly idUser: number;
}
export declare class UpdateCompleteDTO {
    readonly status: (0 | 1);
    readonly idTask: number;
}
export declare class UpdateTaskDTO {
    readonly content: string;
    readonly idTask: number;
}
export declare class DeleteTaskDTO {
    readonly idTask: number;
}
export {};
