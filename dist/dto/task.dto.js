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
exports.DeleteTaskDTO = exports.UpdateTaskDTO = exports.UpdateCompleteDTO = exports.AddTaskDTO = exports.ResTaskDTO = exports.TaskDTO = void 0;
const class_validator_1 = require("class-validator");
const datatabase_interface_1 = require("../database/datatabase.interface");
const task_interface_1 = require("../task/task.interface");
class TaskDTO {
}
exports.TaskDTO = TaskDTO;
class ResTaskDTO {
}
exports.ResTaskDTO = ResTaskDTO;
class TaskDTORes {
}
class AddTaskDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Debes proporcionar una descripcion para la tarea'
    }),
    (0, class_validator_1.IsString)({
        message: 'La descripcion de la tarea debe ser texto'
    }),
    __metadata("design:type", String)
], AddTaskDTO.prototype, "task", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Debes proporcionar el id del usuario al que pertenece la tarea'
    }),
    (0, class_validator_1.IsNumber)({
        maxDecimalPlaces: 0
    }, {
        message: 'El id del usuario debe ser numerico'
    }),
    __metadata("design:type", Number)
], AddTaskDTO.prototype, "idUser", void 0);
exports.AddTaskDTO = AddTaskDTO;
class UpdateCompleteDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Debes proporcionar un estado para marcar la tarea'
    }),
    (0, class_validator_1.IsNumber)({
        maxDecimalPlaces: 0
    }, {
        message: 'Debes proporcionar 0 o 1'
    }),
    __metadata("design:type", Number)
], UpdateCompleteDTO.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Debes proporcionar el id de la tarea'
    }),
    (0, class_validator_1.IsNumber)({
        maxDecimalPlaces: 0
    }, {
        message: 'El id de la tarea debe ser un numerico (sin decimales)'
    }),
    __metadata("design:type", Number)
], UpdateCompleteDTO.prototype, "idTask", void 0);
exports.UpdateCompleteDTO = UpdateCompleteDTO;
class UpdateTaskDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Debes proporcionar una descripcion de la tarea'
    }),
    (0, class_validator_1.IsString)({
        message: `Debes proporcionar una descripcion con tipo de dato "texto"`
    }),
    (0, class_validator_1.MaxLength)(256, {
        message: 'Maximo 256 caracteres'
    }),
    __metadata("design:type", String)
], UpdateTaskDTO.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Debes proporcionar el id de la tarea'
    }),
    (0, class_validator_1.IsNumber)({
        maxDecimalPlaces: 0
    }, {
        message: 'El id de la tarea debe ser un numerico (sin decimales)'
    }),
    __metadata("design:type", Number)
], UpdateTaskDTO.prototype, "idTask", void 0);
exports.UpdateTaskDTO = UpdateTaskDTO;
class DeleteTaskDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Proporciona el id de la tarea a borrar'
    }),
    (0, class_validator_1.IsNumber)({
        allowInfinity: false,
        allowNaN: false
    }),
    __metadata("design:type", Number)
], DeleteTaskDTO.prototype, "idTask", void 0);
exports.DeleteTaskDTO = DeleteTaskDTO;
//# sourceMappingURL=task.dto.js.map