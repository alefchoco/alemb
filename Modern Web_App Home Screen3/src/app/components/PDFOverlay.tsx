import { FileText, X, Upload } from 'lucide-react';
import { useState } from 'react';

interface PDFOverlayProps {
  onPdfLoad: (url: string) => void;
  onClear: () => void;
  hasPdf: boolean;
}

export function PDFOverlay({ onPdfLoad, onClear, hasPdf }: PDFOverlayProps) {
  const [showUpload, setShowUpload] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      // En producción real, se convertiría el PDF a imagen
      // Por ahora usamos una imagen placeholder
      console.log('PDF cargado:', file.name);
      setShowUpload(false);
    }
  };

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-white/60 backdrop-blur-xl rounded-[8px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] px-4 py-2.5 z-40 border border-gray-200/50">
      <div className="flex items-center gap-3">
        <FileText className="w-4 h-4 text-slate-600" strokeWidth={1.5} />
        
        {!hasPdf ? (
          <>
            <span className="text-xs text-slate-600 font-['Inter'] font-medium">
              PDF Underlay
            </span>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="pdf-upload"
            />
            <label
              htmlFor="pdf-upload"
              className="cursor-pointer bg-slate-700 text-white px-3 py-1 rounded-[6px] text-xs font-medium hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Upload className="w-3 h-3" strokeWidth={1.5} />
              Load PDF
            </label>
          </>
        ) : (
          <>
            <span className="text-xs text-green-600 font-['Inter'] font-medium">
              PDF Loaded
            </span>
            <button
              onClick={onClear}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
