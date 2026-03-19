import { Compass, Navigation } from 'lucide-react';
import { useState } from 'react';

export function VRControls() {
  const [teleportMode, setTeleportMode] = useState(false);

  return (
    <>
      {/* Barra inferior VR - Navegación */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-xl rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.2)] px-6 py-3 z-40 border border-slate-700/50">
        <div className="flex items-center gap-6">
          {/* Teletransporte */}
          <button
            onClick={() => setTeleportMode(!teleportMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-['Inter'] text-sm ${
              teleportMode
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Navigation className="w-4 h-4" strokeWidth={1.5} />
            <span>Teleport</span>
          </button>

          {/* Compass */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700/50 text-slate-300 hover:bg-slate-600 transition-all font-['Inter'] text-sm">
            <Compass className="w-4 h-4" strokeWidth={1.5} />
            <span>Compass</span>
          </button>
        </div>
      </div>

      {/* Indicador central VR */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
        <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-full p-6">
          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
        </div>
      </div>
    </>
  );
}