import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  MessageCircle,
  SquareKanban,
  UserPlus,
  Users2,
  Search,
  X,
  Link as LinkIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../lib/api.js";

function Rooms() {
  const [rooms, setRooms] = useState([
    { id: 1, name: "Room A", discussion: "Topic 1", members: 25, admin: "Jackie" },
    { id: 2, name: "Room B", discussion: "Topic 2", members: 12, admin: "Alex" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoom, setNewRoom] = useState({ name: "", discussion: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate, currentUser]);

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.discussion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateRoom = () => {
    if (!newRoom.name || !newRoom.discussion) {
      setMessage({ type: "error", text: "Please fill all fields" });
      return;
    }

    const room = {
      id: rooms.length + 1,
      ...newRoom,
      members: 1,
      admin: currentUser?.username || "You",
    };
    setRooms([...rooms, room]);
    setMessage({ type: "success", text: "Room created successfully!" });
    setShowCreateModal(false);
    setNewRoom({ name: "", discussion: "" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleJoinRoom = (roomId) => {
    setRooms(rooms.map(r => 
      r.id === roomId ? { ...r, members: r.members + 1 } : r
    ));
    setMessage({ type: "success", text: "You've joined the room!" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-20 md:w-40 bg-white border-r-2 border-black flex flex-col items-center py-4 space-y-6">
        <div className="flex flex-col items-center space-y-6">
          <Link to="/events" className="flex flex-col items-center text-sm hover:scale-105 transition">
            <Calendar className="w-8 h-8 text-blue-500" />
            <span className="hidden md:block">Events</span>
          </Link>
          <Link to="/mentors" className="flex flex-col items-center text-sm hover:scale-105 transition">
            <Users className="w-8 h-8 text-orange-500" />
            <span className="hidden md:block">Mentors</span>
          </Link>
          <div className="flex flex-col items-center text-sm">
            <SquareKanban className="w-8 h-8 text-pink-500" />
            <span className="hidden md:block">Rooms</span>
          </div>
          <Link to="/chat" className="flex flex-col items-center text-sm hover:scale-105 transition">
            <MessageCircle className="w-8 h-8 text-red-500" />
            <span className="hidden md:block">Chatting</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-2 border-b-2 border-black bg-white">
          <h1 className="text-lg md:text-xl font-bold">ROOMS</h1>
          <div className="flex items-center gap-3">
            <span className="bg-yellow-400 px-4 py-1 rounded-md border-2 border-black shadow-[3px_3px_0px_black] font-semibold">
              {currentUser?.username || "User"}
            </span>
            <div className="w-10 h-10 bg-black rounded-full"></div>
          </div>
        </header>

        {/* Search & Actions */}
        <div className="flex items-center justify-between px-4 py-3 gap-3 flex-wrap">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 border-2 border-black px-3 py-2 rounded-md shadow-[3px_3px_0px_black] bg-white hover:bg-gray-100 transition"
          >
            <UserPlus className="w-5 h-5" />
            <span className="hidden sm:block">Create Room</span>
          </button>

          <div className="flex-1 flex justify-center">
            <div className="flex items-center w-full max-w-xl bg-gray-200 rounded-full px-3 py-2 border-2 border-gray-300">
              <Search className="w-5 h-5 text-gray-500" />
              <input aria-label="Search"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none px-2"
              />
            </div>
          </div>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 border-2 border-black px-3 py-2 rounded-md shadow-[3px_3px_0px_black] bg-white hover:bg-gray-100 transition"
          >
            <LinkIcon className="w-5 h-5" />
            <span className="hidden sm:block">Dashboard</span>
          </Link>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mx-4 mt-2 p-3 rounded-lg ${
            message.type === "success" 
              ? "bg-green-100 text-green-700 border border-green-300" 
              : "bg-red-100 text-red-700 border border-red-300"
          }`}>
            {message.text}
          </div>
        )}

        {/* Table */}
        <div className="flex-1 overflow-auto px-4 pb-4">
          <div className="w-full border-2 border-black bg-gray-200 rounded-md overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-300 border-b-2 border-black">
                <tr>
                  <th className="border-r-2 border-black px-4 py-2 text-left">Name</th>
                  <th className="border-r-2 border-black px-4 py-2 text-left">Discussion</th>
                  <th className="border-r-2 border-black px-4 py-2 text-left">Members</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="border-t border-gray-400">
                    <td className="px-4 py-2">{room.name}</td>
                    <td className="px-4 py-2">{room.discussion}</td>
                    <td className="px-4 py-2">{room.members}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleJoinRoom(room.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Join
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Room Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Create New Room</h2>
                <button onClick={() => setShowCreateModal(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <input aria-label="Room Name *"
                  type="text"
                  placeholder="Room Name *"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                <input aria-label="Discussion Topic *"
                  type="text"
                  placeholder="Discussion Topic *"
                  value={newRoom.discussion}
                  onChange={(e) => setNewRoom({ ...newRoom, discussion: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateRoom}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Rooms;
