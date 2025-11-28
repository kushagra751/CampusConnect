import { useState } from "react";
import { User, Users, Send, UserPlus, MessageCircle, Heart, Music, Gamepad2, Film } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connectedUser, setConnectedUser] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [friendList] = useState(["Sam", "Aniket", "Papparazi", "Kushagra", "Ankit", "Mohit"]);

  const interests = [
    { name: "Gaming", icon: Gamepad2 },
    { name: "Music", icon: Music },
    { name: "Movies", icon: Film }
  ];

  const genderOptions = [
    { id: "male", label: "Male", emoji: "👨" },
    { id: "female", label: "Female", emoji: "👩" },
    { id: "any", label: "Anyone", emoji: "👥" }
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const startRandomChat = () => {
    setConnectedUser("RandomUser_" + Math.floor(Math.random() * 100));
    setMessages([]);
  };

  const startFriendChat = (friendName) => {
    setConnectedUser(friendName);
    setMessages([]);
  };

  const endChat = () => {
    setConnectedUser(null);
    setMessages([]);
  };

  return (
    <div className="flex h-screen bg-slate-800">
      {/* Left Sidebar - Friends List (Always Visible) */}
      <div className="w-72 bg-slate-700 border-r border-slate-600 flex flex-col">
        {/* Friends Header */}
        <div className="p-4 border-b border-slate-600">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" />
            <h2 className="text-lg font-bold text-white">FRIENDS</h2>
          </div>
        </div>

        {/* Friends List */}
        <div className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-3">
            {friendList.map((friend, i) => (
              <li 
                key={i} 
                onClick={() => startFriendChat(friend)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  connectedUser === friend 
                    ? "bg-purple-600/30 border border-purple-500" 
                    : "hover:bg-slate-600"
                }`}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <span className="text-white font-medium">{friend}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-400">Online</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {!connectedUser ? (
          /* Welcome Screen - Find Your Chat */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="bg-slate-700/50 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full border border-slate-600 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Find Your Chat</h1>
                <p className="text-slate-300">Connect with people who share your interests</p>
              </div>

              {/* Interests Selection */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Your Interests:
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {interests.map((interest) => {
                    const IconComponent = interest.icon;
                    const isSelected = selectedInterests.includes(interest.name);
                    return (
                      <button
                        key={interest.name}
                        onClick={() => toggleInterest(interest.name)}
                        className={`p-4 rounded-xl transition-all duration-300 ${
                          isSelected
                            ? "bg-yellow-500 text-black shadow-lg scale-105"
                            : "bg-slate-600 text-white hover:bg-slate-500"
                        } border border-slate-500`}
                      >
                        <IconComponent className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-xs font-medium">{interest.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gender Filter */}
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Gender Filter:
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {genderOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedGender(option.id)}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        selectedGender === option.id
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg scale-105"
                          : "bg-slate-600 hover:bg-slate-500"
                      } border border-slate-500`}
                    >
                      <div className="text-2xl mb-2">{option.emoji}</div>
                      <p className="text-xs font-medium text-white">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Chat Button */}
              <button
                onClick={startRandomChat}
                className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Start Text Chat
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* Chat Interface */
          <>
            {/* Chat Header */}
            <div className="bg-slate-700 p-4 flex justify-between items-center border-b border-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-white">Chatting with {connectedUser}</h2>
                  <p className="text-sm text-green-400">● Online</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200 text-white">
                  <UserPlus className="w-4 h-4" />
                  Add Friend
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto">
              {messages.length === 0 && (
                <div className="text-center text-slate-400 mt-20">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <p className="text-lg">Start a conversation!</p>
                  <p className="text-sm">Say hello to {connectedUser}</p>
                </div>
              )}
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`p-4 rounded-2xl max-w-xs shadow-lg ${
                        msg.sender === "You"
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
                          : "bg-slate-600 text-white border border-slate-500"
                      }`}
                    >
                      <p className="text-xs font-semibold mb-1 opacity-80">{msg.sender}</p>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-slate-700 flex items-center gap-0 border-t border-slate-600">
              <button
                onClick={endChat}
                className="bg-slate-600 hover:bg-slate-500 px-4 py-3 rounded-l-xl font-semibold text-white transition-all duration-200 border border-slate-500 border-r-0"
              >
                Esc
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-3 bg-slate-600 text-white border border-slate-500 border-l-0 border-r-0 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-400"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-r-xl hover:scale-105 transition-all duration-200 shadow-lg border border-purple-500"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}