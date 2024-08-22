// export const dynamic = "force-static";
export const fetchCache = 'force-no-store';
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(
  req: Request,
  { params }: { params: { threadId: string } }
) {
  let run = await openai.beta.threads.runs.createAndPoll(params.threadId, {
    assistant_id: process.env.ASSISTANT_ID || "",
  });
  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    return Response.json(messages.data.reverse());
  } else {
    console.log(run.status);
  }
  return Response.json(1);
}
