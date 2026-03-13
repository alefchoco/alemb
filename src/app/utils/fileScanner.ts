// Real File Scanner using File System Access API
export interface ScanResult {
  name: string;
  path: string;
  size: number;
  type: string;
  hash: string;
  isSuspicious: boolean;
  threatLevel: 'BAJO' | 'MEDIO' | 'ALTO' | 'CRÍTICO';
  reason: string;
}

// Calculate SHA-256 hash of file
async function calculateHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Check if file is suspicious based on heuristics
function analyzeThreat(file: File, hash: string): { isSuspicious: boolean; threatLevel: ScanResult['threatLevel']; reason: string } {
  const suspiciousExtensions = ['.exe', '.bat', '.cmd', '.vbs', '.js', '.jar', '.scr', '.com', '.pif'];
  const highRiskExtensions = ['.dll', '.sys', '.drv'];
  const fileName = file.name.toLowerCase();
  
  // Check for double extensions (file.pdf.exe)
  const extensionCount = (fileName.match(/\./g) || []).length;
  if (extensionCount > 1 && suspiciousExtensions.some(ext => fileName.endsWith(ext))) {
    return { isSuspicious: true, threatLevel: 'CRÍTICO', reason: 'Doble extensión detectada (técnica de ocultación)' };
  }
  
  // Check for executable files
  if (suspiciousExtensions.some(ext => fileName.endsWith(ext))) {
    return { isSuspicious: true, threatLevel: 'ALTO', reason: 'Archivo ejecutable detectado' };
  }
  
  // Check for system files in wrong location
  if (highRiskExtensions.some(ext => fileName.endsWith(ext))) {
    return { isSuspicious: true, threatLevel: 'MEDIO', reason: 'Archivo de sistema detectado' };
  }
  
  // Check for suspicious names
  const suspiciousNames = ['system32', 'winlogon', 'svchost', 'update', 'install', 'setup'];
  if (suspiciousNames.some(name => fileName.includes(name)) && suspiciousExtensions.some(ext => fileName.endsWith(ext))) {
    return { isSuspicious: true, threatLevel: 'CRÍTICO', reason: 'Nombre sospechoso imitando archivo del sistema' };
  }
  
  // Check file size anomalies
  if (file.size < 100 && suspiciousExtensions.some(ext => fileName.endsWith(ext))) {
    return { isSuspicious: true, threatLevel: 'MEDIO', reason: 'Tamaño de archivo anómalo' };
  }
  
  // Check for very large executables
  if (file.size > 100 * 1024 * 1024 && suspiciousExtensions.some(ext => fileName.endsWith(ext))) {
    return { isSuspicious: true, threatLevel: 'ALTO', reason: 'Ejecutable de tamaño inusual (>100MB)' };
  }
  
  return { isSuspicious: false, threatLevel: 'BAJO', reason: 'Archivo seguro' };
}

// Scan a single file
export async function scanFile(file: File, relativePath: string = ''): Promise<ScanResult> {
  const hash = await calculateHash(file);
  const { isSuspicious, threatLevel, reason } = analyzeThreat(file, hash);
  
  return {
    name: file.name,
    path: relativePath || file.name,
    size: file.size,
    type: file.type || 'unknown',
    hash,
    isSuspicious,
    threatLevel,
    reason
  };
}

// Scan directory recursively
export async function scanDirectory(
  dirHandle: FileSystemDirectoryHandle,
  onProgress?: (current: number, total: number, currentFile: string) => void,
  onThreatFound?: (result: ScanResult) => void,
  basePath: string = ''
): Promise<ScanResult[]> {
  const results: ScanResult[] = [];
  let fileCount = 0;
  
  async function processEntry(entry: FileSystemHandle, path: string) {
    if (entry.kind === 'file') {
      const fileHandle = entry as FileSystemFileHandle;
      const file = await fileHandle.getFile();
      fileCount++;
      
      const fullPath = path ? `${path}/${file.name}` : file.name;
      if (onProgress) {
        onProgress(fileCount, fileCount, fullPath);
      }
      
      const result = await scanFile(file, fullPath);
      results.push(result);
      
      if (result.isSuspicious && onThreatFound) {
        onThreatFound(result);
      }
    } else if (entry.kind === 'directory') {
      const dirHandle = entry as FileSystemDirectoryHandle;
      const newPath = path ? `${path}/${entry.name}` : entry.name;
      
      try {
        for await (const subEntry of dirHandle.values()) {
          await processEntry(subEntry, newPath);
        }
      } catch (error) {
        console.warn(`No se pudo acceder a: ${newPath}`, error);
      }
    }
  }
  
  try {
    for await (const entry of dirHandle.values()) {
      await processEntry(entry, basePath);
    }
  } catch (error) {
    console.error('Error scanning directory:', error);
  }
  
  return results;
}

// Request directory access from user
export async function requestDirectoryAccess(): Promise<FileSystemDirectoryHandle | null> {
  try {
    // @ts-ignore - File System Access API
    const dirHandle = await window.showDirectoryPicker({
      mode: 'read',
      startIn: 'downloads'
    });
    return dirHandle;
  } catch (error) {
    console.error('User cancelled directory selection:', error);
    return null;
  }
}

// Check if File System Access API is supported
export function isFileSystemAccessSupported(): boolean {
  return 'showDirectoryPicker' in window;
}
