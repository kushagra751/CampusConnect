import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-400 px-4">
      
      {/* Title Box with Top Line */}
      <div to className="relative bg-white shadow-[6px_6px_0px_black] px-8 py-6 mb-12 w-fit">

        <h1 className="text-4xl md:text-6xl font-extrabold text-center">
          Campus Connect
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <Link to={"/about"} className="bg-white shadow-[4px_4px_0px_black] px-8 py-4 rounded-md text-lg md:text-xl font-semibold hover:scale-105 transition cursor-pointer">
          About Us
        </Link >
        <Link to={"/"} className="bg-white shadow-[4px_4px_0px_black] px-8 py-4 rounded-md text-lg md:text-xl font-semibold hover:scale-105 transition cursor-pointer">
          Home
        </Link >
        <Link to={"/contact"} className="bg-white shadow-[4px_4px_0px_black] px-8 py-4 rounded-md text-lg md:text-xl font-semibold hover:scale-105 transition cursor-pointer">
          Contact Us
        </Link >
      </div>

      {/* Auth Links */}
      <div className="flex flex-wrap justify-center gap-6">
        <Link to={"/login"} className="bg-green-400 shadow-[4px_4px_0px_black] px-10 py-4 rounded-md text-lg md:text-xl font-semibold hover:scale-105 transition cursor-pointer">
          Login
        </Link >
        <Link to={"/signup"} className="bg-red-400 shadow-[4px_4px_0px_black] px-10 py-4 rounded-md text-lg md:text-xl font-semibold hover:scale-105 transition cursor-pointer">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
