import express, { Router } from "express";
import { createUsers, getAllUsers } from "../controllers/users.controller";

const router = Router();

router.post("/users", createUsers);
router.get("/users", getAllUsers);

export default router;
