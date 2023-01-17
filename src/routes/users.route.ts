import express, { Router } from "express";
import { createUsers } from "../controllers/users.controller";

const router = Router();

router.post("/users", createUsers);

export default router;
