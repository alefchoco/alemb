import { Navigation } from 'lucide-react';

export function NorthSymbol() {
  return (
    <div className="fixed top-6 right-24 bg-white/60 backdrop-blur-xl rounded-[8px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] p-3 z-40 border border-gray-200/50">
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Círculo exterior */}
        <div className="absolute inset-0 border-2 border-slate-300 rounded-full" />
        
        {/* Rosa de los vientos simplificada */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-0.5 bg-slate-300" />
          <div className="absolute w-0.5 h-full bg-slate-300" />
        </div>
        
        {/* Flecha Norte */}
        <div className="relative z-10">
          <Navigation 
            className="w-6 h-6 text-red-500 -rotate-45" 
            strokeWidth={2}
            fill="currentColor"
          />
        </div>
        
        {/* Letra N */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-700 font-['Inter']">
          N
        </div>
      </div>
      
      {/* Etiqueta */}
      <div className="text-center mt-1">
        <span className="text-[9px] text-slate-500 font-['Inter'] font-medium">NORTH</span>
      </div>
    </div>
  );
}
