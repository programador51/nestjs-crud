/**
 * Information of the query executed
 */
export interface IQueryError {

    /**
     * Error codes of the query: https://mariadb.com/kb/en/mariadb-error-codes/#shared-mariadbmysql-error-codes
     */
    codeError: string,

    /**
     * Number error code of the query: https://mariadb.com/kb/en/mariadb-error-codes/#shared-mariadbmysql-error-codes
     */
    noCodeError: number,

    /**
     * Informative message of the error: https://mariadb.com/kb/en/mariadb-error-codes/#shared-mariadbmysql-error-codes
     */
    messageError: string
}

/**
 * Information of the query executed
 */
export interface IQuery {
    /**
     * HTTP Status of the query in case of success or error
     */
    status: (500 | 200),

    /**
     * Information of the query made.
     */
    result?: any

    /**
     * Information of the columns where the data was query
     */
    colums?: object[]

    /**
     * Errors in case something wrong
     */
    errors?: IQueryError | null
}