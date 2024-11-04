import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const APP_VERSION = process.env.APP_VERSION;

export const GET = async (_req: NextRequest) => {
  console.log("GET /api/version", APP_VERSION);
  try {
    if (!APP_VERSION) {
      throw new Error("APP_VERSION is not defined");
    }
    return NextResponse.json({ version: APP_VERSION });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};
