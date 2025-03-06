require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error('❌ SQLite Connection Error:', err.message);
  else console.log('✅ Connected to SQLite database');
});

// Create Users Table (if not exists)
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        balance REAL DEFAULT 1000,
        profilePicture TEXT DEFAULT ''
    )
`);

// Create Transactions Table
db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        amount REAL NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`);

// API Route to Update Username
app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username cannot be empty' });
  }

  db.run(`UPDATE users SET username = ? WHERE id = ?`, [username, id], function (err) {
    if (err) {
      console.log('❌ Error updating username:', err);
      return res.status(500).json({ message: 'Failed to update username' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`✅ Username updated to: ${username}`);
    res.json({ message: 'Username updated successfully' });
  });
});

// API Route to Receive Money (Add to Balance)
app.post('/user/:id/receive', (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const deposit = parseFloat(amount);

  if (!amount || isNaN(deposit) || deposit <= 0) {
    return res.status(400).json({ message: 'Invalid deposit amount' });
  }

  db.get(`SELECT balance FROM users WHERE id = ?`, [id], (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'User not found' });

    const newBalance = user.balance + deposit;

    // Update balance in users table
    db.run(`UPDATE users SET balance = ? WHERE id = ?`, [newBalance, id], (err) => {
      if (err) return res.status(500).json({ message: 'Error updating balance' });

      // ✅ Log the deposit as a transaction
      db.run(
        `INSERT INTO transactions (user_id, name, amount) VALUES (?, ?, ?)`,
        [id, 'Deposit', deposit],
        function (err) {
          if (err) return res.status(500).json({ message: 'Error logging transaction' });

          console.log(`✅ Deposit logged: $${deposit}, New Balance: $${newBalance}`);

          res.json({ message: 'Money received successfully', newBalance, recentDeposit: deposit });
        }
      );
    });
  });
});

// API Route to Get User Details by ID
app.get('/user/:id', (req, res) => {
  const { id } = req.params;

  db.get(`SELECT id, username, profilePicture FROM users WHERE id = ?`, [id], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });
});

// API Route to Log Expense
app.post('/user/:id/transaction', (req, res) => {
  const { id } = req.params;
  const { name, amount, icon } = req.body;
  const expense = parseFloat(amount);

  if (!name || isNaN(expense) || expense <= 0 || !icon) {
    return res.status(400).json({ message: 'Invalid transaction data' });
  }

  db.get(`SELECT balance FROM users WHERE id = ?`, [id], (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'User not found' });

    const newBalance = user.balance - expense;

    db.run(
      `INSERT INTO transactions (user_id, name, amount, icon) VALUES (?, ?, ?, ?)`,
      [id, name, expense, icon],
      function (err) {
        if (err) return res.status(500).json({ message: 'Error adding transaction' });

        db.run(`UPDATE users SET balance = ? WHERE id = ?`, [newBalance, id], (err) => {
          if (err) return res.status(500).json({ message: 'Error updating balance' });

          res.json({ message: 'Transaction logged', newBalance });
        });
      }
    );
  });
});

// API Route to Get Transactions
app.get('/user/:id/transactions', (req, res) => {
  const { id } = req.params;

  db.all(
    `SELECT * FROM transactions WHERE user_id = ? ORDER BY timestamp DESC`,
    [id],
    (err, transactions) => {
      if (err) return res.status(500).json({ message: 'Error fetching transactions' });
      res.json(transactions);
    }
  );
});

// API Route to Get User Balance
app.get('/user/:id/balance', (req, res) => {
  const { id } = req.params;

  db.get(`SELECT balance FROM users WHERE id = ?`, [id], (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'User not found' });
    res.json({ balance: user.balance });
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
