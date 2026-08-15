import type { VercelRequest, VercelResponse } from "@vercel/node";
import serverless from "serverless-http";

import app from "../src/app";
import connectDB from "../src/config/db";

let dbReady: Promise<void> | null = null;

const ensureDb = async () => {
  if (!dbReady) {
    dbReady = connectDB().catch((error) => {
      console.error("DB connection check failed:", error);
      return;
    });
  }

  await dbReady;
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    await ensureDb();
  } catch (error) {
    console.error("Startup DB initialization failed:", error);
  }

  return serverless(app)(req, res);
};

export default handler;
