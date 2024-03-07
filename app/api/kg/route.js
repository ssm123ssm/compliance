import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { RemoteRunnable } from "@langchain/core/runnables/remote";

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  console.log(messages);

  const response2 = await fetch(process.env.PROCESSOR_ENDPOINT + "/chat", {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify({ messages }),
  });
  const data = await response2.json();
  console.log(data.response);

  return new StreamingTextResponse(data.response);
}
