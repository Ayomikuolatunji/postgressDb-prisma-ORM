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
exports.createUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prismaConnection_1 = require("../database/prismaConnection");
exports.createUsers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = Object.assign({}, req.body);
    const newUser = yield prismaConnection_1.prisma.users.create({
        data: {
            email: requestBody.email,
            password: requestBody.password,
        },
    });
    res
        .status(201)
        .json({ message: "user created successfully", userId: newUser.userId });
}));
