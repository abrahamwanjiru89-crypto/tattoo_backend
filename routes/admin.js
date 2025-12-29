const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

/* CREATE ADMIN — ONLY IF NONE EXISTS */
router.post("/create", async (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT COUNT(*) AS total FROM admins", async (err, rows) => {
    if (rows[0].total > 0) {
      return res.status(403).json({
        error: "Admin already exists"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO admins (username, password) VALUES (?, ?)",
      [username, hash],
      () => res.json({ message: "Admin created ✅" })
    );
  });
});

/* LOGIN */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM admins LIMIT 1",
    async (err, rows) => {
      if (!rows.length) {
        return res.status(401).json({ error: "Admin not set" });
      }

      const admin = rows[0];
      const valid = await bcrypt.compare(password, admin.password);

      if (!valid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = jwt.sign(
        { id: admin.id },
        "SECRET_KEY",
        { expiresIn: "2h" }
      );

      res.json({ token });
    }
  );
});

module.exports = router;
