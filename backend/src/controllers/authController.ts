import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ email, password: hashedPassword });
    await userRepository.save(user);

    res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    res.json({ accessToken, refreshToken });
};

export const refresh = (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, decoded: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ userId: decoded.userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        res.json({ accessToken });
    });
};

export const logout = (req: Request, res: Response) => {
    // In a real app, you'd invalidate the refresh token in the DB
    res.json({ message: "Logged out" });
};
