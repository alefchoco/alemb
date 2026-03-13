import { Mail, Globe, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button } from "./ui/button";

const emailThreats = [
  { 
    from: "security@paypal-verify.com", 
    subject: "Urgent: Verify your account now", 
    threat: "PHISHING",
    severity: "CRÍTICO",
    reason: "Dominio sospechoso imitando PayPal"
  },
  { 
    from: "support@microsoft-security.net", 
    subject: "Your account has been compromised", 
    threat: "SCAM",
    severity: "ALTO",
    reason: "Enlace malicioso detectado en el cuerpo"
  },
  { 
    from: "invoice@dropbox-files.com", 
    subject: "New document shared with you.exe", 
    threat: "MALWARE",
    severity: "CRÍTICO",
    reason: "Archivo adjunto ejecutable (.exe)"
  },
];

const webThreats = [
  {
    url: "http://free-games-download.ru",
    ip: "185.234.219.45",
    threat: "MALWARE",
    reason: "Certificado SSL inválido + IP en lista negra"
  },
  {
    url: "https://login-facebook-verify.com",
    ip: "203.45.78.192",
    threat: "PHISHING",
    reason: "Imitación de sitio legítimo"
  },
  {
    url: "http://crypto-giveaway-elon.com",
    ip: "94.156.23.67",
    threat: "SCAM",
    reason: "Fraude de criptomonedas conocido"
  },
];

export default function Communication() {
  const [emailsBlocked, setEmailsBlocked] = useState(emailThreats.length);
  const [sitesBlocked, setSitesBlocked] = useState(webThreats.length);
  const [webProtectionEnabled, setWebProtectionEnabled] = useState(true);
  const [emailRef] = useAutoAnimate();
  const [webRef] = useAutoAnimate();

  return (
    <div className="p-8 space-y-6 bg-black min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Escudo de Comunicación
        </h1>
        <p className="text-zinc-400">Protección en tiempo real para emails y navegación web</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <Mail className="size-8 text-red-500 mb-4" />
          <div className="text-3xl font-bold mb-1">{emailsBlocked}</div>
          <div className="text-sm text-zinc-400">Emails Bloqueados</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <Globe className="size-8 text-orange-500 mb-4" />
          <div className="text-3xl font-bold mb-1">{sitesBlocked}</div>
          <div className="text-sm text-zinc-400">Sitios Maliciosos</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <CheckCircle className="size-8 text-green-500 mb-4" />
          <div className="text-3xl font-bold mb-1">2,847</div>
          <div className="text-sm text-zinc-400">Conexiones Seguras</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <Shield className="size-8 text-blue-500 mb-4" />
          <div className="text-3xl font-bold mb-1">100%</div>
          <div className="text-sm text-zinc-400">Tasa de Protección</div>
        </motion.div>
      </div>

      {/* Email Protector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <Mail className="size-10 text-red-500" />
            <div className="absolute inset-0 blur-xl bg-red-500/30"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Email Protector</h2>
            <p className="text-sm text-zinc-400">Filtro anti-phishing en tiempo real</p>
          </div>
        </div>

        <div className="space-y-3" ref={emailRef}>
          {emailThreats.map((email, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900/50 border border-red-900/30 rounded-lg p-4 hover:border-red-600/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <XCircle className="size-8 text-red-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-white mb-1">{email.subject}</div>
                      <div className="text-sm text-zinc-400 font-mono">{email.from}</div>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap ${
                      email.severity === "CRÍTICO" 
                        ? "bg-red-600/20 text-red-500 border border-red-600/50" 
                        : "bg-orange-600/20 text-orange-500 border border-orange-600/50"
                    }`}>
                      {email.threat}
                    </span>
                  </div>
                  <div className="bg-red-950/30 border border-red-900/30 rounded p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="size-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-red-300">{email.reason}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 bg-green-600/10 border border-green-600/30 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="size-6 text-green-500" />
            <div>
              <div className="font-semibold text-green-500">Protección Activa</div>
              <div className="text-sm text-zinc-400">Todos los emails sospechosos serán bloqueados automáticamente</div>
            </div>
          </div>
          <CheckCircle className="size-8 text-green-500" />
        </div>
      </motion.div>

      {/* Web Protector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <Globe className="size-10 text-orange-500" />
            <div className="absolute inset-0 blur-xl bg-orange-500/30"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Web Protector</h2>
            <p className="text-sm text-zinc-400">Bloqueo de IPs maliciosas y SSL inválidos</p>
          </div>
        </div>

        <div className="space-y-3" ref={webRef}>
          {webThreats.map((site, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900/50 border border-orange-900/30 rounded-lg p-4 hover:border-orange-600/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <XCircle className="size-8 text-orange-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-mono text-sm text-white mb-1 break-all">{site.url}</div>
                      <div className="text-xs text-zinc-500">IP: {site.ip}</div>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap ml-4 ${
                      site.threat === "MALWARE" 
                        ? "bg-red-600/20 text-red-500 border border-red-600/50" 
                        : site.threat === "PHISHING"
                        ? "bg-yellow-600/20 text-yellow-500 border border-yellow-600/50"
                        : "bg-orange-600/20 text-orange-500 border border-orange-600/50"
                    }`}>
                      {site.threat}
                    </span>
                  </div>
                  <div className="bg-orange-950/30 border border-orange-900/30 rounded p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="size-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-orange-300">{site.reason}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="size-5 text-blue-500" />
              <span className="font-semibold text-blue-500">Certificados SSL Validados</span>
            </div>
            <div className="text-2xl font-bold">1,847</div>
            <div className="text-sm text-zinc-400">Sitios seguros verificados hoy</div>
          </div>
          <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="size-5 text-red-500" />
              <span className="font-semibold text-red-500">Lista Negra de IPs</span>
            </div>
            <div className="text-2xl font-bold">24,591</div>
            <div className="text-sm text-zinc-400">Direcciones IP bloqueadas</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}