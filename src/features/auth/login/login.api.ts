import { LoginFormData, LoginResponse } from "@/features/auth/login/login.types";
import { loginValidations } from "@/features/auth/login/login.validations";
import { PrismaClient } from "@/generated/prisma";
import { generateRefreshToken, generateSecureToken } from "@/lib/crypto";
import { handleValidationErrors } from "@/lib/error-handler";
import { HttpResponse, createHttpResponse } from "@/lib/http-service";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";

const prisma = new PrismaClient();

export const loginUser = async (
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<LoginResponse>>
) => {
  try {
    await loginValidations.validate(req.body, {
      abortEarly: false,
    });
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

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
      status: 200,
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