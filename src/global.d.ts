// src/global.d.ts
declare global {
  interface Window {
    api: {
      sendFollowUp: (msg: string) => void;
      hide: () => void;
      onTriggerScan: (cb: () => void) => void;
      onResult: (cb: (data: unknown) => void) => void;
      copyText: (text: string) => void;
      retry: () => void;
      
      // --- NEW PHASE 2/3 EVENT LISTENERS ---
      onScanStatus: (cb: (s: string) => void) => void;
      onScanContext: (cb: (data: { mode: string; context: string }) => void) => void;
      onAiChunk: (cb: (chunk?: string) => void) => void; // Optional chunk if you need it later
      onAiDone: (cb: () => void) => void;
      onAiError: (cb: (err?: unknown) => void) => void;
    };
  }
}

export {};