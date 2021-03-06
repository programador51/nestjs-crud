import { IQuery } from './datatabase.interface';
export declare class DatabaseService {
    protected connection: any;
    constructor();
    reconnectDb(counterTry?: number): void;
    query(query: string, inputs?: any[]): Promise<IQuery>;
}
