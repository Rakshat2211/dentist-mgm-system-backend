import type { VercelRequest, VercelResponse } from "@vercel/node";
import serverless from "serverless-http";

import app from "../src/app";
import connectDB from "../src/config/db";

let dbReady: Promise<void> | null = null;

if (!dbReady) {
  dbReady = connectDB();
}

const handler = async (req: VercelRequest, res: VercelResponse) => {
  await dbReady;
  return serverless(app)(req, res);
};

export default handler;
