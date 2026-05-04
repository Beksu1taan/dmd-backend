const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ подключение через MYSQL_URL
const db = mysql.createConnection(process.env.MYSQL_URL);

db.connect(err => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("MySQL connected 🚀");
  }
});

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.post("/subscribe", (req, res) => {
  const { name, course, email } = req.body;

  const sql = "INSERT INTO subscribers (name, course, email) VALUES (?, ?, ?)";

  db.query(sql, [name, course, email], (err) => {
    if (err) {
      console.log("SQL ERROR:", err);
      return res.json({ success: false });
    }

    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running 🚀");
});
