const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite
const db = new sqlite3.Database('./database.db');

// Get user data by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  db.get(
    'SELECT id, username, balance, profilePicture FROM users WHERE id = ?',
    [userId],
    (err, user) => {
      if (err) {
        res.status(500).json({ message: 'Database error' });
      } else if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    }
  );
});

// Update user’s username
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { username } = req.body;

  db.run('UPDATE users SET username = ? WHERE id = ?', [username, userId], function (err) {
    if (err) {
      res.status(500).json({ message: 'Database error' });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'Username updated successfully' });
    }
  });
});

// 📌 New route: Update profile picture
router.post('/:id/upload', express.json({ limit: '5mb' }), (req, res) => {
  const userId = req.params.id;
  const { profilePicture } = req.body; // Expecting Base64 string

  if (!profilePicture) {
    return res.status(400).json({ message: 'No profile picture provided' });
  }

  db.run(
    'UPDATE users SET profilePicture = ? WHERE id = ?',
    [profilePicture, userId],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'Profile picture updated successfully' });
    }
  );
});

module.exports = router;
