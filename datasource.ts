import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'tdt_test',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/database/migrations/*{.ts,.js}'],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  seeds: ['dist/src/database/seeds/*{.ts,.js}'],
};

const _ds = new DataSource(options);

export default _ds;
