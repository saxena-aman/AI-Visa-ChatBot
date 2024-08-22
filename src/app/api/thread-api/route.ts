export const dynamic = "force-static";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function GET() {
  const thread = await openai.beta.threads.create();
  return Response.json(thread.id);
}
