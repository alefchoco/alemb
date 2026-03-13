// Email Service using EmailJS (npm package - more secure than CDN)
// User needs to set up EmailJS account at https://www.emailjs.com/
import emailjs from '@emailjs/browser';

export interface EmailReport {
  systemHealth: string;
  threatsEliminated: number;
  diagnosis: string;
  recommendations: string;
  timestamp: string;
}

// Initialize EmailJS
export function initEmailJS(publicKey: string) {
  emailjs.init(publicKey);
}

// Send security report via email
export async function sendSecurityReport(
  serviceId: string,
  templateId: string,
  report: EmailReport,
  recipientEmail: string = 'megagenial38@gmail.com'
): Promise<{ success: boolean; message: string }> {
  try {
    const templateParams = {
      to_email: recipientEmail,
      system_health: report.systemHealth,
      threats_eliminated: report.threatsEliminated,
      diagnosis: report.diagnosis,
      recommendations: report.recommendations,
      timestamp: report.timestamp,
      from_name: 'Shield-Master 2026'
    };

    const response = await emailjs.send(serviceId, templateId, templateParams);
    
    return {
      success: true,
      message: 'Email enviado exitosamente'
    };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error?.text || 'Error al enviar email'
    };
  }
}

// Format report for email
export function formatReportForEmail(data: any): EmailReport {
  return {
    systemHealth: data.systemHealth || '94%',
    threatsEliminated: data.threatsEliminated || 0,
    diagnosis: data.aiDiagnosis?.summary || 'Sistema operando normalmente',
    recommendations: data.aiDiagnosis?.recommendation || 'Mantener protecciones activas',
    timestamp: new Date().toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
}