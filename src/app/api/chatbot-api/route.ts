export const dynamic = "force-static";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
async function addMessage(threadID: string, textMessage: string) {
  const message = await openai.beta.threads.messages.create(threadID, {
    role: "user",
    content: textMessage,
  });
}
async function runThread(threadID: string) {
  let run = await openai.beta.threads.runs.createAndPoll(threadID, {
    assistant_id: process.env.ASSISTANT_ID || "",
  });
  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    return messages.data.reverse();
  } else {
    console.log(run.status);
  }
  return "0";
}
export async function POST(req: Request) {
  const { threadID, textMessage} = await req.json();
  await addMessage(threadID, textMessage);
  const result = await runThread(threadID);
  return Response.json(result);
}
