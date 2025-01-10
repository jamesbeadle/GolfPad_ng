import * as sql from 'mssql';
import * as functions from 'firebase-functions';

export interface DBConfig {
  user: string;
  password: string;
  server: string;
  database: string;
  port: number;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
}

const dbConfig: DBConfig = {
  user: functions.config().sql.user,
  password: functions.config().sql.password,
  server: functions.config().sql.host,
  database: functions.config().sql.dbname,
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

let pool: sql.ConnectionPool | undefined = undefined;

export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect(dbConfig);
    console.log('Connected to SQL Server');
  }
  return pool;
}
