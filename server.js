require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

// Connect to SQLite (Creates `database.db` if it doesn't exist)
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error('❌ SQLite Connection Error:', err.message);
  else console.log('✅ Connected to SQLite database');
});

// Create Users Table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        balance REAL DEFAULT 1000,
        profilePicture TEXT DEFAULT ''
    )
`);

// Sample API Route (Just to check if server works)
app.get('/', (req, res) => res.send('API Running with SQLite'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
