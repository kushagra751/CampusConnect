import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { getCurrentUser, apiRequest, API_ENDPOINTS } from "../../lib/api.js";

const ProfileSection = ({ onClose, onApply, initialProfile }) => {
  const currentUser = getCurrentUser();
  
  // Local state for profile fields
  const [profile, setProfile] = useState(initialProfile || {
    name: currentUser?.username || "User",
    age: 20,
    university: "University",
    email: currentUser?.email || "",
    semester: "1st Year / 1st Semester",
  });

  const [muteNotifications, setMuteNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [profilePicture, setProfilePicture] = useState(
    currentUser?.profilePicture || "https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/industries-order-management-foundations/meet-industries-order-management/images/47598d54b0688362cc14aee8f314139d_07925691-d-552-4-e-1-f-a-400-8645-f-07-cd-6-ff.png"
  );
  const [showImageInput, setShowImageInput] = useState(false);

  useEffect(() => {
    // Load profile data from backend
    const loadProfile = async () => {
      try {
        const response = await apiRequest(API_ENDPOINTS.getUserProfile, {
          method: "GET",
        });

        if (response && response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            const userData = data.user;
            setProfile({
              name: userData.username || "User",
              age: userData.age || 20,
              university: userData.university || "University",
              email: userData.email || "",
              semester: userData.semester || "1st Year / 1st Semester",
            });
            if (userData.profilePicture) {
              setProfilePicture(userData.profilePicture);
            } else {
              setProfilePicture("https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/industries-order-management-foundations/meet-industries-order-management/images/47598d54b0688362cc14aee8f314139d_07925691-d-552-4-e-1-f-a-400-8645-f-07-cd-6-ff.png");
            }
            if (userData.settings) {
              setMuteNotifications(userData.settings.muteNotifications || false);
              setDarkMode(userData.settings.darkMode || false);
              setTwoFactor(userData.settings.twoFactor || false);
            }
          }
        } else {
          // Fallback to localStorage data
          if (currentUser && !initialProfile) {
            setProfile({
              name: currentUser.username || "User",
              age: currentUser.age || 20,
              university: currentUser.university || "University",
              email: currentUser.email || "",
              semester: currentUser.semester || "1st Year / 1st Semester",
            });
            if (currentUser.profilePicture) {
              setProfilePicture(currentUser.profilePicture);
            }
            if (currentUser.settings) {
              setMuteNotifications(currentUser.settings.muteNotifications || false);
              setDarkMode(currentUser.settings.darkMode || false);
              setTwoFactor(currentUser.settings.twoFactor || false);
            }
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        // Fallback to localStorage
        if (currentUser) {
          setProfile({
            name: currentUser.username || "User",
            age: currentUser.age || 20,
            university: currentUser.university || "University",
            email: currentUser.email || "",
            semester: currentUser.semester || "1st Year / 1st Semester",
          });
        }
      }
    };

    loadProfile();
  }, []); // Empty dependency array - only run once on mount

  const handleApply = async () => {
    // Validation
    if (!profile.name || !profile.name.trim()) {
      setMessage({ type: "error", text: "Name is required" });
      return;
    }
    if (!profile.university || !profile.university.trim()) {
      setMessage({ type: "error", text: "University name is required" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await apiRequest(API_ENDPOINTS.updateProfile, {
        method: "POST",
        body: JSON.stringify({
          username: profile.name.trim(),
          university: profile.university.trim(),
          semester: profile.semester.trim(),
          age: profile.age,
          profilePicture: profilePicture,
          settings: {
            muteNotifications,
            darkMode,
            twoFactor,
          },
        }),
      });

      if (response) {
        const data = await response.json();
        if (response.ok) {
          // Update localStorage with new user data
          const updatedUser = { 
            ...currentUser, 
            username: profile.name,
            university: profile.university,
            semester: profile.semester,
            age: profile.age,
            profilePicture: profilePicture,
            settings: {
              muteNotifications,
              darkMode,
              twoFactor,
            }
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          
          setMessage({ type: "success", text: "Profile updated successfully!" });
          setTimeout(() => {
            if (onApply) onApply({ ...profile, muteNotifications, darkMode, twoFactor, profilePicture });
            onClose();
            window.location.reload(); // Refresh to show updated name
          }, 1500);
        } else {
          setMessage({ type: "error", text: data.message || "Failed to update profile" });
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[90%] md:w-[700px] p-6 overflow-y-auto max-h-[90vh] text-gray-900 dark:text-gray-100 no-scrollbar">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-4 mb-4">
          <h2 className="text-2xl font-bold">Profile & Settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Section */}
        <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaUserCircle className="text-indigo-600 dark:text-indigo-400" size={22} />
            User Profile
          </h3>

          {/* Profile Picture */}
          <div className="mb-4 flex flex-col items-center">
            <div className="relative">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                onError={(e) => {
                  e.target.src = "https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/industries-order-management-foundations/meet-industries-order-management/images/47598d54b0688362cc14aee8f314139d_07925691-d-552-4-e-1-f-a-400-8645-f-07-cd-6-ff.png";
                }}
              />
            </div>
            {showImageInput ? (
              <div className="mt-4 w-full">
                <input
                  type="url"
                  placeholder="Enter image URL"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      setShowImageInput(false);
                      if (!profilePicture) {
                        setProfilePicture("https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/industries-order-management-foundations/meet-industries-order-management/images/47598d54b0688362cc14aee8f314139d_07925691-d-552-4-e-1-f-a-400-8645-f-07-cd-6-ff.png");
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowImageInput(false)}
                    className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowImageInput(true)}
                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md"
              >
                Change Avatar
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name *</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Age</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                min="1"
                max="100"
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium">University Name *</label>
              <input
                type="text"
                value={profile.university}
                onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                placeholder="Enter your university name"
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium">University Email</label>
              <input
                type="text"
                value={profile.email}
                disabled
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Current Year / Semester *</label>
              <input
                type="text"
                value={profile.semester}
                onChange={(e) => setProfile({ ...profile, semester: e.target.value })}
                placeholder="e.g., 3rd Year / 5th Semester"
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold mb-3">Settings</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Mute Notifications</span>
              <input
                type="checkbox"
                checked={muteNotifications}
                onChange={() => setMuteNotifications(!muteNotifications)}
                className="w-5 h-5 accent-indigo-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Dark Mode</span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="w-5 h-5 accent-indigo-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Two-factor Authentication</span>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={() => setTwoFactor(!twoFactor)}
                className="w-5 h-5 accent-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Apply Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleApply}
            disabled={loading}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Apply Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
