import { Upload, FileText, FolderOpen } from 'lucide-react';
import { useState } from 'react';

interface FileUploaderProps {
  onClose: () => void;
}

export function FileUploader({ onClose }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log('Archivo cargado:', e.dataTransfer.files[0].name);
      onClose();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log('Archivo seleccionado:', e.target.files[0].name);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.2)] max-w-2xl w-full p-8 border border-gray-200/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-800 font-['Inter']">Upload Files</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        {/* Zona de arrastrar y soltar */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-[8px] p-12 text-center transition-all ${
            dragActive
              ? 'border-blue-500 bg-blue-50/50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <Upload className={`w-14 h-14 mx-auto mb-4 ${
            dragActive ? 'text-blue-500' : 'text-slate-400'
          }`} strokeWidth={1.5} />
          
          <p className="text-base font-medium text-slate-700 mb-2 font-['Inter']">
            Drag your files here
          </p>
          <p className="text-sm text-slate-500 mb-4 font-['Inter']">
            or click to browse
          </p>

          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileInput}
            accept=".dwg,.dxf,.rvt,.pdf,.png,.jpg,.jpeg,.shp,.kml"
            multiple
          />
          
          <label
            htmlFor="file-upload"
            className="inline-block bg-slate-700 text-white px-6 py-2.5 rounded-[8px] cursor-pointer hover:bg-slate-800 transition-colors text-sm font-medium font-['Inter']"
          >
            Select Files
          </label>
        </div>

        {/* Formatos soportados */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-[8px] border border-gray-200/30">
            <FileText className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
            <div>
              <div className="font-medium text-xs text-slate-800 font-['Inter']">CAD Files</div>
              <div className="text-[10px] text-slate-500 font-['Inter']">.dwg, .dxf</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-[8px] border border-gray-200/30">
            <FolderOpen className="w-4 h-4 text-green-600" strokeWidth={1.5} />
            <div>
              <div className="font-medium text-xs text-slate-800 font-['Inter']">Revit</div>
              <div className="text-[10px] text-slate-500 font-['Inter']">.rvt</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-[8px] border border-gray-200/30">
            <FileText className="w-4 h-4 text-red-600" strokeWidth={1.5} />
            <div>
              <div className="font-medium text-xs text-slate-800 font-['Inter']">Documents</div>
              <div className="text-[10px] text-slate-500 font-['Inter']">.pdf</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-[8px] border border-gray-200/30">
            <FileText className="w-4 h-4 text-purple-600" strokeWidth={1.5} />
            <div>
              <div className="font-medium text-xs text-slate-800 font-['Inter']">Terrain Data</div>
              <div className="text-[10px] text-slate-500 font-['Inter']">.shp, .kml</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}