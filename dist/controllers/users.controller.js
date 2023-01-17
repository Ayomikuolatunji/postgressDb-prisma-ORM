"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const prismaConnection_1 = require("../database/prismaConnection");
const ControllerError_1 = require("../middleware/ControllerError");
exports.createUsers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        (0, ControllerError_1.throwError)("Email address required", 400);
    }
    else if (!req.body.password) {
        (0, ControllerError_1.throwError)("password required", 400);
    }
    const findUser = yield prismaConnection_1.prisma.users.count({
        where: {
            email: req.body.email,
        },
    });
    if (findUser)
        (0, ControllerError_1.throwError)("User found and can not recreate", http_status_codes_1.StatusCodes.CONFLICT);
    else if (!findUser) {
        const newUser = yield prismaConnection_1.prisma.users.create({
            data: {
                email: req.body.email,
                password: req.body.password,
            },
        });
        res
            .status(201)
            .json({ message: "user created successfully", userId: newUser.userId });
    }
}));
exports.getAllUsers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const findAllUsers = yield prismaConnection_1.prisma.users.findMany({});
    res
        .status(201)
        .json({ message: "All users fetched successfully", findAllUsers });
}));
