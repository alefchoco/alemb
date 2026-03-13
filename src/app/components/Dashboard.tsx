import { Shield, Activity, Zap, Globe, Eye, Lock } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const networkData = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}s`,
  traffic: Math.floor(Math.random() * 100),
  threats: Math.floor(Math.random() * 5),
  id: i, // Add unique id
}));

const systemMetrics = [
  { label: "Archivos Escaneados", value: "248,591", icon: Shield, color: "text-green-500" },
  { label: "Amenazas Neutralizadas", value: "37", icon: Activity, color: "text-red-500" },
  { label: "Datos Encriptados", value: "2.4 TB", icon: Lock, color: "text-blue-500" },
  { label: "VPN Activa", value: "98.7%", icon: Globe, color: "text-purple-500" },
];

const recentThreats = [
  { name: "Trojan.Win32.Generic", path: "C:\\Users\\Downloads\\file.exe", severity: "CRÍTICO", time: "Hace 2 min" },
  { name: "Adware.WebCompanion", path: "C:\\Program Files\\Temp", severity: "MEDIO", time: "Hace 5 min" },
  { name: "Ransomware.Signature", path: "C:\\Users\\Documents\\encrypted.dat", severity: "CRÍTICO", time: "Hace 12 min" },
  { name: "Cookie Tracker (Google)", path: "Chrome Cookies Database", severity: "BAJO", time: "Hace 18 min" },
];

export default function Dashboard() {
  const [cpuUsage, setCpuUsage] = useState(45);
  const [memoryUsage, setMemoryUsage] = useState(62);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(20, Math.min(90, prev + (Math.random() - 0.5) * 10)));
      setMemoryUsage(prev => Math.max(30, Math.min(80, prev + (Math.random() - 0.5) * 8)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 space-y-6 bg-black">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Centro de Control
          </h1>
          <p className="text-zinc-400">Monitoreo en tiempo real de tu seguridad</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="size-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-500 font-semibold">PROTEGIDO</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* System Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6 hover:border-red-600/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <metric.icon className={`size-8 ${metric.color}`} />
            </div>
            <div className="text-3xl font-bold mb-1">{metric.value}</div>
            <div className="text-sm text-zinc-400">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Network Traffic */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Activity className="size-5 text-red-500" />
            <h2 className="text-xl font-bold">Tráfico de Red</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={networkData}>
              <defs>
                <linearGradient id="colorTrafficGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="time" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
              />
              <Area 
                type="monotone" 
                dataKey="traffic" 
                stroke="#ef4444" 
                fill="url(#colorTrafficGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* System Resources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Zap className="size-5 text-yellow-500" />
            <h2 className="text-xl font-bold">Recursos del Sistema</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-400">CPU Usage</span>
                <span className="text-sm font-bold text-yellow-500">{cpuUsage.toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${cpuUsage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-zinc-400">Memoria RAM</span>
                <span className="text-sm font-bold text-blue-500">{memoryUsage.toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${memoryUsage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-800">
              <div className="text-sm text-zinc-400 mb-2">Temperatura GPU</div>
              <div className="text-2xl font-bold text-green-500">67°C</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Threats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Eye className="size-5 text-red-500" />
          <h2 className="text-xl font-bold">Amenazas Recientes Detectadas</h2>
        </div>
        <div className="space-y-3">
          {recentThreats.map((threat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4 hover:border-red-600/30 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-red-500">{threat.name}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      threat.severity === "CRÍTICO" 
                        ? "bg-red-600/20 text-red-500 border border-red-600/50" 
                        : threat.severity === "MEDIO"
                        ? "bg-yellow-600/20 text-yellow-500 border border-yellow-600/50"
                        : "bg-blue-600/20 text-blue-500 border border-blue-600/50"
                    }`}>
                      {threat.severity}
                    </span>
                  </div>
                  <div className="text-sm text-zinc-400 font-mono">{threat.path}</div>
                </div>
                <div className="text-xs text-zinc-500">{threat.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}