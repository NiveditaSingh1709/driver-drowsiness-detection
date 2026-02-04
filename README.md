# 🚗 Driver Drowsiness Detection System

A real-time Driver Monitoring & Drowsiness Detection System built using JavaScript, Node.js, Express, and Computer Vision concepts.
The system monitors driver alertness via camera input and raises alerts to improve road safety.

🔗 Live Demo:
👉 https://driver-drowsiness-detection-2.onrender.com/

📌 Features

✅ Real-time driver monitoring using webcam
✅ Detects drowsiness based on driver behavior
✅ Sends alerts to backend when drowsiness is detected
✅ Escalation logic for repeated alerts
✅ Admin dashboard for monitoring alerts
✅ Deployed on Render (Production-ready)



Browser (Camera Access)
        |
        |  Drowsiness Alert (POST)
        v
Node.js + Express Server
        |
        |  Alert Storage & Escalation
        v
Admin Dashboard


🛠️ Tech Stack

Frontend

HTML

CSS

JavaScript

Web Camera API

Backend

Node.js

Express.js

CORS

Deployment

GitHub

Render (Cloud Hosting)



🔔 Alert & Escalation Logic

Each drowsiness event sends an alert to the backend

Alerts are stored in memory

If alert count ≥ 3:

🚨 Escalation is triggered

📞 Customer care notification simulated via logs

Future Enhancements

🔍 ML-based eye-blink & yawning detection

📱 SMS / Email alerts using Twilio

🧠 AI model integration (MediaPipe / TensorFlow.js)

🗄️ Database storage (MongoDB)

🔐 Authentication for admin dashboard
