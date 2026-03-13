import { Eye, Cookie, Globe, Shield, Trash2, Activity, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { getRealIP, getNetworkInfo } from "../utils/networkInfo";

const trackerData = [
  { name: "Google Analytics", domain: "google-analytics.com", cookies: 47, lastSeen: "Hace 5 min", risk: "MEDIO" },
  { name: "Facebook Pixel", domain: "facebook.com", cookies: 23, lastSeen: "Hace 12 min", risk: "ALTO" },
  { name: "DoubleClick Ad", domain: "doubleclick.net", cookies: 89, lastSeen: "Hace 2 min", risk: "ALTO" },
  { name: "Twitter Analytics", domain: "twitter.com", cookies: 15, lastSeen: "Hace 30 min", risk: "BAJO" },
];

const vpnServers = [
  { country: "Estados Unidos", city: "Nueva York", ping: 12, load: 45, status: "online" },
  { country: "Alemania", city: "Frankfurt", ping: 28, load: 67, status: "online" },
  { country: "Japón", city: "Tokio", ping: 145, load: 34, status: "online" },
  { country: "Reino Unido", city: "Londres", ping: 35, load: 89, status: "busy" },
  { country: "Singapur", city: "Singapur", ping: 98, load: 23, status: "online" },
];

export default function Privacy() {
  const [vpnEnabled, setVpnEnabled] = useState(false);
  const [trackingBlocked, setTrackingBlocked] = useState(true);
  const [selectedServer, setSelectedServer] = useState(0);
  const [trackers, setTrackers] = useState(trackerData);
  const [realIP, setRealIP] = useState<string | null>(null);
  const [location, setLocation] = useState<any>(null);
  const [networkInfo, setNetworkInfo] = useState<any>(null);

  useEffect(() => {
    loadNetworkData();
  }, []);

  const loadNetworkData = async () => {
    const ipData = await getRealIP();
    if (ipData) {
      setRealIP(ipData.ip);
      setLocation(ipData.location);
    }
    
    const network = getNetworkInfo();
    setNetworkInfo(network);
  };

  const handleRemoveTracker = (index: number) => {
    setTrackers(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setTrackers([]);
  };

  const handleVPNToggle = (enabled: boolean) => {
    setVpnEnabled(enabled);
    if (enabled) {
      // In a web app, we can't create a real VPN tunnel
      // But we can show the concept
      alert('⚠️ NOTA: Las aplicaciones web no pueden crear túneles VPN reales a nivel de sistema operativo.\\n\\nPara VPN real, necesitas:\\n• Aplicación nativa (Electron/Desktop)\\n• Cliente WireGuard instalado\\n• Servidor VPN configurado\\n\\nEsta demo muestra tu IP pública real detectada.');
    }
  };

  return (
    <div className="p-8 space-y-6 bg-black min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Privacidad Total
        </h1>
        <p className="text-zinc-400">Monitoreo real de red y ubicación</p>
      </motion.div>

      {/* Real IP Display */}
      {realIP && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-950/30 border border-blue-600/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-4">
            <MapPin className="size-6 text-blue-500" />
            <div className="flex-1">
              <div className="text-sm text-zinc-400 mb-1">Tu ubicación real detectada:</div>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-zinc-500">IP: </span>
                  <span className="font-mono text-blue-400">{realIP}</span>
                </div>
                {location && (
                  <>
                    <div>
                      <span className="text-zinc-500">Ciudad: </span>
                      <span className="text-white">{location.city}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">País: </span>
                      <span className="text-white">{location.country}</span>
                    </div>
                    {location.isp && (
                      <div>
                        <span className="text-zinc-500">ISP: </span>
                        <span className="text-white">{location.isp}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* VPN Control */}
      <div className="grid grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-2 bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Globe className={`size-10 ${vpnEnabled ? "text-green-500" : "text-zinc-600"}`} />
                {vpnEnabled && <div className="absolute inset-0 blur-xl bg-green-500/50 animate-pulse"></div>}
              </div>
              <div>
                <h2 className="text-2xl font-bold">VPN WireGuard (Demo)</h2>
                <p className="text-sm text-zinc-400">Visualización de concepto VPN</p>
              </div>
            </div>
            <Switch
              checked={vpnEnabled}
              onCheckedChange={handleVPNToggle}
              className="data-[state=checked]:bg-green-600"
            />
          </div>

          {vpnEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4"
            >
              <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="size-5 text-green-500" />
                  <span className="font-semibold text-green-500">Modo Demo Activo</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-zinc-400">IP Real Detectada:</span>
                    <div className="font-mono text-white">{realIP || 'Detectando...'}</div>
                  </div>
                  <div>
                    <span className="text-zinc-400">IP VPN (Simulada):</span>
                    <div className="font-mono text-green-500">203.45.67.89</div>
                  </div>
                  <div>
                    <span className="text-zinc-400">Protocolo:</span>
                    <div className="font-bold text-white">WireGuard (Concepto)</div>
                  </div>
                </div>
                {networkInfo && (
                  <div className="mt-3 pt-3 border-t border-green-600/20">
                    <div className="text-xs text-zinc-500">
                      Tipo de conexión: {networkInfo.effectiveType || 'N/A'} | 
                      Velocidad: {networkInfo.downlink || 'N/A'} Mbps | 
                      Latencia: {networkInfo.rtt || 'N/A'} ms
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold mb-3">Servidores Disponibles</h3>
                {vpnServers.map((server, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedServer(index)}
                    className={`bg-zinc-900/50 border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedServer === index
                        ? "border-green-600/50 bg-green-600/10"
                        : "border-zinc-800/50 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{server.country === "Estados Unidos" ? "🇺🇸" : 
                          server.country === "Alemania" ? "🇩🇪" : 
                          server.country === "Japón" ? "🇯🇵" : 
                          server.country === "Reino Unido" ? "🇬🇧" : "🇸🇬"}</div>
                        <div>
                          <div className="font-semibold text-white">{server.city}, {server.country}</div>
                          <div className="text-sm text-zinc-400">Ping: {server.ping}ms</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-zinc-400">Carga del Servidor</div>
                          <div className={`font-bold ${server.load < 50 ? "text-green-500" : server.load < 80 ? "text-yellow-500" : "text-red-500"}`}>
                            {server.load}%
                          </div>
                        </div>
                        <div className={`size-3 rounded-full ${
                          server.status === "online" ? "bg-green-500" : "bg-red-500"
                        } ${selectedServer === index ? "animate-pulse" : ""}`}></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* VPN Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
            <Activity className="size-8 text-blue-500 mb-4" />
            <div className="text-3xl font-bold mb-1">2.4 GB</div>
            <div className="text-sm text-zinc-400">Datos Encriptados Hoy</div>
          </div>
          <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
            <Shield className="size-8 text-green-500 mb-4" />
            <div className="text-3xl font-bold mb-1">100%</div>
            <div className="text-sm text-zinc-400">Conexión Cifrada</div>
          </div>
          <div className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6">
            <Globe className="size-8 text-purple-500 mb-4" />
            <div className="text-3xl font-bold mb-1">847</div>
            <div className="text-sm text-zinc-400">IPs Bloqueadas</div>
          </div>
        </motion.div>
      </div>

      {/* Tracker Remover */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Eye className="size-8 text-red-500" />
            <div>
              <h2 className="text-2xl font-bold">Tracker Remover</h2>
              <p className="text-sm text-zinc-400">Elimina cookies de seguimiento y huellas digitales</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">Bloqueo Activo</span>
              <Switch
                checked={trackingBlocked}
                onCheckedChange={setTrackingBlocked}
                className="data-[state=checked]:bg-red-600"
              />
            </div>
            {trackers.length > 0 && (
              <Button
                onClick={handleClearAll}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="size-4 mr-2" />
                Limpiar Todo
              </Button>
            )}
          </div>
        </div>

        {trackers.length > 0 ? (
          <div className="space-y-3">
            {trackers.map((tracker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4 flex items-center justify-between hover:border-red-600/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <Cookie className="size-8 text-orange-500" />
                  <div>
                    <div className="font-semibold text-white mb-1">{tracker.name}</div>
                    <div className="text-sm text-zinc-400 font-mono">{tracker.domain}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{tracker.cookies}</div>
                    <div className="text-xs text-zinc-500">Cookies</div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded text-xs font-bold mb-1 ${
                      tracker.risk === "ALTO" 
                        ? "bg-red-600/20 text-red-500 border border-red-600/50" 
                        : tracker.risk === "MEDIO"
                        ? "bg-yellow-600/20 text-yellow-500 border border-yellow-600/50"
                        : "bg-blue-600/20 text-blue-500 border border-blue-600/50"
                    }`}>
                      {tracker.risk}
                    </div>
                    <div className="text-xs text-zinc-500">{tracker.lastSeen}</div>
                  </div>
                  <Button
                    onClick={() => handleRemoveTracker(index)}
                    size="sm"
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-8 text-center">
            <Shield className="size-16 text-green-500 mx-auto mb-4" />
            <div className="text-xl font-bold text-green-500 mb-2">¡Sin Rastreadores!</div>
            <div className="text-zinc-400">Tu navegación está limpia y privada</div>
          </div>
        )}
      </motion.div>
    </div>
  );
}