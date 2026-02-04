const express = require("express");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 3000;


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

let alerts = []; // 🧠 store alerts here

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Driver sends alert
app.post("/alert", (req, res) => {
  console.log("🚨 Alert received:", req.body);

  alerts.push({
    ...req.body,
    receivedAt: new Date().toISOString(),
  });

  res.json({ status: "ok" });
});

// Admin dashboard fetches alerts
app.post("/alert", (req, res) => {
  const alert = {
    ...req.body,
    receivedAt: new Date().toISOString(),
  };

  alerts.push(alert);

  // 🚨 ESCALATION RULE
  if (alert.alarmCount >= 3) {
    console.log("📞 CALLING CUSTOMER CARE FOR DRIVER:", alert.driverId);

    // Simulate call / SMS / email
    console.log(`
    ================================
    🚨 CRITICAL DRIVER SAFETY ALERT
    Driver ID: ${alert.driverId}
    Reason: Repeated drowsiness
    Action: Customer Care Notified
    ================================
    `);

    alert.escalated = true;
  }

  res.json({ status: "ok" });
});
