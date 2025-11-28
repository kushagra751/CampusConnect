import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../lib/api.js";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call logout endpoint (optional, since JWT is stateless)
        const token = localStorage.getItem("token");
        if (token) {
          await fetch(API_ENDPOINTS.logout, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        }
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Redirect to home page
        navigate("/");
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Logging out...</h2>
        <p className="text-gray-600">Please wait while we log you out.</p>
      </div>
    </div>
  );
}

export default Logout;

