import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";

export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
            console.log("JWT Verification Error:", err.message);
            return res.sendStatus(401);
        }
        req.user = user;
        console.log("Authenticated User ID:", user.userId);
        next();
    });
};
