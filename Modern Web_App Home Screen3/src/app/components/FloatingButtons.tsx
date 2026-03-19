import { Download, Share2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from './ui/utils';

export function FloatingButtons() {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const downloadOptions = [
    { id: 'dwg', label: '.DWG' },
    { id: 'rvt', label: '.RVT' },
    { id: 'pdf', label: '.PDF' },
    { id: 'tif', label: '.TIF' },
  ];

  return (
    <div className="fixed top-6 right-6 flex gap-3 z-40">
      {/* Botón de Descargar - Circular */}
      <div className="relative">
        <button
          onClick={() => {
            setShowDownloadMenu(!showDownloadMenu);
            setShowShareMenu(false);
          }}
          className="w-12 h-12 bg-white/60 backdrop-blur-xl rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:bg-white/80 transition-all group border border-gray-200/50 flex items-center justify-center"
          title="Download"
        >
          <Download className="w-5 h-5 text-slate-700 group-hover:text-blue-500 transition-colors" strokeWidth={1.5} />
        </button>

        {/* Menú de Descargar */}
        {showDownloadMenu && (
          <div className="absolute top-full right-0 mt-2 bg-white/90 backdrop-blur-xl rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] py-1.5 min-w-[140px] border border-gray-200/50 animate-in fade-in slide-in-from-top-2">
            {downloadOptions.map((option) => {
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    console.log(`Descargando: ${option.id}`);
                    setShowDownloadMenu(false);
                  }}
                  className="w-full px-4 py-2 flex items-center justify-center hover:bg-slate-100/80 transition-colors text-left font-['Inter']"
                >
                  <span className="text-sm text-slate-700 font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Botón de Compartir - Circular */}
      <div className="relative">
        <button
          onClick={() => {
            setShowShareMenu(!showShareMenu);
            setShowDownloadMenu(false);
          }}
          className="w-12 h-12 bg-white/60 backdrop-blur-xl rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:bg-white/80 transition-all group border border-gray-200/50 flex items-center justify-center"
          title="Live Edit"
        >
          <Share2 className="w-5 h-5 text-slate-700 group-hover:text-green-500 transition-colors" strokeWidth={1.5} />
        </button>

        {/* Menú de Compartir */}
        {showShareMenu && (
          <div className="absolute top-full right-0 mt-2 bg-white/90 backdrop-blur-xl rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] py-2 min-w-[200px] border border-gray-200/50 animate-in fade-in slide-in-from-top-2">
            <button
              onClick={() => {
                console.log('Edición en vivo');
                setShowShareMenu(false);
              }}
              className="w-full px-4 py-2.5 hover:bg-slate-100/80 transition-colors text-left font-['Inter']"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Collaborate Live</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            </button>
            
            <div className="border-t border-gray-200/50 my-1" />
            
            <button
              onClick={() => {
                console.log('Compartir enlace');
                setShowShareMenu(false);
              }}
              className="w-full px-4 py-2 flex items-center gap-3 hover:bg-slate-100/80 transition-colors text-left font-['Inter']"
            >
              <span className="text-sm text-slate-700">Share Link</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}