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
    const checkAndCreateThread = async () => {
        await createThread();
        console.log("The Thread ID has been set:", threadID);
        setThreadLoader(false);
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
