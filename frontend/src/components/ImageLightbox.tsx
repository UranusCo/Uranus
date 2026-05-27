import { useChatStore } from "../store/useChatStore";
import { X, Download, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { useState } from "react";

const ImageLightbox = () => {
  const { lightboxImage, setLightboxImage } = useChatStore();
  const [zoom, setZoom] = useState(1);

  if (!lightboxImage) return null;

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = lightboxImage;
    a.download = `blink-image-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLightboxImage(null)}
            className="size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X size={24} />
          </button>
          <span className="text-white/60 text-sm font-medium">Blink Image Viewer</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setZoom(prev => Math.max(0.5, prev - 0.25))}
            className="size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ZoomOut size={20} />
          </button>
          <button 
            onClick={() => setZoom(1)}
            className="px-3 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button 
            onClick={() => setZoom(prev => Math.min(3, prev + 0.25))}
            className="size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ZoomIn size={20} />
          </button>
          <div className="w-px h-6 bg-white/10 mx-2" />
          <button 
            onClick={handleDownload}
            className="h-10 px-4 rounded-full bg-primary text-white flex items-center gap-2 hover:bg-primary/90 transition-colors font-bold text-sm shadow-xl"
          >
            <Download size={18} />
            Download
          </button>
        </div>
      </div>

      <div 
        className="size-full flex items-center justify-center overflow-auto p-8 cursor-zoom-out"
        onClick={() => setLightboxImage(null)}
      >
        <img 
          src={lightboxImage} 
          alt="" 
          className="max-w-full max-h-full object-contain transition-transform duration-200 shadow-2xl rounded-sm"
          style={{ transform: `scale(${zoom})` }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest">
        <span>Scroll to zoom</span>
        <div className="w-1 h-1 rounded-full bg-white/20" />
        <span>Click outside to close</span>
      </div>
    </div>
  );
};

export default ImageLightbox;
