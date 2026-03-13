import { FileText, Download, Mail, Calendar, CheckCircle, AlertTriangle, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { sendSecurityReport, formatReportForEmail, initEmailJS } from "../utils/emailService";
import { generatePDFReport, generateDetailedPDFReport, ReportData } from "../utils/pdfGenerator";

const mockReports = [
  {
    id: 1,
    date: "2026-03-02 14:35",
    type: "Escaneo Completo",
    threats: 4,
    status: "Crítico",
    filesScanned: 248591,
  },
  {
    id: 2,
    date: "2026-03-01 09:22",
    type: "Análisis VPN",
    threats: 0,
    status: "Seguro",
    filesScanned: 0,
  },
  {
    id: 3,
    date: "2026-02-29 18:47",
    type: "Limpieza de Trackers",
    threats: 89,
    status: "Medio",
    filesScanned: 0,
  },
  {
    id: 4,
    date: "2026-02-28 12:15",
    type: "Protección Email",
    threats: 12,
    status: "Alto",
    filesScanned: 0,
  },
];

const aiDiagnosis = {
  summary: "Se detectaron 4 amenazas críticas en tu sistema durante el último escaneo completo.",
  origin: "Las vulnerabilidades fueron causadas por descargas de archivos ejecutables desde sitios no verificados. El archivo 'system32.dll.exe' intentó modificar entradas críticas del registro de Windows.",
  resolution: "Shield-Master ejecutó un protocolo de cuarentena automática, aislando los archivos maliciosos y restaurando 37 entradas del registro comprometidas. Todos los procesos maliciosos fueron terminados exitosamente.",
  recommendation: "Recomendamos activar el filtro de descargas automáticas y mantener el escudo web activo en todo momento. Considera habilitar autenticación de dos factores para aplicaciones sensibles.",
};

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string>('');
  const [sending, setSending] = useState(false);

  const handleSendEmail = async () => {
    setSending(true);
    setEmailStatus('');

    // Format report data
    const reportData = formatReportForEmail({
      systemHealth: '94%',
      threatsEliminated: 4,
      aiDiagnosis: aiDiagnosis
    });

    // Try to send via EmailJS (requires setup)
    // User needs to:
    // 1. Create account at emailjs.com
    // 2. Get Service ID, Template ID, and Public Key
    // 3. Replace these placeholders
    
    const serviceId = 'YOUR_SERVICE_ID'; // Replace with real EmailJS service ID
    const templateId = 'YOUR_TEMPLATE_ID'; // Replace with real EmailJS template ID
    const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with real EmailJS public key
    
    // Show instructions if not configured
    if (serviceId === 'YOUR_SERVICE_ID') {
      setEmailStatus('⚠️ Configuración requerida: EmailJS no está configurado. Ver consola para instrucciones.');
      console.log(`
==============================================
📧 CONFIGURACIÓN DE EMAIL REQUERIDA
==============================================

Para enviar emails reales, sigue estos pasos:

1. Crea una cuenta gratuita en https://www.emailjs.com

2. Crea un servicio de email (Gmail, Outlook, etc.)

3. Crea una plantilla de email con estos parámetros:
   - to_email: {{to_email}}
   - system_health: {{system_health}}
   - threats_eliminated: {{threats_eliminated}}
   - diagnosis: {{diagnosis}}
   - recommendations: {{recommendations}}
   - timestamp: {{timestamp}}

4. Obtén tus credenciales:
   - Service ID
   - Template ID  
   - Public Key

5. Reemplaza en /src/app/components/Reports.tsx líneas 72-74

✅ EmailJS ahora se carga desde npm (@emailjs/browser)
   No necesitas agregar scripts al HTML

DATOS DEL REPORTE ACTUAL:
${JSON.stringify(reportData, null, 2)}

Destinatario: megagenial38@gmail.com
==============================================
      `);
      setSending(false);
      return;
    }

    try {
      initEmailJS(publicKey);
      const result = await sendSecurityReport(serviceId, templateId, reportData, 'megagenial38@gmail.com');
      
      if (result.success) {
        setEmailSent(true);
        setEmailStatus('✅ Email enviado exitosamente a megagenial38@gmail.com');
        setTimeout(() => {
          setEmailSent(false);
          setEmailStatus('');
        }, 5000);
      } else {
        setEmailStatus(`❌ Error: ${result.message}`);
      }
    } catch (error: any) {
      setEmailStatus(`❌ Error al enviar: ${error.message}`);
      console.error('Email error:', error);
    } finally {
      setSending(false);
    }
  };

  const handleDownloadPDF = () => {
    const reportData: ReportData = {
      systemHealth: '94%',
      threatsEliminated: 4,
      aiDiagnosis: aiDiagnosis,
      reports: mockReports,
      timestamp: new Date().toLocaleString('es-ES')
    };

    try {
      generatePDFReport(reportData);
      setEmailStatus('✅ Reporte PDF descargado exitosamente');
      setTimeout(() => setEmailStatus(''), 3000);
    } catch (error) {
      setEmailStatus('❌ Error al generar PDF. Asegúrate de tener jsPDF instalado: npm install jspdf');
      console.error('PDF Generation Error:', error);
    }
  };

  const handleDownloadDetailedPDF = () => {
    const reportData: ReportData = {
      systemHealth: '94%',
      threatsEliminated: 4,
      aiDiagnosis: aiDiagnosis,
      reports: mockReports,
      timestamp: new Date().toLocaleString('es-ES')
    };

    try {
      generateDetailedPDFReport(reportData);
      setEmailStatus('✅ Reporte PDF detallado descargado exitosamente');
      setTimeout(() => setEmailStatus(''), 3000);
    } catch (error) {
      setEmailStatus('❌ Error al generar PDF. Asegúrate de tener jsPDF instalado: npm install jspdf');
      console.error('PDF Generation Error:', error);
    }
  };

  return (
    <div className="p-8 space-y-6 bg-black min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
          Centro de Reportes
        </h1>
        <p className="text-zinc-400">Historial completo y diagnósticos de IA</p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <FileText className="size-8 text-blue-500 mb-4" />
          <div className="text-3xl font-bold mb-1">{mockReports.length}</div>
          <div className="text-sm text-zinc-400">Reportes Generados</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <Mail className="size-8 text-green-500 mb-4" />
          <div className="text-3xl font-bold mb-1">12</div>
          <div className="text-sm text-zinc-400">Emails Enviados</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <Shield className="size-8 text-purple-500 mb-4" />
          <div className="text-3xl font-bold mb-1">94%</div>
          <div className="text-sm text-zinc-400">Salud del Sistema</div>
        </motion.div>
      </div>

      {/* Email Status Message */}
      {emailStatus && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border rounded-xl p-4 ${
            emailStatus.includes('✅') 
              ? 'bg-green-950/30 border-green-600/50' 
              : 'bg-yellow-950/30 border-yellow-600/50'
          }`}
        >
          <div className="text-sm">{emailStatus}</div>
        </motion.div>
      )}

      {/* AI Diagnosis Report */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950/50 backdrop-blur-xl border border-purple-800/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <Shield className="size-10 text-purple-500" />
            <div className="absolute inset-0 blur-xl bg-purple-500/50"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Diagnóstico de IA</h2>
            <p className="text-sm text-zinc-400">Análisis inteligente del estado de seguridad</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* What Happened */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="size-5 text-red-500" />
              <h3 className="text-lg font-bold text-red-500">¿Qué Pasó?</h3>
            </div>
            <p className="text-zinc-300 leading-relaxed">{aiDiagnosis.origin}</p>
          </div>

          {/* How It Was Solved */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="size-5 text-green-500" />
              <h3 className="text-lg font-bold text-green-500">¿Cómo se Solucionó?</h3>
            </div>
            <p className="text-zinc-300 leading-relaxed">{aiDiagnosis.resolution}</p>
          </div>

          {/* Future Recommendation */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="size-5 text-blue-500" />
              <h3 className="text-lg font-bold text-blue-500">Recomendación Futura</h3>
            </div>
            <p className="text-zinc-300 leading-relaxed">{aiDiagnosis.recommendation}</p>
          </div>
        </div>

        {/* Email Action */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between bg-gradient-to-r from-purple-950/50 to-blue-950/50 border border-purple-800/30 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Mail className="size-6 text-purple-500" />
              <div>
                <div className="font-semibold text-white">Enviar Reporte por Email (REAL)</div>
                <div className="text-sm text-zinc-400">Destinatario: megagenial38@gmail.com</div>
              </div>
            </div>
            <Button
              onClick={handleSendEmail}
              disabled={emailSent || sending}
              className={emailSent ? "bg-green-600" : sending ? "bg-zinc-600" : "bg-purple-600 hover:bg-purple-700"}
            >
              {emailSent ? (
                <>
                  <CheckCircle className="size-5 mr-2" />
                  Enviado
                </>
              ) : sending ? (
                <>
                  <Mail className="size-5 mr-2 animate-pulse" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="size-5 mr-2" />
                  Enviar Ahora
                </>
              )}
            </Button>
          </div>

          {/* PDF Download Actions */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between bg-gradient-to-r from-green-950/50 to-emerald-950/50 border border-green-800/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Download className="size-6 text-green-500" />
                <div>
                  <div className="font-semibold text-white">Descargar PDF</div>
                  <div className="text-sm text-zinc-400">Reporte básico</div>
                </div>
              </div>
              <Button
                onClick={handleDownloadPDF}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="size-5 mr-2" />
                Descargar
              </Button>
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-blue-950/50 to-cyan-950/50 border border-blue-800/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FileText className="size-6 text-blue-500" />
                <div>
                  <div className="font-semibold text-white">PDF Detallado</div>
                  <div className="text-sm text-zinc-400">Análisis completo</div>
                </div>
              </div>
              <Button
                onClick={handleDownloadDetailedPDF}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="size-5 mr-2" />
                Descargar
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Report History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="size-8 text-blue-500" />
            <div>
              <h2 className="text-2xl font-bold">Historial de Reportes</h2>
              <p className="text-sm text-zinc-400">Análisis de seguridad anteriores</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {mockReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-zinc-900/50 border rounded-lg p-4 cursor-pointer transition-all ${
                selectedReport === report.id
                  ? "border-purple-600/50 bg-purple-950/20"
                  : "border-zinc-800/50 hover:border-zinc-700"
              }`}
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <FileText className="size-8 text-blue-500" />
                  <div>
                    <div className="font-semibold text-white mb-1">{report.type}</div>
                    <div className="text-sm text-zinc-400">{report.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {report.filesScanned > 0 && (
                    <div className="text-right">
                      <div className="text-sm text-zinc-400">Archivos</div>
                      <div className="font-bold text-white">{report.filesScanned.toLocaleString()}</div>
                    </div>
                  )}
                  <div className="text-right">
                    <div className="text-sm text-zinc-400">Amenazas</div>
                    <div className={`text-2xl font-bold ${
                      report.threats === 0 ? "text-green-500" : 
                      report.threats < 10 ? "text-yellow-500" : "text-red-500"
                    }`}>
                      {report.threats}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-bold ${
                    report.status === "Crítico" 
                      ? "bg-red-600/20 text-red-500 border border-red-600/50" 
                      : report.status === "Alto"
                      ? "bg-orange-600/20 text-orange-500 border border-orange-600/50"
                      : report.status === "Medio"
                      ? "bg-yellow-600/20 text-yellow-500 border border-yellow-600/50"
                      : "bg-green-600/20 text-green-500 border border-green-600/50"
                  }`}>
                    {report.status}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-zinc-700 hover:bg-zinc-800"
                  >
                    <Download className="size-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* System Health Summary */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold mb-4">Resumen de Salud del PC</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Amenazas Activas</span>
              <span className="text-2xl font-bold text-green-500">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Vulnerabilidades Encontradas</span>
              <span className="text-2xl font-bold text-yellow-500">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Archivos en Cuarentena</span>
              <span className="text-2xl font-bold text-red-500">4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Último Escaneo</span>
              <span className="text-sm font-mono text-white">Hace 2 horas</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold mb-4">Estadísticas Mensuales</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Amenazas Neutralizadas</span>
              <span className="text-2xl font-bold text-red-500">147</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Escaneos Realizados</span>
              <span className="text-2xl font-bold text-blue-500">28</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Reportes Generados</span>
              <span className="text-2xl font-bold text-green-500">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Uptime del Sistema</span>
              <span className="text-2xl font-bold text-purple-500">99.9%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}