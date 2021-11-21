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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_dto_1 = require("../dto/task.dto");
const task_service_1 = require("./task.service");
let TaskController = class TaskController {
    constructor(task) {
        this.task = task;
    }
    async getTasks(pagina = 1) {
        const { result, status, errors } = await this.task.getTasks(pagina);
        return {
            status: status,
            data: result,
            errors
        };
    }
    async postTask(taskDto) {
        const { task, idUser } = taskDto;
        await this.task.postTask(task, idUser);
        return {
            status: 200,
            data: 'Tarea agregado',
            errors: null
        };
    }
    async updateDone(taskDto) {
        const { status, idTask } = taskDto;
        const data = await this.task.updateStatus(idTask, status);
        return data;
    }
    async updateTask(taskDTO) {
        const { content, idTask } = taskDTO;
        const data = await this.task.updateTask(idTask, content);
        return data;
    }
    async deleteTask(taskDTO) {
        const { idTask } = taskDTO;
        const data = await this.task.deleteTask(idTask);
        return data;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('pagina')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.AddTaskDTO]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "postTask", null);
__decorate([
    (0, common_1.Put)('/status'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.UpdateCompleteDTO]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateDone", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.UpdateTaskDTO]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.DeleteTaskDTO]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteTask", null);
TaskController = __decorate([
    (0, common_1.Controller)('api/v1/task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map