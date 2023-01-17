import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../database/prismaConnection";
import { throwError } from "../middleware/ControllerError";

export const createUsers = expressAsyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    throwError("Email address required", 400);
  } else if (!req.body.password) {
    throwError("password required", 400);
  }
  const findUser = await prisma.users.count({
    where: {
      email: req.body.email,
    },
  });
  if (findUser)
    throwError("User found and can not recreate", StatusCodes.CONFLICT);
  else if (!findUser) {
    const newUser = await prisma.users.create({
      data: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    res
      .status(201)
      .json({ message: "user created successfully", userId: newUser.userId });
  }
});

export const getAllUsers = expressAsyncHandler(async (req, res, next) => {
  const findAllUsers = await prisma.users.findMany({});
  res
    .status(201)
    .json({ message: "All users fetched successfully", findAllUsers });
});
