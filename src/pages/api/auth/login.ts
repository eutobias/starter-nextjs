import { loginUser } from "@/features/auth/login/login.api";
import { LoginResponse } from "@/features/auth/login/login.types";
import { HttpResponse, createHttpResponse } from "@/lib/http-service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<LoginResponse>>
) {
  if (req.method !== "POST") {
    return createHttpResponse(res, {
      status: 405,
    });
  }

  await loginUser(req, res);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
