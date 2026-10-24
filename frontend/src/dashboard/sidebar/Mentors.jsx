import React, { useState, useEffect } from "react";
import { User, Mail, MessageCircle, Star, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../lib/api.js";

export default function Mentors() {
  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.j@university.edu",
      department: "Computer Science",
      rating: 4.8,
      expertise: ["React", "Node.js", "Database Design"],
      status: "online",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "m.chen@university.edu",
      department: "Software Engineering",
      rating: 4.9,
      expertise: ["Python", "Machine Learning", "AI"],
      status: "online",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "e.rodriguez@university.edu",
      department: "Web Development",
      rating: 4.7,
      expertise: ["JavaScript", "Vue.js", "UI/UX"],
      status: "offline",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messageStatus, setMessageStatus] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      setMessageStatus({ type: "error", text: "Please enter a message" });
      return;
    }
    setMessageStatus({ type: "success", text: `Message sent to ${showMessageModal.name}!` });
    setShowMessageModal(null);
    setMessageText("");
    setTimeout(() => setMessageStatus({ type: "", text: "" }), 3000);
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
            <User className="text-purple-500" />
            Mentors
          </h1>
          <p className="text-gray-600">Connect with experienced mentors</p>
        </div>

        {/* Message Status */}
        {messageStatus.text && (
          <div className={`mb-4 p-3 rounded-lg ${
            messageStatus.type === "success" 
              ? "bg-green-100 text-green-700 border border-green-300" 
              : "bg-red-100 text-red-700 border border-red-300"
          }`}>
            {messageStatus.text}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input aria-label="Search mentors by name or department..."
              type="text"
              placeholder="Search mentors by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="text-purple-600" size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-gray-600">{mentor.department}</p>
                  </div>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    mentor.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                  title={mentor.status}
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={16} />
                  <span className="text-sm font-semibold">{mentor.rating}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setShowMessageModal(mentor)}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
                >
                  <MessageCircle size={16} />
                  Message
                </button>
                <button 
                  onClick={() => handleEmail(mentor.email)}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg"
                >
                  <Mail size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No mentors found</p>
          </div>
        )}

        {/* Message Modal */}
        {showMessageModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Message {showMessageModal.name}</h2>
                <button onClick={() => setShowMessageModal(null)}>
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <textarea
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  rows={4}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSendMessage}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
                  >
                    Send
                  </button>
                  <button
                    onClick={() => {
                      setShowMessageModal(null);
                      setMessageText("");
                    }}
                    className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="text-purple-500 hover:text-purple-600 font-semibold"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
