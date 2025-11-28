import React from "react";

export default function AboutUs() {
  return (
    <div className="w-full px-4 py-8 md:px-16 lg:px-24 bg-[#f4f9fb] min-h-screen">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 border-b-4 border-black pb-4 bg-white shadow-md w-full rounded-md">
        ABOUT US
      </h1>

      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Who are we */}
        <div className="p-6 shadow-lg rounded-xl bg-white border border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-black">Who are we ?</h2>
          <p className="text-gray-800 leading-relaxed">
            Campus Connect is a student-driven platform designed to bring together
            students, mentors, alumni, and campus communities. We help students
            find friends, discover events, join clubs, share notes, and build
            meaningful connections—all in one place.
          </p>
        </div>

        {/* What do we do */}
        <div className="p-6 shadow-lg rounded-xl bg-[#c6eefc] border border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-black">What do we do?</h2>
          <ul className="list-disc list-inside text-gray-900 space-y-2">
            <li>Connect with peers who share similar interests</li>
            <li>Join study groups, coding clubs, and placement cells</li>
            <li>Stay updated with campus events & activities</li>
            <li>Access resources like notes, mentorship, and alumni guidance</li>
            <li>Build friendships and professional networks that last beyond college</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* How do we help others */}
        <div className="p-6 shadow-lg rounded-xl bg-[#c6eefc] border border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-black">How do we help others?</h2>
          <p className="text-gray-900 leading-relaxed">
            From first-year to final-year, Campus Connect helps you find friends,
            mentorship, events, and resources—making sure no student feels left out.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="p-6 shadow-lg rounded-xl bg-white border border-gray-200">
          <h2 className="text-xl font-semibold mb-3 text-black">Our Vision & Mission</h2>
          <p className="text-gray-800 mb-3">
            <strong>Vision:</strong> To create a connected and collaborative student
            community across campuses.
          </p>
          <p className="text-gray-800">
            <strong>Mission:</strong> To empower students by giving them the right
            tools, connections, and opportunities to succeed academically,
            socially, and professionally.
          </p>
        </div>
      </div>
    </div>
  );
}
