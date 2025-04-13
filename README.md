# Let's write the README content to a .txt file.

readme_content = """\
💸 Dough Tracker App (React Native + Node.js + SQLite)

A mobile app built using React Native (Expo) and a backend using Node.js with SQLite. This app allows users to:

- ➕ Add money  
- 💸 Log expenses with a name  
- 🕓 View purchase history  
- 🧑‍💼 Update username  
- ♻️ Reset progress  

⚠️ The app is not fully finished but has enough functionality to try it out and explore.

📦 Tech Stack

- Frontend: React Native (Expo), Tailwind CSS
- Backend: Node.js, Express.js, SQLite

🚀 Getting Started

1️⃣ Clone the Repository

    git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    cd project

2️⃣ Backend Setup

Open a new terminal inside the project folder:

    cd project
    npm install
    node server.js

✅ You should see:

    🚀 Server running on port 5000
    ✅ Connected to SQLite database

3️⃣ Frontend (React Native) Setup

Open another new terminal:

    npm install
    npx expo start -c

This will launch the Expo Dev Tools in your browser. From there you can run the app on:

- Android Emulator
- iOS Simulator (Mac only)
- Physical device (Scan QR using Expo Go)

🌐 Setting Your IP Address

To make the app work on your physical device:

1. Open Command Prompt (Windows) and type:

       ipconfig

   Find your **IPv4 address** under your active WiFi or Ethernet adapter (e.g., `192.168.1.12`).

2. Replace all IP address strings in the frontend code with your IPv4 address.

📱 Other Ways to Find Your IP (per OS):

- **Windows:** `ipconfig`
- **Mac/Linux:** `ifconfig` or `ip a`
- **Mobile (Android/iOS):** Check your WiFi settings for device IP.

📋 Example Use:

- Add $100 using `/user/:id/receive`
- Spend $20 on “Groceries” using `/user/:id/transaction`
- View your transaction history using `/user/:id/transactions`

"""

# Write to a file
file_path = "/mnt/data/README_ExpenseTracker.txt"
with open(file_path, "w", encoding="utf-8") as f:
    f.write(readme_content)

file_path
