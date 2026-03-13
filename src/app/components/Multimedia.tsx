import { Video, Camera, Mic, Shield, AlertTriangle, Eye, Lock, Unlock } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { 
  getMediaDevices, 
  requestCameraAccess, 
  requestMicrophoneAccess,
  stopMediaStream,
  MediaDeviceStatus 
} from "../utils/mediaControl";

const recentActivity = [
  { app: "Zoom Meeting", device: "Cámara + Micrófono", time: "Hace 15 min", authorized: true },
  { app: "Chrome Browser", device: "Cámara", time: "Hace 32 min", authorized: false },
  { app: "Discord", device: "Micrófono", time: "Hace 1 hora", authorized: true },
  { app: "Skype", device: "Cámara + Micrófono", time: "Hace 2 horas", authorized: true },
];

const deepfakeAlerts = [
  {
    source: "video_call_recording.mp4",
    detected: "Manipulación de rostro detectada",
    confidence: 94,
    timestamp: "00:02:34"
  },
  {
    source: "webcam_capture.jpg",
    detected: "Deepfake facial synthesis",
    confidence: 87,
    timestamp: "N/A"
  },
];

export default function Multimedia() {
  const [cameraBlocked, setCameraBlocked] = useState(true);
  const [micBlocked, setMicBlocked] = useState(true);
  const [deepfakeProtection, setDeepfakeProtection] = useState(true);
  const [screenshotProtection, setScreenshotProtection] = useState(true);
  const [mediaStatus, setMediaStatus] = useState<MediaDeviceStatus | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [accessAttempts, setAccessAttempts] = useState(recentActivity);

  useEffect(() => {
    loadMediaDevices();
  }, []);

  const loadMediaDevices = async () => {
    const status = await getMediaDevices();
    setMediaStatus(status);
  };

  const handleCameraToggle = async (enabled: boolean) => {
    if (enabled) {
      const stream = await requestCameraAccess();
      if (stream) {
        setCameraStream(stream);
        setCameraBlocked(false);
        setAccessAttempts(prev => [{
          app: 'Shield-Master',
          device: 'Cámara',
          time: 'Ahora',
          authorized: true
        }, ...prev]);
      } else {
        alert('Permiso de cámara denegado. Por favor, habilita el acceso en la configuración del navegador.');
      }
    } else {
      stopMediaStream(cameraStream);
      setCameraStream(null);
      setCameraBlocked(true);
    }
  };

  const handleMicToggle = async (enabled: boolean) => {
    if (enabled) {
      const stream = await requestMicrophoneAccess();
      if (stream) {
        setMicStream(stream);
        setMicBlocked(false);
        setAccessAttempts(prev => [{
          app: 'Shield-Master',
          device: 'Micrófono',
          time: 'Ahora',
          authorized: true
        }, ...prev]);
      } else {
        alert('Permiso de micrófono denegado. Por favor, habilita el acceso en la configuración del navegador.');
      }
    } else {
      stopMediaStream(micStream);
      setMicStream(null);
      setMicBlocked(true);
    }
  };

  return (
    <div className="p-8 space-y-6 bg-black min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Protección Multimedia
        </h1>
        <p className="text-zinc-400">Control real de cámara y micrófono del navegador</p>
      </motion.div>

      {/* Device Status Info */}
      {mediaStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-950/30 border border-blue-600/30 rounded-xl p-4"
        >
          <div className="text-sm text-blue-300">
            📹 Cámara detectada: {mediaStatus.hasCamera ? 'Sí' : 'No'} | 
            🎤 Micrófono detectado: {mediaStatus.hasMicrophone ? 'Sí' : 'No'} |
            Estado: {cameraStream || micStream ? 'En uso' : 'Disponible'}
          </div>
        </motion.div>
      )}

      {/* Device Controls */}
      <div className="grid grid-cols-2 gap-6">
        {/* Camera Control */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Camera className={`size-10 ${cameraBlocked ? "text-red-500" : "text-green-500"}`} />
                {cameraBlocked && <div className="absolute inset-0 blur-xl bg-red-500/50"></div>}
                {!cameraBlocked && <div className="absolute inset-0 blur-xl bg-green-500/50"></div>}
              </div>
              <div>
                <h2 className="text-2xl font-bold">Cámara Web</h2>
                <p className="text-sm text-zinc-400">
                  {cameraBlocked ? "Bloqueada" : "Activa en este navegador"}
                </p>
              </div>
            </div>
            <Switch
              checked={!cameraBlocked}
              onCheckedChange={handleCameraToggle}
              className="data-[state=checked]:bg-green-600"
            />
          </div>

          {cameraBlocked ? (
            <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="size-5 text-red-500" />
                <span className="font-semibold text-red-500">Acceso Bloqueado</span>
              </div>
              <div className="text-sm text-zinc-400">
                La cámara está bloqueada para este sitio web.
              </div>
            </div>
          ) : (
            <>
              <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Unlock className="size-5 text-green-500" />
                  <span className="font-semibold text-green-500">Cámara Activa</span>
                </div>
                <div className="text-sm text-zinc-400">
                  Shield-Master tiene acceso a tu cámara.
                </div>
              </div>
              {cameraStream && (
                <div className="bg-zinc-900 rounded-lg p-2">
                  <video
                    ref={(video) => {
                      if (video && cameraStream) {
                        video.srcObject = cameraStream;
                        video.play();
                      }
                    }}
                    autoPlay
                    muted
                    className="w-full rounded"
                  />
                </div>
              )}
            </>
          )}

          <div className="mt-4 space-y-2">
            <div className="text-sm font-semibold text-zinc-300">Información del Dispositivo</div>
            <div className="text-xs text-zinc-500">
              {mediaStatus?.devices.filter(d => d.kind === 'videoinput').map((device, i) => (
                <div key={i}>{device.label || `Cámara ${i + 1}`}</div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Microphone Control */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Mic className={`size-10 ${micBlocked ? "text-red-500" : "text-green-500"}`} />
                {micBlocked && <div className="absolute inset-0 blur-xl bg-red-500/50"></div>}
                {!micBlocked && <div className="absolute inset-0 blur-xl bg-green-500/50"></div>}
              </div>
              <div>
                <h2 className="text-2xl font-bold">Micrófono</h2>
                <p className="text-sm text-zinc-400">
                  {micBlocked ? "Bloqueado" : "Activo en este navegador"}
                </p>
              </div>
            </div>
            <Switch
              checked={!micBlocked}
              onCheckedChange={handleMicToggle}
              className="data-[state=checked]:bg-green-600"
            />
          </div>

          {micBlocked ? (
            <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="size-5 text-red-500" />
                <span className="font-semibold text-red-500">Acceso Bloqueado</span>
              </div>
              <div className="text-sm text-zinc-400">
                El micrófono está bloqueado para este sitio web.
              </div>
            </div>
          ) : (
            <>
              <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Unlock className="size-5 text-green-500" />
                  <span className="font-semibold text-green-500">Micrófono Activo</span>
                </div>
                <div className="text-sm text-zinc-400">
                  Shield-Master tiene acceso a tu micrófono.
                </div>
              </div>
              {micStream && (
                <div className="bg-zinc-900 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="size-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-500">Grabando audio...</span>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="mt-4 space-y-2">
            <div className="text-sm font-semibold text-zinc-300">Información del Dispositivo</div>
            <div className="text-xs text-zinc-500">
              {mediaStatus?.devices.filter(d => d.kind === 'audioinput').map((device, i) => (
                <div key={i}>{device.label || `Micrófono ${i + 1}`}</div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Eye className="size-8 text-blue-500" />
          <div>
            <h2 className="text-2xl font-bold">Actividad Reciente</h2>
            <p className="text-sm text-zinc-400">Intentos de acceso a dispositivos multimedia</p>
          </div>
        </div>

        <div className="space-y-3">
          {accessAttempts.slice(0, 4).map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-zinc-900/50 border rounded-lg p-4 ${
                activity.authorized ? "border-green-900/30" : "border-red-900/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {activity.authorized ? (
                    <Shield className="size-8 text-green-500" />
                  ) : (
                    <AlertTriangle className="size-8 text-red-500" />
                  )}
                  <div>
                    <div className="font-semibold text-white mb-1">{activity.app}</div>
                    <div className="text-sm text-zinc-400">{activity.device}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded text-xs font-bold mb-1 ${
                    activity.authorized
                      ? "bg-green-600/20 text-green-500 border border-green-600/50"
                      : "bg-red-600/20 text-red-500 border border-red-600/50"
                  }`}>
                    {activity.authorized ? "AUTORIZADO" : "BLOQUEADO"}
                  </div>
                  <div className="text-xs text-zinc-500">{activity.time}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Deepfake Protection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Video className="size-10 text-purple-500" />
              <div className="absolute inset-0 blur-xl bg-purple-500/30"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Anti-Deepfake AI</h2>
              <p className="text-sm text-zinc-400">Detección de manipulación facial en tiempo real</p>
            </div>
          </div>
          <Switch
            checked={deepfakeProtection}
            onCheckedChange={setDeepfakeProtection}
            className="data-[state=checked]:bg-purple-600"
          />
        </div>

        {deepfakeProtection && deepfakeAlerts.length > 0 && (
          <div className="space-y-3">
            {deepfakeAlerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-purple-950/30 border border-purple-900/30 rounded-lg p-4"
              >
                <div className="flex items-start gap-4">
                  <AlertTriangle className="size-8 text-purple-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-white mb-1">{alert.detected}</div>
                        <div className="text-sm text-zinc-400 font-mono">{alert.source}</div>
                      </div>
                      <span className="px-3 py-1 rounded text-xs font-bold bg-purple-600/20 text-purple-500 border border-purple-600/50 whitespace-nowrap">
                        {alert.confidence}% Confianza
                      </span>
                    </div>
                    <div className="text-sm text-purple-300">
                      Timestamp: {alert.timestamp}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {deepfakeProtection && deepfakeAlerts.length === 0 && (
          <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4 text-center">
            <Shield className="size-12 text-green-500 mx-auto mb-3" />
            <div className="font-semibold text-green-500 mb-1">Sin Deepfakes Detectados</div>
            <div className="text-sm text-zinc-400">Todos los medios multimedia están verificados como auténticos</div>
          </div>
        )}
      </motion.div>

      {/* Screenshot Protection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Camera className="size-8 text-orange-500" />
            <div>
              <h3 className="text-xl font-bold">Protección de Capturas</h3>
              <p className="text-sm text-zinc-400">Bloquea capturas de pantalla no autorizadas</p>
            </div>
          </div>
          <Switch
            checked={screenshotProtection}
            onCheckedChange={setScreenshotProtection}
            className="data-[state=checked]:bg-orange-600"
          />
        </div>
        {screenshotProtection && (
          <div className="mt-4 bg-orange-600/10 border border-orange-600/30 rounded-lg p-4">
            <div className="text-sm text-zinc-300">
              Las aplicaciones de terceros no podrán capturar contenido sensible de tu pantalla.
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}