"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const datatabase_interface_1 = require("../database/datatabase.interface");
const task_dto_1 = require("../dto/task.dto");
let TaskService = class TaskService {
    constructor(sql) {
        this.sql = sql;
    }
    async getTasks(page) {
        const resQuery = await this.sql.query(`CALL v1_GetTasksPaginated(?,?)`, [page, process.env.DB_REGISTERS_PER_PAGE]);
        const tasks = resQuery.result[0];
        const pages = resQuery.result[1][0]['totalPages'];
        const parsedTasks = tasks.map((task) => (Object.assign(Object.assign({}, task), { completed: task.completed === 1 ? true : false })));
        const dtoTasks = Object.assign(Object.assign({}, resQuery), { result: {
                tasks: parsedTasks,
                pages,
                actualPage: +page
            } });
        return dtoTasks;
    }
    async postTask(task, idUser) {
        return this.sql.query(`INSERT INTO tasks
        (description,userId) VALUES (?,?)`, [task, idUser]);
    }
    async updateStatus(task, status) {
        return await this.sql.query(`CALL v1_UpdateTaskStatus(?,?)`, [status, task]);
    }
    async updateTask(idTask, content) {
        return await this.sql.query(`CALL v1_UpdateTask(?,?)`, [idTask, content]);
    }
    async deleteTask(idTask) {
        return await this.sql.query(`CALL v1_DeleteTask(?)`, [idTask]);
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map