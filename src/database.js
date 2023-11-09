import mysqlConecction from 'mysql2/promise';


// Propiedades de la base de datos
const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biblioteca'
}

export const pool = mysqlConecction.createPool(properties);
