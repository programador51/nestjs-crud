export interface IQueryError {
    codeError: string;
    noCodeError: number;
    messageError: string;
}
export interface IQuery {
    status: (500 | 200);
    result?: any;
    colums?: object[];
    errors?: IQueryError | null;
}
