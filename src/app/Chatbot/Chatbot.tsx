"use client";
import React, { useEffect, useState, useRef } from "react";
import Messagebox from "./Messagebox";
import Textbox from "./Textbox";
import Loader from "./Loader";
import LoadingScreen from "./LoadingScreen";

const Chatbot = () => {
  const ref = useRef<HTMLDivElement>(null);

  type Message = {
    role: string | null;
    created_at: number;
    text: string;
  };
  const now = new Date();
  const [threadLoader, setThreadLoader] = useState(true);
  let threadChecker=false;
  const [loading, setLoading] = useState(false);
  const [threadID, setThreadID] = useState("");
  const [objects, setObjects] = useState<Message[]>([]);

  async function createThread() {
    const res = await fetch("../api/thread-api", { cache: 'no-store' }); // Creating Thread
    const id = await res.json();
    setThreadID(id);
    const result = await fetch(`../api/getMessages-api/${id}`, { cache: 'no-store' }); // getting initial messages
    const data: any[] = await result.json();
    const messages: Message[] = data.map((message) => ({
      role: message.role,
      created_at: message.created_at,
      text: message.content[0]?.text?.value || "",
    }));
    console.log("Formatted messages", messages);
    setObjects(messages);
  }
  useEffect(() => {
    // setObjects([
    //   {
    //     role: "user",
    //     created_at: 1724343200,
    //     text: "give me russia immigration status",
    //   },
    //   {
    //     role: "assistant",
    //     created_at: 1724343202,
    //     text: "<p>The current immigration status to Russia involves several steps:</p>\n\n<ol>\n  <li>Choose the type of visa you need (e.g., tourist, business, work).</li>\n  <li>Gather required documents (passport, application form, visa support/invitation).</li>\n  <li>Submit your application to a Russian consulate or visa center.</li>\n  <li>Pay the visa fee and wait for processing.</li>\n  <li>Register your visa upon arrival if staying longer than 7 days.</li>\n</ol>\n\n<p>For specific details, check the latest updates from the Russian consulate or official immigration websites.</p>",
    //   },
    //   {
    //     role: "user",
    //     created_at: 1724343224,
    //     text: "what is for usa",
    //   },
    //   {
    //     role: "assistant",
    //     created_at: 1724343226,
    //     text: "<p>The process for obtaining a U.S. visa involves the following steps:</p>\n\n<ol>\n  <li>Determine the type of visa you need (e.g., tourist, business, student, work).</li>\n  <li>Complete the online visa application form DS-160.</li>\n  <li>Pay the visa application fee.</li>\n  <li>Schedule an appointment for a visa interview at a U.S. Embassy or Consulate.</li>\n  <li>Gather necessary documents (passport, application confirmation, photo, support documents).</li>\n  <li>Attend the visa interview and await the decision.</li>\n</ol>\n\n<p>For specific details, check the latest updates from the U.S. Department of State’s website.</p>",
    //   },
    // ]);

    const checkAndCreateThread = async () => {
      if (threadChecker===false) {
        threadChecker=true;
        await createThread();
        console.log("The Thread ID has been set:", threadID);
        setThreadLoader(false);
      }
    };

    checkAndCreateThread();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [objects]);
  function addMessage(question: string) {
    const newMessage: Message = {
      role: "user",
      created_at: now.getTime(),
      text: question,
    };
    setObjects((prevMessages) => [...prevMessages, newMessage]);
  }
  async function getAnswer(question: string) {
    setLoading(true);
    addMessage(question);
    const textMessage = question;

    const res = await fetch("../api/chatbot-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        threadID,
        textMessage
      }),
    });

    const data: any[] = await res.json();
    const messages: Message[] = data.map((message) => ({
      role: message.role,
      created_at: message.created_at,
      text: message.content[0]?.text?.value || "",
    }));
    console.log("Formatted messages", messages);
    setObjects(messages);
    setLoading(false);
  }

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white w-96 h-[99vh] relative rounded-xl">
      <div
        className={`transition-opacity duration-500 ease-in-out h-full w-full absolute ${
          threadLoader ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        <LoadingScreen />
      </div>
      <div
        className={`transition-opacity duration-500 ease-in-out h-full w-full absolute  ${
          threadLoader ? "opacity-0 " : "opacity-100"
        }`}
      >
        <div className="flex rounded-xl rounded-bl-none rounded-br-none justify-center items-center text-center h-[5%] bg-gray-800 ">
          <p className="font-medium text-white">Visa Helper</p>
        </div>
        <div className="absolute bottom-0 w-full h-[95%] px-6  rounded-bl-xl rounded-br-xl">
          <div className="flex items-end h-[91%] pb-4 ">
            <div className="flex flex-col  w-full max-h-[100%] overflow-y-scroll no-scrollbar">
              {objects.map((item, index) => {
                return <Messagebox message={item} key={index} />;
              })}
              {loading && (
                <div className="ml-4">
                  <Loader />
                </div>
              )}
              <div ref={ref}></div>
            </div>
          </div>
          <div className="w-full h-[9%] pb-4 flex justify-center items-center">
            <Textbox send={getAnswer} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
