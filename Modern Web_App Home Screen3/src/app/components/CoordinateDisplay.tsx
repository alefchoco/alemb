import { useEffect, useState } from 'react';

interface Coordinates {
  x: number;
  y: number;
}

export function CoordinateDisplay() {
  const [coords, setCoords] = useState<Coordinates>({ x: 0, y: 0 });
  const [orthoCoords, setOrthoCoords] = useState<Coordinates>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Coordenadas de pantalla
      setCoords({ x: e.clientX, y: e.clientY });
      
      // Coordenadas ortogonales del plano infinito
      // Convertimos a un sistema de coordenadas centrado
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const orthoX = Math.round(e.clientX - centerX);
      const orthoY = Math.round(centerY - e.clientY); // Invertir Y para que sea positivo arriba
      
      setOrthoCoords({ x: orthoX, y: orthoY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 bg-slate-800/90 backdrop-blur-xl rounded-[8px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] px-4 py-3 z-40 border border-slate-700/50">
      <div className="flex flex-col gap-1.5">
        {/* Coordenadas Ortogonales */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-['Inter'] font-medium">X:</span>
            <span className="text-sm text-white font-mono font-semibold min-w-[60px]">
              {orthoCoords.x.toFixed(0)}
            </span>
          </div>
          
          <div className="w-px h-4 bg-slate-600" />
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-['Inter'] font-medium">Y:</span>
            <span className="text-sm text-white font-mono font-semibold min-w-[60px]">
              {orthoCoords.y.toFixed(0)}
            </span>
          </div>
        </div>
        
        {/* Separador */}
        <div className="w-full h-px bg-slate-700" />
        
        {/* Coordenadas de Pantalla */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-slate-500 font-['Inter']">Screen:</span>
          <span className="text-[10px] text-slate-400 font-mono">
            ({coords.x}, {coords.y})
          </span>
        </div>
      </div>
    </div>
  );
}
