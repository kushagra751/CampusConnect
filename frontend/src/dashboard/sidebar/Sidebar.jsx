import { Users, MessageCircle, Calendar, User, Home } from "lucide-react";

export default function Sidebar({ setActivePage }) {
  return (
    <div className="w-64 bg-black/80 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">University</div>
      <nav className="flex-1 p-4 space-y-4">
        <button
          onClick={() => setActivePage("events")}
          className="flex items-center gap-2 hover:text-yellow-400"
        >
          <Calendar className="w-5 h-5" /> Events
        </button>
        <button
          onClick={() => setActivePage("chat")}
          className="flex items-center gap-2 hover:text-yellow-400"
        >
          <MessageCircle className="w-5 h-5" /> Random Chat
        </button>
        <button
          onClick={() => setActivePage("rooms")}
          className="flex items-center gap-2 hover:text-yellow-400"
        >
          <Home className="w-5 h-5" /> Rooms
        </button>
        <button
          onClick={() => setActivePage("mentors")}
          className="flex items-center gap-2 hover:text-yellow-400"
        >
          <Users className="w-5 h-5" /> Mentors
        </button>
        <button
          onClick={() => setActivePage("profile")}
          className="flex items-center gap-2 hover:text-yellow-400"
        >
          <User className="w-5 h-5" /> Profile
        </button>
      </nav>
    </div>
  );
}
