// export const dynamic = "force-static";
export const fetchCache = 'force-no-store';
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST() {
  const thread = await openai.beta.threads.create();
  return Response.json(thread.id);
}
