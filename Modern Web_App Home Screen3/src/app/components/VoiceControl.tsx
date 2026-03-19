import { Mic, MicOff, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { cn } from './ui/utils';

export function VoiceControl() {
  const [isListening, setIsListening] = useState(false);
  const [editMode, setEditMode] = useState<'edit' | 'view'>('edit');
  const [lastCommand, setLastCommand] = useState('');

  const toggleVoiceControl = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      console.log('Iniciando reconocimiento de voz...');
      setLastCommand('Listening...');
    } else {
      setLastCommand('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      {/* Command Input - Voice */}
      <div className="bg-white/60 backdrop-blur-xl rounded-[8px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] px-4 py-3 flex items-center gap-3 border border-gray-200/50">
        <button
          onClick={toggleVoiceControl}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-[6px] transition-all font-['Inter']",
            isListening
              ? "bg-red-500 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          )}
        >
          <span className="text-xs font-semibold">Ctrl</span>
          {isListening ? (
            <Mic className="w-4 h-4" strokeWidth={1.5} />
          ) : (
            <MicOff className="w-4 h-4" strokeWidth={1.5} />
          )}
        </button>

        {isListening && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <div className="w-0.5 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '100ms' }} />
              <div className="w-0.5 h-3.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
            </div>
            <span className="text-xs text-slate-600 font-['Inter']">{lastCommand}</span>
          </div>
        )}
      </div>

      {/* Edit Mode Toggle */}
      <div className="bg-white/60 backdrop-blur-xl rounded-[8px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] px-4 py-2.5 flex items-center gap-3 border border-gray-200/50">
        <button
          onClick={() => setEditMode(editMode === 'edit' ? 'view' : 'edit')}
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-all font-['Inter']",
            editMode === 'edit' ? "text-slate-700" : "text-slate-400"
          )}
        >
          {editMode === 'edit' ? (
            <Eye className="w-4 h-4" strokeWidth={1.5} />
          ) : (
            <EyeOff className="w-4 h-4" strokeWidth={1.5} />
          )}
          <span className="text-xs">{editMode === 'edit' ? 'Edit Mode' : 'View Only'}</span>
        </button>
        
        {/* Toggle switch */}
        <div 
          onClick={() => setEditMode(editMode === 'edit' ? 'view' : 'edit')}
          className={cn(
            "w-10 h-5 rounded-full transition-colors relative cursor-pointer",
            editMode === 'edit' ? "bg-blue-500" : "bg-gray-300"
          )}
        >
          <div className={cn(
            "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
            editMode === 'edit' ? "translate-x-5" : "translate-x-0.5"
          )} />
        </div>
      </div>
    </div>
  );
}