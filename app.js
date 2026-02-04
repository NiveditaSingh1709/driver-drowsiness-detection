const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const statusText = document.getElementById("status");
const alarm = document.getElementById("alarm");
let alarmCount = 0;
let lastAlertTime = 0;


canvas.width = 400;
canvas.height = 300;

// Eye landmark indexes
const LEFT_EYE = [33, 160, 158, 133, 153, 144];
const RIGHT_EYE = [362, 385, 387, 263, 373, 380];

let closedFrames = 0;
const EAR_THRESHOLD = 0.23;
const CLOSED_LIMIT = 20;

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function ear(eye, lm) {
  return (
    (dist(lm[eye[1]], lm[eye[5]]) + dist(lm[eye[2]], lm[eye[4]])) /
    (2 * dist(lm[eye[0]], lm[eye[3]]))
  );
}

const faceMesh = new FaceMesh({
  locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`,
});

faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.6,
  minTrackingConfidence: 0.6,
});

faceMesh.onResults((res) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!res.multiFaceLandmarks) return;

  const lm = res.multiFaceLandmarks[0];
  const avgEAR = (ear(LEFT_EYE, lm) + ear(RIGHT_EYE, lm)) / 2;

  if (avgEAR < EAR_THRESHOLD) {
    closedFrames++;
    if (closedFrames > CLOSED_LIMIT) {
      const now = Date.now();
    
      // prevent spamming alerts every frame
      if (now - lastAlertTime > 5000) {
        alarmCount++;
        lastAlertTime = now;
    
        statusText.innerText = `🚨 Driver Sleeping! (Alert ${alarmCount})`;
        alarm.play();
    
        fetch("/alert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            driverId: "DRV001",
            alert: "DROWSINESS_DETECTED",
            alarmCount,
            time: new Date().toISOString(),
          }),
        });
      }
    }
    
  } else {
    closedFrames = 0;
    statusText.innerText = "✅ Driver Awake";
    alarm.pause();
    alarm.currentTime = 0;
  }
});

const camera = new Camera(video, {
  onFrame: async () => {
    await faceMesh.send({ image: video });
  },
  width: 400,
  height: 300,
});

camera.start();
