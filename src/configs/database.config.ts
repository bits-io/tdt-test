import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

export const DatabaseConfig = TypeOrmModule.forRootAsync({
    name: 'default',
    useFactory() {
        return {
            type: process.env.DB_TYPE as 'mysql' | 'postgres' | 'sqlite' | 'mssql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ["dist/**/*.entity{.ts,.js}"],
            migrations: ["dist/src/database/migrations/*{.ts,.js}"],
            logging: process.env.APP_ENV == "local",
            synchronize: false,
            migrationsRun: true,
            migrationsTransactionMode: 'all',
            useUTC: true
        };
    },
    async dataSourceFactory(options) {
        return addTransactionalDataSource(new DataSource(options));
    },
});