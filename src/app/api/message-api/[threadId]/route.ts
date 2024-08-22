export const dynamic = "force-static";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function GET(req: Request, { params }: { params: { threadId: string } }) {
  const message = await openai.beta.threads.messages.create(params.threadId, {
    role: "assistant",
    content: "How can I help you?",
  });
  console.log("threadId",params.threadId)
  return Response.json(1);
}
