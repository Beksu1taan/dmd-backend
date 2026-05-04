const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

db.connect(err => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("MySQL connected");
  }
});

app.post("/subscribe", (req, res) => {
  const { name, course, email } = req.body;

  if (!name || !course || !email) {
    return res.json({ success: false });
  }

  const sql = "INSERT INTO subscribers (name, course, email) VALUES (?, ?, ?)";

  db.query(sql, [name, course, email], (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});