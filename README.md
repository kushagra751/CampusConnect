# 🎓 CampusConnect

CampusConnect is a modern platform that brings students, faculty, and campus organizations together. It helps students stay connected with events, communities, and resources while building a stronger campus experience.

---

## 🚀 Features

- 👤 **User Profiles** – Personalized student, faculty, and organization accounts  
- 📅 **Event Management** – Organize, discover, and RSVP to campus events  
- 🤝 **Clubs & Communities** – Join or create groups based on interests  
- 💬 **Messaging System** – Secure in-app chat for peer connections  
- 📢 **Announcements** – Stay updated with university-wide news and alerts  
- 📂 **Resource Sharing** – Share notes, study materials, and opportunities  

---

## 🛠 Tech Stack

- **Frontend:** React / Next.js / TailwindCSS  
- **Backend:** Node.js / Express (or Django / Flask if preferred)  
- **Database:** SupaBase / MongoDB  
- **Authentication:** JWT / OAuth (Google, University SSO)  
- **Hosting:** Vercel / Netlify / AWS / Heroku  

---

## 📦 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/kushagra751/campusconnect.git
cd campusconnect
npm install   # or yarn install
```
## How to run this project

Prerequisites: Node.js 18+ and a MongoDB database (local or Atlas).

```bash
# Backend (terminal 1)
cd backend
npm install
cp .env.example .env   # then fill in MONGO_URI, JWT_SECRET, email settings
npm run dev            # http://localhost:3000

# Frontend (terminal 2)
cd frontend
npm install
npm run dev            # http://localhost:5173
```

The frontend API base URL is set in `frontend/src/lib/api.js`.
