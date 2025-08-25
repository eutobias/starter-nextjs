import {
  RegisterFormData,
  RegisterResponse,
} from "@/features/auth/register/register.types";
import { registerValidations } from "@/features/auth/register/register.validations";
import { PrismaClient } from "@/generated/prisma";
import { generateRefreshToken, generateSecureToken } from "@/lib/crypto";
import { handleValidationErrors } from "@/lib/error-handler";
import { HttpResponse, createHttpResponse } from "@/lib/http-service";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";

const prisma = new PrismaClient();

export const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<RegisterResponse>>
) => {
  try {
    await registerValidations.validate(req.body, {
      abortEarly: false,
    });
    const { name, email, password, repeatPassword, accessLevel = 1 } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate user ID
    const userId = randomUUID();

    // Create user
    const user = await prisma.user.create({
      data: {
        id: userId,
        name,
        email,
        accessLevel: accessLevel || 1,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Generate secure tokens
    const accessToken = generateSecureToken();
    const refreshToken = generateRefreshToken();

    // Token expires in 24 hours
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Store tokens in database
    await prisma.tokens.create({
      data: {
        id: randomUUID(),
        userId: user.id,
        token: accessToken,
        refreshToken,
        expiresAt,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return createHttpResponse(res, {
      status: 201,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          accessLevel: user.accessLevel,
        },
        token: accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      const errors = handleValidationErrors(error);
      return createHttpResponse(res, {
        status: 400,
        data: errors,
      });
    }

    return createHttpResponse(res, {
      status: 400,
      data: {
        message: (error as Error).message,
      },
    });
  } finally {
    await prisma.$disconnect();
  }
};
