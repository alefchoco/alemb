// ============================================================================
// SHIELD-MASTER 2026 - JAVASCRIPT PRINCIPAL
// Lógica de navegación, escaneo, y funcionalidades
// ============================================================================

// Estado global
const state = {
  currentPage: 'dashboard',
  isScanning: false,
  scanProgress: 0,
  scanTimer: null,
  vpnConnected: false,
  stats: {
    threatsBlocked: 247,
    filesScanned: 1247,
    quarantineCount: 3,
    cpuUsage: 45,
    ramUsage: 62,
    diskUsage: 78
  }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDashboard();
  initDeepScan();
  initPrivacy();
  initReports();
  startMetricsUpdate();
});

// ============================================================================
// NAVEGACIÓN
// ============================================================================

function initNavigation() {
  const menuItems = document.querySelectorAll('.menu-item');
  
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      navigateTo(page);
    });
  });
}

function navigateTo(page) {
  // Actualizar menu activo
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.page === page) {
      item.classList.add('active');
    }
  });
  
  // Mostrar página correcta
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });
  
  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) {
    targetPage.classList.add('active');
    state.currentPage = page;
  }
}

// ============================================================================
// DASHBOARD
// ============================================================================

function initDashboard() {
  const quickScanBtn = document.getElementById('start-scan');
  
  if (quickScanBtn) {
    quickScanBtn.addEventListener('click', () => {
      startQuickScan();
    });
  }
  
  updateDashboardStats();
}

function updateDashboardStats() {
  document.getElementById('threats-blocked').textContent = state.stats.threatsBlocked;
  document.getElementById('threats-count').textContent = '0';
  document.getElementById('files-scanned').textContent = state.stats.filesScanned.toLocaleString();
  document.getElementById('quarantine-count').textContent = state.stats.quarantineCount;
  
  // Actualizar barras de progreso
  updateProgressBar('cpu-bar', 'cpu-usage', state.stats.cpuUsage);
  updateProgressBar('ram-bar', 'ram-usage', state.stats.ramUsage);
  updateProgressBar('disk-bar', 'disk-usage', state.stats.diskUsage);
}

function updateProgressBar(barId, textId, value) {
  const bar = document.getElementById(barId);
  const text = document.getElementById(textId);
  
  if (bar) bar.style.width = `${value}%`;
  if (text) text.textContent = `${value}%`;
}

function startQuickScan() {
  showNotification('Escaneo rápido iniciado', 'info');
  
  setTimeout(() => {
    showNotification('Escaneo completado - Sistema seguro', 'success');
    addActivityLog('Escaneo rápido completado', 'success');
    state.stats.filesScanned += 50;
    updateDashboardStats();
  }, 2000);
}

// ============================================================================
// DEEP SCAN
// ============================================================================

function initDeepScan() {
  const startBtn = document.getElementById('deep-scan-start');
  const againBtn = document.getElementById('scan-again');
  
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startDeepScan();
    });
  }
  
  if (againBtn) {
    againBtn.addEventListener('click', () => {
      resetScan();
      startDeepScan();
    });
  }
}

function startDeepScan() {
  if (state.isScanning) return;
  
  state.isScanning = true;
  state.scanProgress = 0;
  
  // Ocultar controles, mostrar progreso
  document.getElementById('scan-controls').style.display = 'none';
  document.getElementById('scan-results').style.display = 'none';
  document.getElementById('scan-progress').style.display = 'block';
  
  // Simular escaneo
  const duration = 10000; // 10 segundos
  const interval = 100;
  const increment = (100 / (duration / interval));
  
  let filesScanned = 0;
  let threatsFound = 0;
  let timeElapsed = 0;
  
  state.scanTimer = setInterval(() => {
    state.scanProgress += increment;
    filesScanned += Math.floor(Math.random() * 50) + 10;
    timeElapsed += interval;
    
    // Actualizar UI
    document.getElementById('scan-progress-bar').style.width = `${state.scanProgress}%`;
    document.getElementById('scan-files').textContent = filesScanned.toLocaleString();
    document.getElementById('scan-threats').textContent = threatsFound;
    document.getElementById('scan-time').textContent = formatTime(timeElapsed);
    
    // Cambiar mensaje
    const messages = [
      'Escaneando archivos del sistema...',
      'Analizando memoria RAM...',
      'Verificando registro de Windows...',
      'Escaneando archivos temporales...',
      'Analizando conexiones de red...',
      'Finalizando escaneo...'
    ];
    
    const messageIndex = Math.floor((state.scanProgress / 100) * messages.length);
    document.getElementById('scan-status-text').textContent = messages[Math.min(messageIndex, messages.length - 1)];
    
    // Completar escaneo
    if (state.scanProgress >= 100) {
      clearInterval(state.scanTimer);
      completeScan(filesScanned, threatsFound, timeElapsed);
    }
  }, interval);
}

function completeScan(files, threats, time) {
  state.isScanning = false;
  
  // Ocultar progreso, mostrar resultados
  document.getElementById('scan-progress').style.display = 'none';
  document.getElementById('scan-results').style.display = 'block';
  
  // Actualizar resultados
  document.getElementById('result-files').textContent = files.toLocaleString();
  document.getElementById('result-threats').textContent = threats;
  document.getElementById('result-duration').textContent = formatTime(time);
  
  const summary = threats === 0 
    ? 'Tu sistema está completamente seguro' 
    : `Se encontraron ${threats} amenazas y fueron puestas en cuarentena`;
  
  document.getElementById('result-summary').textContent = summary;
  
  // Actualizar estadísticas globales
  state.stats.filesScanned += files;
  state.stats.quarantineCount += threats;
  updateDashboardStats();
  
  // Notificación
  showNotification('Escaneo profundo completado', 'success');
  addActivityLog('Escaneo profundo completado', 'success');
}

function resetScan() {
  state.scanProgress = 0;
  state.isScanning = false;
  
  if (state.scanTimer) {
    clearInterval(state.scanTimer);
    state.scanTimer = null;
  }
  
  document.getElementById('scan-controls').style.display = 'block';
  document.getElementById('scan-progress').style.display = 'none';
  document.getElementById('scan-results').style.display = 'none';
}

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// ============================================================================
// PRIVACY & VPN
// ============================================================================

function initPrivacy() {
  const vpnToggle = document.getElementById('vpn-toggle');
  
  if (vpnToggle) {
    vpnToggle.addEventListener('click', () => {
      toggleVPN();
    });
  }
  
  // Toggles de protección
  const toggles = ['trackers', 'fingerprint', 'dns'];
  toggles.forEach(id => {
    const toggle = document.getElementById(`toggle-${id}`);
    if (toggle) {
      toggle.addEventListener('change', (e) => {
        const enabled = e.target.checked;
        showNotification(
          `${getToggleName(id)} ${enabled ? 'activado' : 'desactivado'}`,
          'info'
        );
      });
    }
  });
  
  // Simular obtener IP
  updateIPInfo();
}

function toggleVPN() {
  state.vpnConnected = !state.vpnConnected;
  
  const indicator = document.getElementById('vpn-indicator');
  const statusText = document.getElementById('vpn-status-text');
  const toggleBtn = document.getElementById('vpn-toggle');
  
  if (state.vpnConnected) {
    indicator.classList.remove('vpn-disconnected');
    indicator.classList.add('vpn-connected');
    statusText.textContent = 'Conectado';
    toggleBtn.textContent = 'Desconectar VPN';
    
    // Simular cambio de IP
    document.getElementById('public-ip').textContent = '185.230.45.167';
    document.getElementById('location').textContent = 'Ámsterdam, Países Bajos';
    document.getElementById('isp').textContent = 'WireGuard VPN';
    
    showNotification('VPN conectada - Tu identidad está protegida', 'success');
    addActivityLog('VPN conectada', 'success');
  } else {
    indicator.classList.remove('vpn-connected');
    indicator.classList.add('vpn-disconnected');
    statusText.textContent = 'Desconectado';
    toggleBtn.textContent = 'Conectar VPN';
    
    updateIPInfo();
    
    showNotification('VPN desconectada', 'info');
    addActivityLog('VPN desconectada', 'info');
  }
}

function updateIPInfo() {
  document.getElementById('public-ip').textContent = '192.168.1.100';
  document.getElementById('location').textContent = 'No protegido';
  document.getElementById('isp').textContent = 'Tu proveedor local';
}

function getToggleName(id) {
  const names = {
    'trackers': 'Bloqueo de rastreadores',
    'fingerprint': 'Anti-fingerprinting',
    'dns': 'DNS seguro'
  };
  return names[id] || id;
}

// ============================================================================
// REPORTS
// ============================================================================

function initReports() {
  const generateBtn = document.getElementById('generate-report');
  
  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      generateReport();
    });
  }
}

function generateReport() {
  showNotification('Generando reporte de seguridad...', 'info');
  
  setTimeout(() => {
    const now = new Date();
    const timestamp = formatDateTime(now);
    
    // Agregar fila a la tabla
    const table = document.getElementById('reports-table');
    const row = table.insertRow(0);
    
    row.innerHTML = `
      <td>${timestamp}</td>
      <td>Reporte Personalizado</td>
      <td><span class="badge badge-success">Seguro</span></td>
      <td>0</td>
      <td><button class="btn btn-sm">Ver</button></td>
    `;
    
    showNotification('Reporte generado exitosamente', 'success');
    addActivityLog('Reporte de seguridad generado', 'info');
  }, 1500);
}

function formatDateTime(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// ============================================================================
// NOTIFICACIONES Y LOG
// ============================================================================

function showNotification(message, type = 'info') {
  // Usar API de Electron si está disponible
  if (window.electronAPI && window.electronAPI.showNotification) {
    window.electronAPI.showNotification({
      title: 'Shield-Master 2026',
      body: message
    });
  } else {
    // Fallback para navegador
    console.log(`[${type.toUpperCase()}] ${message}`);
  }
}

function addActivityLog(title, type = 'info') {
  const log = document.getElementById('activity-log');
  if (!log) return;
  
  const iconMap = {
    success: '✓',
    warning: '!',
    info: 'i',
    danger: '✕'
  };
  
  const item = document.createElement('div');
  item.className = 'activity-item';
  item.innerHTML = `
    <div class="activity-icon activity-${type}">${iconMap[type] || 'i'}</div>
    <div class="activity-content">
      <p class="activity-title">${title}</p>
      <p class="activity-time">Justo ahora</p>
    </div>
  `;
  
  log.insertBefore(item, log.firstChild);
  
  // Limitar a 10 elementos
  while (log.children.length > 10) {
    log.removeChild(log.lastChild);
  }
}

// ============================================================================
// ACTUALIZACIÓN DE MÉTRICAS
// ============================================================================

function startMetricsUpdate() {
  setInterval(() => {
    // Simular cambios en métricas
    state.stats.cpuUsage = Math.max(20, Math.min(80, state.stats.cpuUsage + (Math.random() - 0.5) * 10));
    state.stats.ramUsage = Math.max(40, Math.min(85, state.stats.ramUsage + (Math.random() - 0.5) * 5));
    state.stats.diskUsage = Math.max(60, Math.min(90, state.stats.diskUsage + (Math.random() - 0.5) * 2));
    
    updateDashboardStats();
  }, 2000);
}

// ============================================================================
// UTILIDADES
// ============================================================================

// Formatear números
Number.prototype.toLocaleString = function() {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Log de inicialización
console.log('%c🛡️ Shield-Master 2026 Iniciado', 'color: #22c55e; font-size: 16px; font-weight: bold;');
console.log('%cDashboard de seguridad Cyber-Luxury', 'color: #9ca3af; font-size: 12px;');
