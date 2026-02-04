import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import { Task } from "./entities/Task";

async function viewData() {
    try {
        await AppDataSource.initialize();
        console.log("\n--- DATABASE DATA INSPECTOR ---\n");

        const userRepository = AppDataSource.getRepository(User);
        const taskRepository = AppDataSource.getRepository(Task);

        const users = await userRepository.find();
        console.log("USERS:");
        if (users.length === 0) {
            console.log("No users found.");
        } else {
            console.table(users.map(u => ({ id: u.id, email: u.email })));
        }

        const tasks = await taskRepository.find({ relations: ["user"] });
        console.log("\nTASKS:");
        if (tasks.length === 0) {
            console.log("No tasks found.");
        } else {
            console.table(tasks.map(t => ({
                id: t.id,
                title: t.title,
                completed: t.completed,
                user: t.user?.email || "N/A"
            })));
        }

        await AppDataSource.destroy();
    } catch (error) {
        console.error("Error inspecting database:", error);
    }
}

viewData();
