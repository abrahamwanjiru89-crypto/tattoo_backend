const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }

  db.query(
    "INSERT INTO bookings (name, email) VALUES (?, ?)",
    [name, email],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Booking saved ✅" });
    }
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM bookings", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

module.exports = router;
