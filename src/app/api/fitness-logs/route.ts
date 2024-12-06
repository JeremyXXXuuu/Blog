import { fitnessLogs } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const logs = await fitnessLogs();
    return NextResponse.json(logs);
  } catch (error) {
    console.error("Error in fitness-logs API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch fitness logs" },
      { status: 500 }
    );
  }
}
