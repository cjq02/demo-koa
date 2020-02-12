import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { join } from 'path';
const parentDir = join(__dirname, '..');

const connectionOpts: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'api.cjq02.com',
    port: Number(process.env.DB_PORT) || 5434,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'daily-record-db',
    entities: [
        `${parentDir}/**/*Entity.ts`,
    ],
    synchronize: true,
};

const connection: Promise<Connection> = createConnection(connectionOpts);

export default connection;