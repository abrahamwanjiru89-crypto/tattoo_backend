const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Abrah@89",
  database: "tattoo_booking"
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err.message);
  } else {
    console.log("Database connected ✅");
  }
});

module.exports = db;
