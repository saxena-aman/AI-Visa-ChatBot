import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaRegStopCircle } from "react-icons/fa";

interface TextboxProps {
  send: (text: string) => void; // Function with no arguments and no return value
  loading: boolean;
}

const Textbox: React.FC<TextboxProps> = ({ send, loading }) => {
  const [text, setText] = useState<string>("");

  const handleSend = () => {
    send(text);
    setText(""); // Optionally clear the input field after sending
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (loading) return;
    if (e.key === "Enter") handleSend();
  };
  return (
    <div
      onKeyDown={handleKeyDown}
      className="flex items-center justify-between bg-gray-800 overflow-hidden p-1 border border-white border-opacity-30 rounded-lg shadow-md h-[100%] w-[100%]"
    >
      <input
        className="w-[90%] h-full border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2"
        type="text"
        name="text"
        id="input"
        placeholder="Ask Something!"
        value={text}
        autoComplete="off"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSend} disabled={loading}>
        {" "}
        {loading ? (
          <FaRegStopCircle className="text-white mx-2 text-xl" />
        ) : (
          <BsSend className="text-white mx-2 text-xl cursor-pointer" />
        )}{" "}
      </button>
    </div>
  );
};

export default Textbox;
