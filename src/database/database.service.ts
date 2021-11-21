import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'mysql';
import { IQuery } from './datatabase.interface';

@Injectable()
export class DatabaseService {
    protected connection: Connection;

    constructor() {
        this.connection = createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        this.connection.connect(e => {
            if (e) {
                console.log('Error to connect DB:', e);
                this.reconnectDb(1);
            }
        });

        this.connection.on('error', (error) => {
            if (error = 'PROTOCOL_CONNECTION_LOST') {
                this.reconnectDb(1);
            }
        })
    }

    /**
 * Execute a query to MySQL database (stored procedure or raw scripts)
 * 
 * @param {string} query - Query to execute on the database (can be stored procedure or raw scripts)
 * @param {any[]} inputs - Input variables to pass cross the querys
 * @returns {Promise<IQuery>} Resolution of the query 
 * @example async getTasks() {
        const { status, result }: any = await this.sql.query(`SELECT * FROM Tasks`, []);
        return result;
    }
 */
    reconnectDb(counterTry = 1) {
        this.connection = createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        this.connection.connect(e => {
            if (e && counterTry < 5) {
                console.log('Error to connect DB:', e);
                setTimeout(() => {
                    this.reconnectDb(counterTry += 1);
                }, 30000)
            }
        });

        this.connection.on('error', (error) => {
            if (error = 'PROTOCOL_CONNECTION_LOST') {
                setTimeout(() => {
                    this.reconnectDb(counterTry += 1);
                }, 30000)
            }
        })
    }

    query(query: string, inputs = []): Promise<IQuery> {
        return new Promise((resolve, reject) => {
            this.connection.query(query, inputs, (error, result, fields) => {
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
                } else {
                    resolve({
                        status: 200,
                        result,
                        colums: fields,
                        errors: null
                    });
                }
            });
        })
    }
}

// This code it's inspired on https://dev.to/juliest88/how-to-build-rest-api-with-nodejs-express-and-mysql-31jk