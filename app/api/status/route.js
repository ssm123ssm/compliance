import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const response = await fetch(process.env.PROCESSOR_ENDPOINT + "/status", {
      cache: "no-store",
    });
    const data = await response.json();
    console.log(data);

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}
