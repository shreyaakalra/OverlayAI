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
      onScanStatus: (cb: (s: string) => void) => void;
      onScanContext: (cb: (data: { mode: string; context: string }) => void) => void;
      onAiChunk: (cb: (chunk?: string) => void) => void;
      onAiDone: (cb: () => void) => void;
      onAiError: (cb: (err?: unknown) => void) => void;
      removeAllListeners: () => void;
    };
  }
}
export {};