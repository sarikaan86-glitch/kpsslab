import React, { useRef, useState, useEffect } from 'react';
import { X, Trash2, Undo, PenTool, Eraser } from 'lucide-react';

interface ScratchpadModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionNumber: number;
}

export const ScratchpadModal: React.FC<ScratchpadModalProps> = ({
  isOpen,
  onClose,
  questionNumber,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#1D1D1F');
  const [lineWidth, setLineWidth] = useState(2);
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to match display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw initial grid
    drawGrid(ctx, rect.width, rect.height);
    saveState();
  }, [isOpen]);

  const drawGrid = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);

    // Subtle math graph paper grid
    ctx.strokeStyle = '#F0F0F2';
    ctx.lineWidth = 1;
    const step = 20;

    for (let x = 0; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-10), data]);
  };

  const undo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const prev = newHistory[newHistory.length - 1];
    if (prev) {
      ctx.putImageData(prev, 0, 0);
      setHistory(newHistory);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    drawGrid(ctx, rect.width, rect.height);
    saveState();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.strokeStyle = isEraser ? '#FFFFFF' : color;
    ctx.lineWidth = isEraser ? 16 : lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col w-full max-w-3xl h-[80vh] bg-white rounded-2xl shadow-2xl border border-[#D2D2D7] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#E5E5EA] bg-[#FBFBFD]">
          <div className="flex items-center gap-2">
            <PenTool className="w-4 h-4 text-[#0071E3]" />
            <h3 className="text-sm font-bold text-[#1D1D1F]">
              Karalama Tahtası · Soru {questionNumber}
            </h3>
          </div>

          {/* Tools */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsEraser(false)}
              className={`p-1.5 rounded-lg border transition-colors ${
                !isEraser
                  ? 'bg-blue-50 text-[#0071E3] border-blue-200'
                  : 'text-[#86868B] border-transparent hover:bg-slate-100'
              }`}
              title="Kalem"
            >
              <PenTool className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsEraser(true)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isEraser
                  ? 'bg-blue-50 text-[#0071E3] border-blue-200'
                  : 'text-[#86868B] border-transparent hover:bg-slate-100'
              }`}
              title="Silgi"
            >
              <Eraser className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex items-center gap-1 border-l border-r border-[#E5E5EA] px-2">
              {['#1D1D1F', '#0071E3', '#34C759', '#FF3B30'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setColor(c);
                    setIsEraser(false);
                  }}
                  className={`w-4 h-4 rounded-full transition-transform ${
                    color === c && !isEraser ? 'scale-125 ring-2 ring-offset-1 ring-slate-400' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={undo}
              className="p-1.5 text-[#86868B] hover:text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F7]"
              title="Geri Al"
            >
              <Undo className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={clearCanvas}
              className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50"
              title="Temizle"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#86868B] hover:text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F7] ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative bg-white touch-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-2.5 border-t border-[#E5E5EA] bg-[#FBFBFD] text-xs text-[#86868B]">
          <span>Matematik işlemleri veya soru notları için karalama yapabilirsiniz.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 text-xs font-semibold text-white bg-[#0071E3] hover:bg-[#0077ED] rounded-lg transition-colors"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};
