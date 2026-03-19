import { useState } from 'react';
import { CoordinateGrid } from './components/CoordinateGrid';
import { Sidebar } from './components/Sidebar';
import { TopToolbar } from './components/TopToolbar';
import { FloatingButtons } from './components/FloatingButtons';
import { VoiceControl } from './components/VoiceControl';
import { Canvas2D } from './components/Canvas2D';
import { Canvas3D } from './components/Canvas3D';
import { VRControls } from './components/VRControls';
import { FileUploader } from './components/FileUploader';
import { NorthSymbol } from './components/NorthSymbol';
import { CoordinateDisplay } from './components/CoordinateDisplay';
import { PDFOverlay } from './components/PDFOverlay';
import { InstallPrompt } from './components/InstallPrompt';

type Mode = '2D' | '3D' | 'VR';

export default function App() {
  const [mode, setMode] = useState<Mode>('2D');
  const [activeTool, setActiveTool] = useState('select');
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#F5F5F7]">
      {/* Fondo con coordenadas */}
      <CoordinateGrid />

      {/* Símbolo de Norte */}
      <NorthSymbol />

      {/* PDF Overlay Control */}
      {mode === '2D' && (
        <PDFOverlay 
          onPdfLoad={setPdfUrl}
          onClear={() => setPdfUrl('')}
          hasPdf={!!pdfUrl}
        />
      )}

      {/* Barra lateral de herramientas */}
      <Sidebar 
        mode={mode} 
        activeTool={activeTool} 
        onToolSelect={setActiveTool}
      />

      {/* Barra superior de modos */}
      <TopToolbar 
        mode={mode} 
        onModeChange={setMode}
      />

      {/* Botones flotantes */}
      <FloatingButtons />

      {/* Canvas de trabajo */}
      <div className="h-full">
        {mode === '2D' && <Canvas2D activeTool={activeTool} pdfUrl={pdfUrl} />}
        {mode === '3D' && <Canvas3D activeTool={activeTool} />}
        {mode === 'VR' && (
          <>
            <Canvas3D activeTool={activeTool} />
            <VRControls />
          </>
        )}
      </div>

      {/* Display de coordenadas del cursor */}
      <CoordinateDisplay />

      {/* Control de voz */}
      <VoiceControl />

      {/* Prompt de instalación PWA */}
      <InstallPrompt />

      {/* Modal de carga de archivos */}
      {showFileUploader && (
        <FileUploader onClose={() => setShowFileUploader(false)} />
      )}
    </div>
  );
}