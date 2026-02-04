const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 🧠 In-memory alert store
let alerts = [];

/* ======================
   ROUTES
====================== */

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Driver sends alert
app.post("/alert", (req, res) => {
  const alert = {
    ...req.body,
    receivedAt: new Date().toISOString(),
    escalated: false,
  };

  alerts.push(alert);

  console.log("🚨 Alert received:", alert);

  // 🚨 ESCALATION RULE
  if (alert.alarmCount >= 3) {
    alert.escalated = true;

    console.log(`
    ================================
    🚨 CRITICAL DRIVER SAFETY ALERT
    Driver ID: ${alert.driverId}
    Reason: Repeated drowsiness
    Action: Customer Care Notified
    ================================
    `);
  }

  res.json({ status: "ok" });
});

// Admin dashboard fetches alerts
app.get("/alerts", (req, res) => {
  res.json(alerts);
});

/* ======================
   START SERVER (IMPORTANT)
====================== */

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
