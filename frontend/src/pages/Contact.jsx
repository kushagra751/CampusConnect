import React from "react";
import {
  Mail,
  Phone,
  ArrowLeft,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full px-4 py-8 md:px-16 lg:px-24 bg-[blanchedalmond] min-h-screen relative">
      <div>
        <button
          onClick={() => (window.location.href = "/")} // 👈 replace "/" with your landing page route
          className="absolute top-4 left-4 flex items-center gap-1 border-2 border-black rounded-md bg-white shadow-[4px_4px_0px_black] px-3 py-2 font-semibold cursor-pointer hover:bg-gray-100 transform hover:scale-105 transition duration-200"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        {/* Header */}

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 border-b-4 border-black pb-2 bg-white shadow-md rounded-md max-w-5xl mx-auto">
          CONTACT US
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
        {/* Form */}
        <div className="p-6 bg-white border-2 border-black shadow-[6px_6px_0px_black] rounded-lg space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border-2 border-black rounded-md p-2 shadow-[3px_3px_0px_black] focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border-2 border-black rounded-md p-2 shadow-[3px_3px_0px_black] focus:outline-none"
          />
          <textarea
            placeholder="Msg...."
            rows="4"
            className="w-full border-2 border-black rounded-md p-2 shadow-[3px_3px_0px_black] focus:outline-none"
          ></textarea>

          <div className="flex gap-4">
            <button className="flex-1 bg-green-500 text-black font-semibold border-2 border-black rounded-md py-2 shadow-[3px_3px_0px_black] hover:bg-green-600">
              Submit
            </button>
            <button className="flex-1 bg-yellow-400 text-black font-semibold border-2 border-black rounded-md py-2 shadow-[3px_3px_0px_black] hover:bg-yellow-500">
              Clear
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-[#c6eefc] border-2 border-black shadow-[3px_3px_0px_black] rounded-md font-semibold text-sm text-gray-900">
            GOT A BURNING QUESTION, SOME FEEDBACK, OR JUST WANT TO GIVE US A
            FRIENDLY "HELLO"? WE'RE ALL EARS! THE CAMPUS CONNECT CREW IS ALWAYS
            READY TO LEND A HAND.
          </div>

          <div className="flex flex-col gap-3 text-gray-900 text-base">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" /> support@campusconnect.com
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" /> +91-008465897
            </div>
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5 text-pink-500" /> @campusconnect
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-5 h-5 text-blue-600" /> Campus Connect
              Official
            </div>
            <div className="flex items-center gap-2">
              <Twitter className="w-5 h-5 text-black" /> @campusconnect
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
