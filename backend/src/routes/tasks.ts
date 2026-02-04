import { Router } from "express";
import { getTasks, createTask, getTask, updateTask, deleteTask, toggleTask } from "../controllers/taskController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.use(authenticateToken);

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleTask);

export default router;
