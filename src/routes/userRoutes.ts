import { Router } from "express";
import * as userController from "@/controllers/userController";

const router = Router();

// GET all tasks
router.get("/", userController.getAllUsers);

// GET task by id
router.get("/:id", userController.getUserById);

// POST create task
router.post("/", userController.createUser);

// DELETE task
router.delete("/:id", userController.deleteUser);

export default router;
