import expressAsyncHandler from "express-async-handler";
import { prisma } from "../database/prismaConnection";

export const createUsers = expressAsyncHandler(async (req, res, next) => {
  const requestBody = { ...req.body };
  const newUser = await prisma.users.create({
    data: {
      email: requestBody.email,
      password: requestBody.password,
    },
  });

  res
    .status(201)
    .json({ message: "user created successfully", userId: newUser.userId });
});
