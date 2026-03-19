import { 
  MousePointer2, 
  Square, 
  Circle, 
  Minus, 
  MoveHorizontal,
  Copy,
  RotateCw,
  Scissors,
  Type,
  Ruler,
  Layers,
  Box,
  Plane,
  Slice,
  Move3d,
  Mountain,
  FolderOpen
} from 'lucide-react';
import { cn } from './ui/utils';

interface SidebarProps {
  mode: '2D' | '3D' | 'VR';
  activeTool: string;
  onToolSelect: (tool: string) => void;
}

export function Sidebar({ mode, activeTool, onToolSelect }: SidebarProps) {
  const tools2D = [
    { id: 'select', icon: MousePointer2, label: 'Seleccionar' },
    { id: 'line', icon: Minus, label: 'Línea' },
    { id: 'rectangle', icon: Square, label: 'Rectángulo' },
    { id: 'circle', icon: Circle, label: 'Círculo' },
    { id: 'move', icon: MoveHorizontal, label: 'Mover' },
    { id: 'copy', icon: Copy, label: 'Copiar' },
    { id: 'rotate', icon: RotateCw, label: 'Rotar' },
    { id: 'layers', icon: Layers, label: 'Capas' },
    { id: 'terrain', icon: Mountain, label: 'Terreno' },
    { id: 'folders', icon: FolderOpen, label: 'Documentos' },
  ];

  const tools3D = [
    { id: 'select', icon: MousePointer2, label: 'Seleccionar' },
    { id: 'extrude', icon: Box, label: 'Extruir' },
    { id: 'wall', icon: Plane, label: 'Pared' },
    { id: 'slice', icon: Slice, label: 'Cortar' },
    { id: 'move3d', icon: Move3d, label: 'Mover 3D' },
    { id: 'rotate', icon: RotateCw, label: 'Rotar' },
    { id: 'curve', icon: Circle, label: 'Curvar Pared' },
    { id: 'guides', icon: Ruler, label: 'Puntos Guía' },
    { id: 'layers', icon: Layers, label: 'Capas' },
  ];

  const tools = mode === '2D' ? tools2D : tools3D;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 bg-slate-800/90 backdrop-blur-xl rounded-[8px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex flex-col items-center py-3 px-2 gap-1 z-30 border border-slate-700/50">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeTool === tool.id;
        
        return (
          <button
            key={tool.id}
            onClick={() => onToolSelect(tool.id)}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-[8px] transition-all group relative",
              isActive 
                ? "bg-blue-500 text-white shadow-md" 
                : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
            )}
            title={tool.label}
          >
            <Icon className="w-4 h-4" strokeWidth={1.5} />
            
            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-[6px] opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity shadow-lg font-['Inter']">
              {tool.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}