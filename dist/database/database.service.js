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
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const mysql_1 = require("mysql");
let DatabaseService = class DatabaseService {
    constructor() {
        this.connection = (0, mysql_1.createConnection)({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        this.connection.connect(e => {
            if (e) {
                console.log('Error to connect DB, retrying on 5 secs', e);
                this.reconnectDb(1);
            }
        });
        this.connection.on('error', (e) => {
            if (e = 'PROTOCOL_CONNECTION_LOST') {
                console.log('Error to connect DB, retrying on 5 secs', e);
                this.reconnectDb(1);
            }
        });
    }
    reconnectDb(counterTry = 1) {
        console.log('Reonnect try', counterTry);
        this.connection = (0, mysql_1.createConnection)({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        this.connection.connect(e => {
            if (e && counterTry < 5) {
                console.log('Error to connect DB, retrying on 5 secs', e);
                setTimeout(() => {
                    this.reconnectDb(counterTry += 1);
                }, 5000);
            }
        });
        this.connection.on('error', (e) => {
            if (e = 'PROTOCOL_CONNECTION_LOST') {
                setTimeout(() => {
                    console.log('Error to connect DB, retrying on 5 secs', e);
                    this.reconnectDb(counterTry += 1);
                }, 5000);
            }
        });
    }
    query(query, inputs = []) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, inputs, (error, result, fields) => {
                this.connection.end();
                if (error) {
                    console.log({
                        status: 500,
                        errors: [{
                                codeError: error.code,
                                noCodeError: error.errno,
                                messageError: error.sqlMessage,
                            }]
                    });
                    reject({
                        status: 500,
                        errors: {
                            codeError: error.code,
                            noCodeError: error.errno,
                            messageError: error.sqlMessage
                        }
                    });
                    return;
                }
                else {
                    resolve({
                        status: 200,
                        result,
                        colums: fields,
                        errors: null
                    });
                }
            });
        });
    }
};
DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map