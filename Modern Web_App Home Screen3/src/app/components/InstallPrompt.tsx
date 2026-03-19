import { Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Mostrar el prompt después de 3 segundos si no está instalado
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Verificar si ya está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('Usuario instaló la PWA');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // No mostrar de nuevo en esta sesión
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // No mostrar si ya fue descartado
  if (sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.2)] p-5 z-50 border border-gray-200/50 max-w-md animate-in slide-in-from-bottom-8 fade-in">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X className="w-4 h-4" strokeWidth={1.5} />
      </button>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-slate-700 rounded-[8px] flex items-center justify-center flex-shrink-0">
          <svg width="28" height="28" viewBox="0 0 512 512" fill="none">
            <rect width="512" height="512" rx="128" fill="#3b82f6"/>
            <path d="M 160 300 L 160 220 L 256 180 L 352 220 L 352 300 Z" fill="white" opacity="0.9"/>
            <path d="M 256 180 L 352 220 L 352 300 L 256 340 Z" fill="white" opacity="0.7"/>
          </svg>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 mb-1 font-['Inter']">
            Instalar CAD Studio Pro
          </h3>
          <p className="text-sm text-slate-600 mb-4 font-['Inter']">
            Instala la aplicación en tu dispositivo para acceso rápido desde tu escritorio o menú de inicio.
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="flex items-center gap-2 bg-slate-700 text-white px-4 py-2.5 rounded-[8px] text-sm font-medium hover:bg-slate-800 transition-all shadow-md font-['Inter']"
            >
              <Download className="w-4 h-4" strokeWidth={1.5} />
              Instalar Aplicación
            </button>
            
            <button
              onClick={handleDismiss}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-[8px] transition-all font-['Inter']"
            >
              Ahora no
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span className="font-['Inter']">Funciona sin internet</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span className="font-['Inter']">Acceso rápido</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
            <span className="font-['Inter']">Búsqueda por nombre</span>
          </div>
        </div>
      </div>
    </div>
  );
}
