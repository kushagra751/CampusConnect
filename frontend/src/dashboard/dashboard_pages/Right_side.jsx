import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import ProfileSection from "../dashboard_pages/ProfileSection.jsx";
import { useState } from "react";

const Right_side = () => {
    const [showProfile, setShowProfile] = useState(false); // profile toggle state

  return (
    <>
      <main className="flex-1 p-6">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-gray-700">
            🔔 Notifications
          </div>
          <div className="flex items-center gap-4">
            <button className="text-2xl text-blue-500 hover:text-cyan-500">
              <FaBell />
            </button>
            <button
              className="text-2xl text-blue-500 hover:text-cyan-500"
              onClick={() => setShowProfile(true)} // open profile on click
            >
              <FaUserCircle />
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-gray-700">
            {new Date().toDateString()}
          </h2>
          <h1 className="text-3xl font-extrabold mt-2 text-gray-900">
            Welcome back, User!
          </h1>
        </div>

        {/* Events + Mentors + Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Events Section */}
          <div className="bg-white shadow-md rounded-xl p-6 col-span-2 border-t-4 border-blue-500">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              New Events
            </h2>
            <ul className="space-y-2">
              <li className="bg-blue-100 text-blue-800 p-3 rounded-md shadow">
                🌟 Hackathon 2025
              </li>
              <li className="bg-blue-100 text-blue-800 p-3 rounded-md shadow">
                🎤 Tech Talk with Mentors
              </li>
              <li className="bg-blue-100 text-blue-800 p-3 rounded-md shadow">
                📚 Study Jam: React Basics
              </li>
            </ul>
          </div>

          {/* Right Column: Mentors + Posts */}
          <div className="space-y-6">
            {/* Online Mentors */}
            <div className="bg-white shadow-md rounded-xl p-6 border-t-4 border-cyan-500">
              <h2 className="text-xl font-bold mb-3 text-gray-800">
                Online Mentors
              </h2>
              <div className="flex gap-3">
                <FaUserCircle className="text-4xl text-blue-600" />
                <FaUserCircle className="text-4xl text-blue-600" />
                <FaUserCircle className="text-4xl text-blue-600" />
              </div>
            </div>

            {/* Daily Posts */}
            <div className="bg-white shadow-md rounded-xl p-6 border-t-4 border-cyan-500">
              <h2 className="text-xl font-bold mb-3 text-gray-800">
                Daily Posts
              </h2>
              <p className="text-gray-700 mb-2">
                📌 "Stay consistent with coding challenges!"
              </p>
              <p className="text-gray-700">
                📌 "New mentor Q&A session coming soon."
              </p>
            </div>
          </div>
        </div>
        {showProfile && (
          <ProfileSection onClose={() => setShowProfile(false)} />
        )}
      </main>
    </>
  );
};

export default Right_side;
