import React, { useState, useEffect } from "react";
import { Calendar, Plus, MapPin, Clock, Users, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../lib/api.js";

export default function Events() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Hackathon 2025",
      date: "2025-02-15",
      time: "10:00 AM",
      location: "Main Auditorium",
      attendees: 45,
      description: "Annual coding competition",
    },
    {
      id: 2,
      title: "Tech Talk with Mentors",
      date: "2025-02-20",
      time: "2:00 PM",
      location: "Conference Hall",
      attendees: 30,
      description: "Learn from industry experts",
    },
    {
      id: 3,
      title: "Study Jam: React Basics",
      date: "2025-02-25",
      time: "4:00 PM",
      location: "Lab 3",
      attendees: 25,
      description: "Hands-on React workshop",
    },
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) {
      setMessage({ type: "error", text: "Please fill all required fields" });
      return;
    }

    const event = {
      id: events.length + 1,
      ...newEvent,
      attendees: 0,
    };
    setEvents([...events, event]);
    setMessage({ type: "success", text: "Event created successfully!" });
    setShowCreateModal(false);
    setNewEvent({ title: "", date: "", time: "", location: "", description: "" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleJoinEvent = (eventId) => {
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, attendees: e.attendees + 1 } : e
    ));
    setMessage({ type: "success", text: "You've joined the event!" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="text-blue-500" />
              Events
            </h1>
            <p className="text-gray-600 mt-2">Discover and join campus events</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            <Plus size={20} />
            Create Event
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.type === "success" 
              ? "bg-green-100 text-green-700 border border-green-300" 
              : "bg-red-100 text-red-700 border border-red-300"
          }`}>
            {message.text}
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-4">{event.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={16} />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock size={16} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users size={16} />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleJoinEvent(event.id)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Join Event
                </button>
                <button 
                  onClick={() => setShowDetailsModal(event)}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Event Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Create New Event</h2>
                <button onClick={() => setShowCreateModal(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <input aria-label="Event Title *"
                  type="text"
                  placeholder="Event Title *"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                <input aria-label="Location *"
                  type="text"
                  placeholder="Location *"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                <textarea
                  placeholder="Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateEvent}
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

        {/* Event Details Modal */}
        {showDetailsModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{showDetailsModal.title}</h2>
                <button onClick={() => setShowDetailsModal(null)}>
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600">{showDetailsModal.description}</p>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(showDetailsModal.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{showDetailsModal.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{showDetailsModal.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{showDetailsModal.attendees} attendees</span>
                </div>
                <button
                  onClick={() => {
                    handleJoinEvent(showDetailsModal.id);
                    setShowDetailsModal(null);
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
                >
                  Join Event
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
