async function fetchAlerts() {
    const res = await fetch("/alerts");
    const data = await res.json();
  
    const table = document.getElementById("alertTable");
    table.innerHTML = "";
  
    data.forEach((a) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
      <td>${a.driverId}</td>
      <td style="color:${a.alarmCount >= 3 ? "red" : "orange"};">
        ${a.alarmCount >= 3 ? "CRITICAL" : "WARNING"}
      </td>
      <td>${a.alert}</td>
      <td>${a.alarmCount || 1}</td>
      <td>${new Date(a.time).toLocaleString()}</td>
    `;
    
  }
  
  // Poll every 2 seconds (Uber-style)
  setInterval(fetchAlerts, 2000);
  fetchAlerts();
  