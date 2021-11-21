import { Connection } from 'mysql';
import { IQuery } from './datatabase.interface';
export declare class DatabaseService {
    protected connection: Connection;
    constructor();
    query(query: string, inputs?: any[]): Promise<IQuery>;
}
