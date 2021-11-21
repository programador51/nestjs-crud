import { IQuery } from "src/database/datatabase.interface";

export interface ITask {
    id: number,
    description: string,
    createdDate: string,
    completed: boolean | number,
    userId: (1 | number)
}

export type IResTasks = IQuery & {
    tasks: ITask[]
}