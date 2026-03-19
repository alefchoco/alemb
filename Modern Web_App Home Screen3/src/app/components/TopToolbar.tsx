import { Box, Boxes, Glasses } from 'lucide-react';
import { cn } from './ui/utils';

interface TopToolbarProps {
  mode: '2D' | '3D' | 'VR';
  onModeChange: (mode: '2D' | '3D' | 'VR') => void;
}

export function TopToolbar({ mode, onModeChange }: TopToolbarProps) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-white/60 backdrop-blur-xl rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] px-2 py-2 flex items-center gap-2 z-40 border border-gray-200/50">
      {/* 2D Floor Plan */}
      <button
        onClick={() => onModeChange('2D')}
        className={cn(
          "flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-medium text-sm font-['Inter']",
          mode === '2D'
            ? "bg-slate-700 text-white shadow-md"
            : "text-slate-600 hover:bg-gray-100/80"
        )}
      >
        <Box className="w-4 h-4" strokeWidth={1.5} />
        <span>2D Floor Plan</span>
      </button>

      {/* VR Toggle - centro */}
      <div className="px-3">
        <button
          onClick={() => onModeChange('VR')}
          className={cn(
            "relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all font-medium text-sm font-['Inter']",
            mode === 'VR'
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 text-slate-600 hover:bg-gray-200/80"
          )}
        >
          <Glasses className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-xs font-semibold">{mode === 'VR' ? 'ON' : 'OFF'}</span>
          
          {/* Switch visual */}
          <div className={cn(
            "ml-1 w-8 h-4 rounded-full transition-colors relative",
            mode === 'VR' ? "bg-blue-400" : "bg-gray-300"
          )}>
            <div className={cn(
              "absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform",
              mode === 'VR' ? "translate-x-4" : "translate-x-0.5"
            )} />
          </div>
        </button>
      </div>

      {/* 3D Elevation */}
      <button
        onClick={() => onModeChange('3D')}
        className={cn(
          "flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-medium text-sm font-['Inter']",
          mode === '3D'
            ? "bg-slate-700 text-white shadow-md"
            : "text-slate-600 hover:bg-gray-100/80"
        )}
      >
        <Boxes className="w-4 h-4" strokeWidth={1.5} />
        <span>3D Elevation</span>
      </button>
    </div>
  );
}