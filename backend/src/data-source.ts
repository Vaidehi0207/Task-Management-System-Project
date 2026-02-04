import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Task } from "./entities/Task";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Task],
    migrations: [],
    subscribers: [],
});
