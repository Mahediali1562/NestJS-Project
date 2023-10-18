import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

export const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/migration/changesets/*.ts'],
});
