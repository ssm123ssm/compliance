import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("GET /api/databases");
  return NextResponse.json({
    status: 200,
    databases: [
      { value: "Banking Act" },
      { value: "Foreign Exchange Act" },
      { value: "No DB" },
    ],
  });
}
