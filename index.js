document.querySelectorAll('.open-btn').forEach(btn => {
  btn.addEventListener('click', e => {
      const card = e.target.closest('.card');
      const title = card.dataset.title;
      const img = card.dataset.img;
      const desc = card.dataset.desc;

      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalImg').src = img;
      document.getElementById('modalDesc').textContent = desc;
      document.getElementById('modal').classList.add('active');
  });
});

document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('active');
});





// Close modal on outside click
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) {
      e.currentTarget.classList.remove('active');
  }
});
// —— Font-Size Controls ——
let baseFont = 16;

function adjustFont(delta) {
  baseFont = Math.min(24, Math.max(12, baseFont + delta));
  document.documentElement.style.fontSize = baseFont + 'px';
}

// Update the chatbot initialization to stay sticky
document.addEventListener('DOMContentLoaded', () => {
  const widget = document.getElementById('ai-widget');
  widget.classList.add('active');

  // Handle window resize
  window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
          widget.style.right = '5%';
          widget.style.width = '90%';
      } else {
          widget.style.right = '20px';
          widget.style.width = '300px';
      }
  });
});
// —— Voice Search ——
function startVoice() {
  const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Speech) {
      alert('Voice not supported');
      return;
  }
  const recog = new Speech();
  recog.onresult = e => {
      const txt = e.results[0][0].transcript;
      document.querySelector('.search-form input').value = txt;
  };
  recog.start();
}
// Tab functionality
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
      // Remove active classes
      document.querySelectorAll('.tab, .tab-pane').forEach(el => el.classList.remove('active'));

      // Add active classes
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Intersection Observer for section animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
      }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.section-placeholder').forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'all 0.6s ease';
  observer.observe(section);
});
// —— Mini Traffic Chart ——
function drawMiniTraffic() {
  const ctx = document.getElementById('miniTraffic').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM'],
          datasets: [{
              data: [40, 60, 80, 65, 50],
              borderColor: '#0055A4',
              borderWidth: 2,
              fill: false,
              pointRadius: 0
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              x: {
                  display: false
              },
              y: {
                  display: false
              }
          },
          plugins: {
              legend: {
                  display: false
              },
              tooltip: {
                  enabled: false
              }
          }
      }
  });
}

// —— Real-time AQI —— 
function updateAQI() {
  const el = document.getElementById('aqi');
  const val = Math.floor(50 + Math.random() * 100); // simulate 50–150
  el.textContent = `AQI Index: ${val}`;

  // color coding
  if (val <= 50) {
      el.style.color = 'green';
  } else if (val <= 100) {
      el.style.color = 'orange';
  } else {
      el.style.color = 'red';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateAQI(); // initial call
  setInterval(updateAQI, 5000); // every 5s
});




// —— Init all dynamic bits on load ——
window.addEventListener('DOMContentLoaded', () => {
  drawMiniTraffic();
  updateAQI();
  setInterval(updateAQI, 15000);
});

// —— Category Tabs Logic ——
const tabs = document.querySelectorAll('.category-tabs .tab');
const panes = document.querySelectorAll('.category-content .tab-pane');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
      // activate tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // show pane
      const name = tab.dataset.tab;
      panes.forEach(p => {
          p.classList.toggle('active', p.id === name);
      });
      // smooth scroll into view
      document.querySelector('.category-content').scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Activate first pane on load
document.addEventListener('DOMContentLoaded', () => {
  panes[0].classList.add('active');
});

function startVoice() {
  const voiceBtn = document.querySelector('.btn-voice');
  voiceBtn.classList.add('listening');
  // Add voice recognition logic here
  setTimeout(() => voiceBtn.classList.remove('listening'), 3000);
}

function adjustFont(sizeChange) {
  const html = document.documentElement;
  const currentSize = parseFloat(getComputedStyle(html).fontSize);
  html.style.fontSize = (currentSize + sizeChange) + 'px';
}
document.querySelector('.btn-banner').addEventListener('click', (e) => {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.scrollIntoView({
      behavior: 'smooth'
  });
});

// Add real-time updates
function updateCityPulse() {
  // Simulate real-time data updates
  setInterval(() => {
      // Update transit times
      document.querySelectorAll('.progress-fill').forEach(bar => {
          const newWidth = Math.random() * 80 + 10;
          bar.style.width = `${newWidth}%`;
      });

      // Update AQI
      const aqi = Math.floor(30 + Math.random() * 40);
      document.querySelector('.aqi-index').textContent = aqi;

      // Update alert count
      const alerts = document.querySelectorAll('.alert-item').length;
      document.querySelector('.alert-count').textContent = alerts;
  }, 5000);

  // Initialize charts
  const aqiCtx = document.querySelector('.aqi-chart').getContext('2d');
  new Chart(aqiCtx, {
      type: 'line',
      data: {
          labels: Array(24).fill().map((_, i) => `${i}:00`),
          datasets: [{
              label: 'PM2.5',
              data: Array(24).fill().map(() => Math.random() * 50),
              borderColor: '#00c853',
              tension: 0.4
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  display: false
              }
          }
      }
  });
}

document.addEventListener('DOMContentLoaded', updateCityPulse);

// Initialize Map Interactions
document.querySelectorAll('.incident-marker').forEach(marker => {
  marker.addEventListener('click', () => {
      const tooltip = marker.querySelector('.marker-tooltip');
      alert(`Incident Detail: ${tooltip.textContent}`);
  });
});

// Enable basic panning
let isDragging = false;
let startX, startY, translateX = 0,
  translateY = 0;
const mapImage = document.querySelector('.base-map');

document.querySelector('.map-container').addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  translateX = e.clientX - startX;
  translateY = e.clientY - startY;
  mapImage.style.transform = `translate(${translateX}px, ${translateY}px)`;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Reset position on double click
document.querySelector('.map-container').addEventListener('dblclick', () => {
  mapImage.style.transform = 'translate(0, 0)';
  translateX = translateY = 0;
});