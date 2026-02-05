import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Task } from "./entities/Task";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.DB_PATH || "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Task],
    migrations: [],
    subscribers: [],
});
