import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";
import { User } from "../entities/User";
import { Like } from "typeorm";

export const getTasks = async (req: any, res: Response) => {
    const userId = req.user.userId;
    const { page = 1, limit = 10, status, search } = req.query;

    const taskRepository = AppDataSource.getRepository(Task);

    const where: any = { user: { id: userId } };
    if (status) {
        where.completed = status === "completed";
    }
    if (search) {
        where.title = Like(`%${search}%`);
    }

    const [tasks, total] = await taskRepository.findAndCount({
        where,
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
        order: { createdAt: "DESC" },
    });

    res.json({
        tasks,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
    });
};

export const createTask = async (req: any, res: Response) => {
    const userId = req.user.userId;
    const { title, description } = req.body;

    if (!title) return res.status(400).json({ message: "Title required" });

    const taskRepository = AppDataSource.getRepository(Task);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) return res.status(404).json({ message: "User not found" });

    const task = taskRepository.create({ title, description, user });
    await taskRepository.save(task);

    res.status(201).json(task);
};

export const getTask = async (req: any, res: Response) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOne({
        where: { id: Number(id), user: { id: userId } },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
};

export const updateTask = async (req: any, res: Response) => {
    const { id } = req.params;
    const userId = req.user.userId;
    const { title, description, completed } = req.body;

    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOne({
        where: { id: Number(id), user: { id: userId } },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    await taskRepository.save(task);
    res.json(task);
};

export const deleteTask = async (req: any, res: Response) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const taskRepository = AppDataSource.getRepository(Task);
    const result = await taskRepository.delete({ id: Number(id), user: { id: userId } });

    if (result.affected === 0) return res.status(404).json({ message: "Task not found" });
    res.status(204).send();
};

export const toggleTask = async (req: any, res: Response) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOne({
        where: { id: Number(id), user: { id: userId } },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    await taskRepository.save(task);
    res.json(task);
};
