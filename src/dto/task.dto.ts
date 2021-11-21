import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { IQueryError } from "src/database/datatabase.interface";
import { ITask } from "src/task/task.interface";

export class TaskDTO {

    readonly id: number;
    readonly description: string;
    readonly createdDate: string;
}

export class ResTaskDTO {
    /**
     * HTTP status code
     */
    readonly status: number;

    /**
     * List of tasks
     */
    readonly result: TaskDTORes;

    /**
     * Information of the columns table
     */
    readonly columns?: any[];

    /**
     * List of errors
     */
    readonly errors?: IQueryError | null | any[];
}

class TaskDTORes {
    readonly tasks: ITask[];
    readonly pages: number;
    readonly actualPage: number;
}

export class AddTaskDTO {

    /**
     * Description of the task to create
     */
    @IsNotEmpty({
        message: 'Debes proporcionar una descripcion para la tarea'
    })
    @IsString({
        message: 'La descripcion de la tarea debe ser texto'
    })
    readonly task: string;

    /**
     * Id of the user which belongs that task
     */
    @IsNotEmpty({
        message: 'Debes proporcionar el id del usuario al que pertenece la tarea'
    })
    @IsNumber({
        maxDecimalPlaces: 0
    }, {
        message: 'El id del usuario debe ser numerico'
    })
    readonly idUser: number;
}

export class UpdateCompleteDTO {
    @IsNotEmpty({
        message: 'Debes proporcionar un estado para marcar la tarea'
    })
    @IsNumber({
        maxDecimalPlaces: 0
    }, {
        message: 'Debes proporcionar 0 o 1'
    })
    readonly status: (0 | 1);

    @IsNotEmpty({
        message: 'Debes proporcionar el id de la tarea'
    })
    @IsNumber({
        maxDecimalPlaces: 0
    }, {
        message: 'El id de la tarea debe ser un numerico (sin decimales)'
    })
    readonly idTask: number;
}

export class UpdateTaskDTO {

    @IsNotEmpty({
        message: 'Debes proporcionar una descripcion de la tarea'
    })
    @IsString({
        message: `Debes proporcionar una descripcion con tipo de dato "texto"`
    })
    @MaxLength(256, {
        message: 'Maximo 256 caracteres'
    })
    readonly content: string;

    @IsNotEmpty({
        message: 'Debes proporcionar el id de la tarea'
    })
    @IsNumber({
        maxDecimalPlaces: 0
    }, {
        message: 'El id de la tarea debe ser un numerico (sin decimales)'
    })
    readonly idTask: number;
}

export class DeleteTaskDTO {
    @IsNotEmpty({
        message: 'Proporciona el id de la tarea a borrar'
    })
    @IsNumber({
        allowInfinity: false,
        allowNaN: false
    })
    readonly idTask: number;
}