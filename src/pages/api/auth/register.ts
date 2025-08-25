import { registerUser } from "@/features/auth/register/register.api";
import { RegisterResponse } from "@/features/auth/register/register.types";
import { PrismaClient } from "@/generated/prisma";
import { HttpResponse } from "@/lib/http-service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<RegisterResponse>>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Method not allowed" } });
  }

  await registerUser(req, res);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
