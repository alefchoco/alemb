import { useEffect, useRef } from 'react';

interface CoordinateGridProps {
  gridSize?: number;
  showLabels?: boolean;
}

export function CoordinateGrid({ gridSize = 50, showLabels = true }: CoordinateGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrid();
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Estilo del grid tipo blueprint
      ctx.strokeStyle = '#D1D5DB';
      ctx.lineWidth = 0.5;

      // Líneas verticales
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

        // Etiquetas X
        if (showLabels && x > 0) {
          ctx.fillStyle = '#9CA3AF';
          ctx.font = '9px "Inter", sans-serif';
          ctx.fillText(x.toString(), x + 2, 12);
        }
      }

      // Líneas horizontales
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();

        // Etiquetas Y
        if (showLabels && y > 0) {
          ctx.fillStyle = '#9CA3AF';
          ctx.font = '9px "Inter", sans-serif';
          ctx.fillText(y.toString(), 2, y - 2);
        }
      }

      // Ejes principales (X e Y) - azul blueprint
      ctx.strokeStyle = '#60A5FA';
      ctx.lineWidth = 1;

      // Eje Y
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, canvas.height);
      ctx.stroke();

      // Eje X
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(canvas.width, 0);
      ctx.stroke();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gridSize, showLabels]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}