import React, { useState } from "react";
import { User, Users, Volume2, VolumeX, Menu, X } from "lucide-react";

export default function Chat() {
  const [muted, setMuted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="grid grid-cols-3 items-center p-3 border-b bg-white shadow relative">
        {/* Left (Mobile Menu Button) */}
        <div className="flex items-center">
          <button
            className="sm:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Center Title */}
        <h1 className="text-center text-lg md:text-xl font-bold">
          CHATTING
        </h1>

        {/* Right Section */}
        <div className="flex justify-end items-center gap-2">
          <button className="bg-yellow-400 px-2 md:px-3 py-1 rounded-lg font-semibold text-sm md:text-base">
            Jackie
          </button>
          <User className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigation Sidebar (hidden on mobile) */}
        <div className="hidden sm:flex w-16 border-r bg-white flex-col items-center py-4 space-y-6">
          <button className="flex flex-col items-center space-y-1">
            <img src="https://cdn-icons-png.flaticon.com/512/1827/1827370.png" alt="Events" className="w-6 h-6 md:w-8 md:h-8" />
            <span className="text-[10px] md:text-xs">Events</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="Memories" className="w-6 h-6 md:w-8 md:h-8" />
            <span className="text-[10px] md:text-xs">Memories</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <img src="https://cdn-icons-png.flaticon.com/512/906/906361.png" alt="Chatting" className="w-6 h-6 md:w-8 md:h-8" />
            <span className="text-[10px] md:text-xs">Chat</span>
          </button>
        </div>

        {/* Friends Sidebar (hidden on small) */}
        <div className="hidden md:block w-1/5 border-r bg-white p-3">
          <h2 className="font-semibold mb-2">FRIENDS</h2>
          <ul className="space-y-2 text-sm md:text-base">
            {["sam", "Aniket", "papparazi", "kushagra", "Ankit", "Mohit"].map(
              (friend, i) => (
                <li key={i} className="flex items-center gap-2 cursor-pointer">
                  <User className="w-4 h-4" />
                  <span>{friend}</span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="flex-1 relative flex items-center justify-center p-2 md:p-6">
          {/* Mute/Unmute Button */}
          <button
            className="absolute top-3 right-3 md:top-4 md:right-4"
            onClick={() => setMuted(!muted)}
          >
            {muted ? (
              <VolumeX className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </button>

          {/* Chat Box */}
          <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 w-full sm:w-96">
            <div className="mb-4">
              <p className="font-semibold mb-2">Your Interest :</p>
              <div className="grid grid-cols-3 gap-2">
                {["Gaming", "Music", "Movies"].map((interest) => (
                  <button
                    key={interest}
                    className="bg-yellow-400 p-2 rounded-md font-medium text-sm md:text-base"
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">Gender filter :</p>
              <div className="flex justify-around">
                <div className="bg-green-200 p-2 rounded-lg">
                  <img src="https://cdn-icons-png.flaticon.com/512/2922/2922506.png" alt="Male" className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <div className="bg-green-200 p-2 rounded-lg">
                  <img src="https://cdn-icons-png.flaticon.com/512/2922/2922561.png" alt="Female" className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <div className="bg-green-200 p-2 rounded-lg">
                  <Users className="w-10 h-10 md:w-12 md:h-12" />
                </div>
              </div>
            </div>

            <button className="w-full bg-yellow-400 py-2 md:py-3 rounded-md font-semibold flex items-center justify-center gap-2 text-sm md:text-base">
              💬 Start Text chat
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="w-64 bg-white h-full p-4">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="font-semibold mb-4">Navigation</h2>
            <ul className="space-y-4">
              <li className="cursor-pointer">Events</li>
              <li className="cursor-pointer">Memories</li>
              <li className="cursor-pointer">Chatting</li>
            </ul>

            <h2 className="font-semibold mt-6 mb-4">Friends</h2>
            <ul className="space-y-2">
              {["sam", "Aniket", "papparazi", "kushagra", "Ankit", "Mohit"].map(
                (friend, i) => (
                  <li key={i} className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    <span>{friend}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
