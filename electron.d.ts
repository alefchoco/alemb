// Tipos globales para Electron API
interface ElectronAPI {
  // Sistema
  getSystemInfo: () => Promise<SystemInfo>;
  platform: string;
  isElectron: boolean;

  // Archivos
  scanFile: (filePath: string) => Promise<ScanResult>;
  selectFile: () => Promise<string | null>;

  // Carpetas
  scanFolder: (folderPath: string) => Promise<FolderScanResult>;
  selectFolder: () => Promise<string | null>;

  // Red
  getNetworkInfo: () => Promise<NetworkInfoResult>;

  // Cuarentena
  quarantineFile: (filePath: string) => Promise<QuarantineResult>;
  deleteQuarantinedFile: (filePath: string) => Promise<DeleteResult>;
  restoreQuarantinedFile: (quarantinePath: string, originalPath: string) => Promise<RestoreResult>;

  // Reportes
  saveReport: (reportData: any) => Promise<SaveReportResult>;
  getSavedReports: () => Promise<GetReportsResult>;
  readReport: (filePath: string) => Promise<ReadReportResult>;

  // Notificaciones
  showNotification: (options: NotificationOptions) => Promise<NotificationResult>;
}

interface SystemInfo {
  platform: string;
  arch: string;
  hostname: string;
  totalMemory: number;
  freeMemory: number;
  cpus: number;
  uptime: number;
  homeDir: string;
  tmpDir: string;
  version: any;
}

interface ScanResult {
  success: boolean;
  fileName?: string;
  fileSize?: number;
  filePath?: string;
  scanTime?: number;
  threats?: string[];
  error?: string;
}

interface FolderScanResult {
  success: boolean;
  folderPath?: string;
  filesCount?: number;
  scanTime?: number;
  threats?: number;
  error?: string;
}

interface NetworkInfoResult {
  success: boolean;
  interfaces?: Array<{
    interface: string;
    address: string;
    netmask: string;
    mac: string;
  }>;
  error?: string;
}

interface QuarantineResult {
  success: boolean;
  originalPath?: string;
  quarantinePath?: string;
  error?: string;
}

interface DeleteResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

interface RestoreResult {
  success: boolean;
  restoredPath?: string;
  error?: string;
}

interface SaveReportResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

interface GetReportsResult {
  success: boolean;
  reports?: Array<{
    fileName: string;
    filePath: string;
    createdAt: Date;
    size: number;
  }>;
  error?: string;
}

interface ReadReportResult {
  success: boolean;
  data?: any;
  error?: string;
}

interface NotificationOptions {
  title: string;
  body: string;
}

interface NotificationResult {
  success: boolean;
  error?: string;
}

// Declarar en el objeto window
declare global {
  interface Window {
    electronAPI?: ElectronAPI;
    isElectron?: boolean;
  }
}

export {};
