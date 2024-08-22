import Image from "next/image";
import Chatbot from "./Chatbot/Chatbot";

export default function Home() {
  return (
    <div className="bg-blue-200 h-[100vh] w-full flex items-center justify-center">
      <Chatbot/>
    </div>
  );
}
