declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp';

interface Window {
  __WB_MANIFEST: any[];
}
interface ServiceWorkerGlobalScope {
  __WB_MANIFEST: any[];
}
declare var self: ServiceWorkerGlobalScope;
