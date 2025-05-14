import React, { useState } from "react";

export default function ChatPage() {
  const [students] = useState(["malik ali", "tariq ali", "sameh ali"]);
  const [currentChat, setCurrentChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prev) => [...prev, inputMessage]);
      setInputMessage("");
    }
  };

  return (
    <div className="textcolre flex h-screen dark:bg-[#1e1e1e] bg-[#e0e0e0] p-4 text-white gap-4 w-[100%]">
      {/* Student List */}
      <div className="textcolre w-1/4 dark:bg-[#2a2a2a] bg-[#e6e4e4] p-4 rounded-lg">
        <h2 className="textcolre text-lg font-bold mb-4">List of Students</h2>
        <div className="textcolre flex flex-col gap-3">
          {students.map((stu, i) => (
            <span
              key={i}
              onClick={() => setCurrentChat(stu)}
              className="textcolre dark:bg-[#444444] bg-[#e0e0e0] py-2 px-4 rounded-md cursor-pointer hover:bg-gray-600 transition"
            >
              {stu}
            </span>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="textcolre w-3/4 dark:bg-[#2a2a2a] bg-[#e6e4e4] rounded-lg p-4 flex flex-col">
        <div className="textcolre mb-2 font-semibold">
          chatting with{" "}
          <span className="textcolre">
            {currentChat ? currentChat : "..."}
          </span>
        </div>

        {/* Messages */}
        <div className="textcolre flex-1 overflow-y-auto mb-4 space-y-2 pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="textcolre bg-green-600 p-3 rounded-md text-right w-full ml-auto"
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="textcolre flex gap-2">
          <input
            type="text"
            placeholder="type your message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="textcolre flex-1 p-3 rounded-md dark:bg-[#444444] bg-[#e0e0e0] border border-gray-600 focus:outline-none text-white"
          />
          <button
            onClick={sendMessage}
            className="textcolre px-5 py-3 bg-green-600 text-white rounded-md hover:bg-green-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
