"use client";
import React from "react";

interface Message {
  role: string | null;
  created_at: number;
  text: string;
}

interface MessageBoxProps {
  message: Message;
}

const Messagebox: React.FC<MessageBoxProps> = ({ message }) => {
  // Function that returns a JSX element
  const UserChat = (): JSX.Element => {
    return (
      <div className="flex w-full px-2 justify-end">
        <div className="px-4 py-2 bg-slate-100 rounded-2xl rounded-tr-none font-semibold max-w-[75%] flex-wrap">
          {message.text}
        </div>
      </div>
    );
  };
  const AgentChat = (): JSX.Element => {
    const content = message?.text || "";
    return (
      <div className="flex w-full px-2 justify-start">
        <div className="px-4 py-2 bg-zinc-100 rounded-2xl rounded-tl-none font-semibold max-w-[75%] flex-wrap">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col w-full my-2">
      {message.role === "user" ? <UserChat /> : <AgentChat />}
    </div>
  );
};

export default Messagebox;
