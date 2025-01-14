import { useEffect, useState } from "react";
import { IoArrowBackOutline, IoSend } from "react-icons/io5";

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [isChatting, setIsChatting] = useState(false);
  const [noConversation, setNoConversation] = useState(false);

  // Fetch authenticated user
  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const response = await fetch("/api/users/auth", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAuthUser(data);
        }
      } catch (error) {
        console.error("Error fetching authenticated user:", error);
      }
    };
    fetchAuthUser();
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch conversation
  useEffect(() => {
    const fetchConversation = async () => {
      if (!selectedUser) return;
      try {
        const response = await fetch(
          `/api/messages/conversation/${selectedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []);
          setNoConversation(data.messages?.length === 0);
        } else {
          setMessages([]);
          setNoConversation(true);
        }
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };
    fetchConversation();
  }, [selectedUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message || !selectedUser) return;
    try {
      const response = await fetch("/api/messages/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverId: selectedUser._id,
          content: message,
        }),
      });
      if (response.ok) {
        const newMessage = { sender: authUser, content: message };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage("");
        setNoConversation(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsChatting(true);
  };

  const handleBackToList = () => {
    setIsChatting(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen h-full">
      {/* Header */}
      <div className="flex justify-between items-center bg-transparent p-4 shadow-md">
        <div className="flex items-center">
          {isChatting && selectedUser && (
            <button
              onClick={handleBackToList}
              className="text-white bg-gray-600 p-2 rounded-full hover:bg-gray-700 transition duration-300 mr-4"
            >
              <IoArrowBackOutline size={24} />
            </button>
          )}
          <h1 className="text-white text-xl font-bold">
            {isChatting && selectedUser ? selectedUser.username : "Chat Room"}
          </h1>
        </div>
        {isChatting && selectedUser && (
          <img
            src={selectedUser.profileImg || "/avatar-placeholder.png"}
            alt={selectedUser.username}
            className="w-12 h-12 rounded-full"
          />
        )}
      </div>

      {/* User List */}
      {!isChatting && (
        <div className="w-full bg-transparent p-4 shadow-lg overflow-y-auto transition-all min-h-screen h-full">
          <h2 className="text-white font-bold mb-4">Select a User to Chat</h2>
          <ul className="space-y-4">
            {users
              .filter((user) => user._id !== authUser?._id)
              .map((user) => (
                <li
                  key={user._id}
                  className="cursor-pointer py-2 px-4 rounded-lg hover:bg-gray-600 transition-all bg-gray-800 text-white"
                  onClick={() => handleSelectUser(user)}
                >
                  <div className="flex items-center w-full">
                    <img
                      src={user.profileImg || "/avatar-placeholder.png"}
                      alt={user.username}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span className="text-lg font-medium">{user.username}</span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Chat Area */}
      {isChatting && selectedUser && (
        <div className="flex flex-col h-[820px]">
          <div className="flex-1 bg-transparent p-6 overflow-y-auto ">
            {messages.length > 0 ? (
              messages.map((msg, index) => {
                const isSender = msg.sender._id === authUser._id;
                const avatar = isSender
                  ? authUser.profileImg
                  : selectedUser.profileImg;
                const username = isSender
                  ? authUser.username
                  : selectedUser.username;
                return (
                  <div
                    key={index}
                    className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}
                  >
                    {!isSender && (
                      <img
                        src={avatar || "/avatar-placeholder.png"}
                        alt={username}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                    )}
                    <div
                      className={`p-3 rounded-lg max-w-xs text-white ${
                        isSender ? "bg-blue-600" : "bg-gray-600"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {isSender && (
                      <img
                        src={avatar || "/avatar-placeholder.png"}
                        alt={username}
                        className="w-10 h-10 rounded-full ml-2"
                      />
                    )}
                  </div>
                );
              })
            ) : (
              noConversation && (
                <div className="text-center text-gray-500">
                  <p>No conversation found, start chatting now!</p>
                </div>
              )
            )}
          </div>
          <form className="flex items-center p-4 bg-transparent" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="ml-4 p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-all"
            >
              <IoSend size={24} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
