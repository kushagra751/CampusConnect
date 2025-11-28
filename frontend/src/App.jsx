import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Chat from "./chat/Chat.jsx";
import LandingPage from "./pages/Landing.jsx";
import Login from "./authentication/Login.jsx";
import Signup from "./authentication/Signup.jsx";
import Forget from "./authentication/Forget.jsx";
import Logout from "./authentication/Logout.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

// import AuthCheck from "./lib/AuthCheck.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import ChatPage from "./dashboard/sidebar/ChatPage.jsx";
import Events from "./dashboard/sidebar/Events.jsx";
import Mentors from "./dashboard/sidebar/Mentors.jsx";
import Rooms from "./dashboard/sidebar/Rooms.jsx";
// import Event from "./dashboard/dashboard_pages/Events.jsx";
// import Chat from "./dashboard/dashboard_pages/Chat.jsx";
// import Rooms from "./dashboard/dashboard_pages/Rooms.jsx";
// import Calender from "./dashboard/dashboard_pages/Calender.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPage/>} />
        <Route path="/events" element={<Events />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/rooms" element={<Rooms />} />
        
         {/* Protected Routes */}
        {/* <Route
          path="/dashboard" element={
          <AuthCheck> 
              <Dashboard />
            </AuthCheck>
          }
        />
        <Route
          path="/chat" element={
          <AuthCheck>
              <Chat />
            </AuthCheck>
          }
        />
        <Route
          path="/event" element={
          <AuthCheck>
              <Event />
            </AuthCheck>
          }
        />
        <Route
          path="/calender" element={
          <AuthCheck>
              <Calender />
            </AuthCheck>
          }
        />
        <Route
          path="/rooms" element={
          <AuthCheck>
              <Rooms />
            </AuthCheck>
          }
        /> */}

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
