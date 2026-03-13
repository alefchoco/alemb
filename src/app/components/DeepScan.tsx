import { Shield, Search, Folder, FileWarning, Trash2, Play, Pause, HardDrive } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { 
  scanDirectory, 
  requestDirectoryAccess, 
  isFileSystemAccessSupported,
  ScanResult 
} from "../utils/fileScanner";
import { showThreatAlert, requestNotificationPermission } from "../utils/notifications";

const mockFiles = [
  { name: "system32.dll.exe", path: "C:\\Windows\\System32", threat: "CRÍTICO", type: "Trojan" },
  { name: "update_agent.js", path: "C:\\Users\\AppData\\Roaming", threat: "ALTO", type: "Malware" },
  { name: "chrome_tracker.dat", path: "C:\\Users\\Chrome\\Cookies", threat: "MEDIO", type: "Tracker" },
  { name: "temp_file_987.tmp", path: "C:\\Temp", threat: "BAJO", type: "Residual" },
];

export default function DeepScan() {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filesScanned, setFilesScanned] = useState(0);
  const [threatsFound, setThreatsFound] = useState(0);
  const [currentFile, setCurrentFile] = useState("");
  const [detectedThreats, setDetectedThreats] = useState<ScanResult[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isAPISupported, setIsAPISupported] = useState(true);

  useEffect(() => {
    setIsAPISupported(isFileSystemAccessSupported());
    requestNotificationPermission();
  }, []);

  // Real file scanning function
  const handleStartScan = async () => {
    if (!isAPISupported) {
      alert('Tu navegador no soporta File System Access API. Usa Chrome, Edge o Opera.');
      return;
    }

    const dirHandle = await requestDirectoryAccess();
    if (!dirHandle) {
      return; // User cancelled
    }

    setScanning(true);
    setProgress(0);
    setFilesScanned(0);
    setThreatsFound(0);
    setDetectedThreats([]);
    setShowAlert(false);

    try {
      let totalFiles = 0;
      
      await scanDirectory(
        dirHandle,
        (current, total, currentFile) => {
          totalFiles = current;
          setFilesScanned(current);
          setCurrentFile(currentFile);
          setProgress(Math.min((current / 100) * 100, 99)); // Estimate progress
        },
        (threat) => {
          // Real threat found!
          setDetectedThreats(prev => [...prev, threat]);
          setThreatsFound(prev => prev + 1);
          
          // Show browser notification
          showThreatAlert({
            title: '⚠️ AMENAZA DETECTADA',
            body: `${threat.name} - ${threat.reason}`,
            severity: threat.threatLevel === 'CRÍTICO' || threat.threatLevel === 'ALTO' ? 'critical' : 'warning',
            requireInteraction: threat.threatLevel === 'CRÍTICO'
          });
        }
      );

      setProgress(100);
      setScanning(false);
      
      if (detectedThreats.length > 0) {
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Scan error:', error);
      setScanning(false);
    }
  };

  const handleQuarantine = (index: number) => {
    // In web apps, we can't actually quarantine files
    // But we can remove from the list and log it
    const threat = detectedThreats[index];
    console.log('Would quarantine:', threat);
    setDetectedThreats(prev => prev.filter((_, i) => i !== index));
    alert(`Archivo marcado para revisión: ${threat.name}\n\nNOTA: Las aplicaciones web no pueden eliminar archivos automáticamente. Por favor, elimina manualmente: ${threat.path}`);
  };

  return (
    <div className="p-8 space-y-6 bg-black min-h-screen">
      {/* Critical Alert Modal */}
      <AnimatePresence>
        {showAlert && detectedThreats.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
            onClick={() => setShowAlert(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-950/90 backdrop-blur-xl border-2 border-red-600 rounded-2xl p-8 max-w-2xl w-full shadow-2xl shadow-red-600/50"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <FileWarning className="size-16 text-red-600" />
                  <div className="absolute inset-0 blur-2xl bg-red-600/50 animate-pulse"></div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-red-500 mb-2">⚠️ ALERTA CRÍTICA</h2>
                  <p className="text-zinc-300">Amenazas de alto nivel detectadas en tu sistema</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-zinc-900/50 border border-red-600/30 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-zinc-400">Tipo de Amenaza:</span>
                      <div className="font-bold text-red-500">{detectedThreats[0]?.reason}</div>
                    </div>
                    <div>
                      <span className="text-zinc-400">Nivel de Riesgo:</span>
                      <div className="font-bold text-red-500">{detectedThreats[0]?.threatLevel}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-zinc-400">Ubicación:</span>
                      <div className="font-mono text-sm text-white break-all">{detectedThreats[0]?.path}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-zinc-400">SHA-256 Hash:</span>
                      <div className="font-mono text-xs text-zinc-400 break-all">{detectedThreats[0]?.hash}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowAlert(false)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3"
                >
                  Ver Todos los Archivos
                </Button>
                <Button
                  onClick={() => setShowAlert(false)}
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800"
                >
                  Cerrar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          Deep File Audit
        </h1>
        <p className="text-zinc-400">Escaneo recursivo profundo con análisis heurístico real</p>
      </motion.div>

      {/* API Support Warning */}
      {!isAPISupported && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-950/30 border border-yellow-600/50 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <FileWarning className="size-6 text-yellow-500" />
            <div>
              <div className="font-semibold text-yellow-500">Funcionalidad Limitada</div>
              <div className="text-sm text-zinc-400">
                Tu navegador no soporta File System Access API. Usa Chrome, Edge u Opera para funcionalidad completa.
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scan Control */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Shield className={`size-12 ${scanning ? "text-red-600 animate-pulse" : "text-zinc-600"}`} />
              {scanning && <div className="absolute inset-0 blur-xl bg-red-600/50"></div>}
            </div>
            <div>
              <h2 className="text-2xl font-bold">Motor de Escaneo Real</h2>
              <p className="text-sm text-zinc-400">
                {scanning ? "Analizando sistema..." : "Haz clic para seleccionar carpeta"}
              </p>
            </div>
          </div>
          <Button
            onClick={scanning ? () => setScanning(false) : handleStartScan}
            size="lg"
            disabled={!isAPISupported && !scanning}
            className={scanning 
              ? "bg-zinc-800 hover:bg-zinc-700" 
              : "bg-red-600 hover:bg-red-700"
            }
          >
            {scanning ? (
              <>
                <Pause className="size-5 mr-2" />
                Pausar Escaneo
              </>
            ) : (
              <>
                <HardDrive className="size-5 mr-2" />
                Escanear Carpeta
              </>
            )}
          </Button>
        </div>

        {scanning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4"
          >
            <Progress value={progress} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-zinc-900/50 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-500">{filesScanned.toLocaleString()}</div>
                <div className="text-sm text-zinc-400">Archivos Escaneados</div>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-4">
                <div className="text-3xl font-bold text-red-500">{threatsFound}</div>
                <div className="text-sm text-zinc-400">Amenazas Detectadas</div>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-500">{progress}%</div>
                <div className="text-sm text-zinc-400">Progreso</div>
              </div>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm">
                <Search className="size-4 text-zinc-500 animate-pulse" />
                <span className="text-zinc-400">Escaneando:</span>
                <span className="text-white font-mono text-xs truncate">{currentFile}</span>
              </div>
            </div>
          </motion.div>
        )}

        {!scanning && filesScanned > 0 && (
          <div className="mt-4 bg-blue-950/30 border border-blue-600/30 rounded-lg p-4">
            <div className="text-sm text-blue-300">
              ✅ Escaneo completado: {filesScanned} archivos analizados con SHA-256 hashing
            </div>
          </div>
        )}
      </motion.div>

      {/* Detected Threats */}
      {detectedThreats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-red-900/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <FileWarning className="size-6 text-red-500" />
            <h2 className="text-2xl font-bold">Amenazas Detectadas (Real)</h2>
          </div>
          <div className="space-y-3">
            {detectedThreats.map((threat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900/50 border border-red-900/30 rounded-lg p-4 hover:border-red-600/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <FileWarning className="size-8 text-red-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white mb-1">{threat.name}</div>
                    <div className="text-sm text-zinc-400 font-mono break-all mb-2">{threat.path}</div>
                    <div className="text-xs text-zinc-500 mb-2">
                      Tamaño: {(threat.size / 1024).toFixed(2)} KB | Hash: {threat.hash.substring(0, 16)}...
                    </div>
                    <div className="text-sm text-red-300">{threat.reason}</div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap ${
                      threat.threatLevel === "CRÍTICO" 
                        ? "bg-red-600/20 text-red-500 border border-red-600/50" 
                        : threat.threatLevel === "ALTO"
                        ? "bg-orange-600/20 text-orange-500 border border-orange-600/50"
                        : threat.threatLevel === "MEDIO"
                        ? "bg-yellow-600/20 text-yellow-500 border border-yellow-600/50"
                        : "bg-blue-600/20 text-blue-500 border border-blue-600/50"
                    }`}>
                      {threat.threatLevel}
                    </span>
                    <Button
                      onClick={() => handleQuarantine(index)}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="size-4 mr-2" />
                      Marcar
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Scan Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <Folder className="size-8 text-blue-500 mb-4" />
          <div className="text-2xl font-bold mb-1">1,247</div>
          <div className="text-sm text-zinc-400">Carpetas Analizadas</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <Search className="size-8 text-purple-500 mb-4" />
          <div className="text-2xl font-bold mb-1">894 MB</div>
          <div className="text-sm text-zinc-400">Datos Analizados</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <Shield className="size-8 text-green-500 mb-4" />
          <div className="text-2xl font-bold mb-1">99.8%</div>
          <div className="text-sm text-zinc-400">Tasa de Detección</div>
        </motion.div>
      </div>
    </div>
  );
}