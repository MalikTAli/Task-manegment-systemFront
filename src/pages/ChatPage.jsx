import React, { useEffect, useState } from "react";
import { getAllStudents } from "../services/studentService";
import { getAllAdmins } from "../services/adminService";
import { getMessagesBetween } from "../services/chatService";
import {
  connectSocket,
  sendMessageSocket,
  receiveMessageSocket,
} from "../services/socketService";
import LoaderSpinner from "../ui/LoaderSpinner";
import { useSelector } from "react-redux";
import { getNameFromEmail } from "../utilites/getNameFromEmail";

export default function ChatPage() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [students, setStudens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  // الاتصال بـ Socket عند الدخول
  useEffect(() => {
    if (user?.id) {
      connectSocket(user.id);
      receiveMessageSocket((data) => {
        if (
          currentChat &&
          (data.fromUserId === currentChat.id || data.toUserId === currentChat.id)
        ) {
          setMessages((prev) => [
            ...prev,
            {
              content: data.message,
              sender: { id: data.fromUserId },
            },
          ]);
        }
      });
    }
  }, [user?.id, currentChat]);

  // تحميل قائمة المحادثات
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let data = [];

        if (user?.role?.trim() === "admin") {
          data = await getAllStudents(token);
        } else if (user?.role?.trim() === "student") {
          data = await getAllAdmins(token);
        }

        setStudens(data);
      } catch (error) {
        console.error("Error loading data:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token, user?.role]);

  // عند اختيار شخص، تحميل المحادثة بين المستخدمين
  const handleSelectChat = async (chatUser) => {
    setCurrentChat(chatUser);
    try {
      const fetchedMessages = await getMessagesBetween(user.id, chatUser.id, token);
      setMessages(fetchedMessages);
    } catch (err) {
      console.error("Error fetching messages:", err.message);
    }
  };

  // إرسال رسالة
  const sendMessage = () => {
    const trimmed = inputMessage.trim();
    if (trimmed && currentChat) {
      const messageObj = {
        message: trimmed,
        toUserId: currentChat.id,
        fromUserId: user.id,
      };

      sendMessageSocket(messageObj);

      // تحديث الرسائل محليًا بشكل فوري
      setMessages((prev) => [
        ...prev,
        {
          content: trimmed,
          sender: { id: user.id },
        },
      ]);
      setInputMessage("");
    }
  };

  return (
    <div className="textcolre flex h-screen dark:bg-[#1e1e1e] bg-[#e0e0e0] p-4 text-white gap-4 w-[100%]">
      {/* قائمة الطلاب أو المسؤولين */}
      <div className="textcolre w-1/4 dark:bg-[#2a2a2a] bg-[#e6e4e4] p-4 rounded-lg">
        <h2 className="textcolre text-lg font-bold mb-4">
          List of {user.role === "admin" ? "students" : "admins"}
        </h2>
        {loading ? (
          <LoaderSpinner />
        ) : (
          <div className="textcolre flex flex-col gap-3">
            {students.map((stu, i) => (
              <span
                key={i}
                onClick={() => handleSelectChat(stu)}
                className={`textcolre dark:bg-[#444444] bg-[#e0e0e0] py-2 px-4 rounded-md cursor-pointer hover:bg-gray-600 transition ${
                  currentChat?.id === stu.id ? "bg-green-600 text-white" : ""
                }`}
              >
                {getNameFromEmail(stu.email)}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* صندوق المحادثة */}
      <div className="textcolre w-3/4 dark:bg-[#2a2a2a] bg-[#e6e4e4] rounded-lg p-4 flex flex-col">
        <div className="textcolre mb-2 font-semibold">
          chatting with{" "}
          <span className="textcolre">
            {currentChat ? getNameFromEmail(currentChat.email) : "..."}
          </span>
        </div>

        {/* الرسائل */}
        <div className="textcolre flex-1 overflow-y-auto mb-4 space-y-2 pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`textcolre p-3 rounded-md w-fit max-w-[70%] ${
                msg.sender.id === user.id
                  ? "ml-auto bg-green-600 text-right"
                  : "mr-auto bg-gray-500 text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* إدخال الرسالة */}
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
