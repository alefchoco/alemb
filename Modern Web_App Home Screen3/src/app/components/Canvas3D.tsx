import { useEffect, useRef } from 'react';

interface Canvas3DProps {
  activeTool: string;
}

export function Canvas3D({ activeTool }: Canvas3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Dibujar vista 3D isométrica simple
    const drawIsometric = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = 150;

      // Dibujar edificio isométrico de ejemplo
      ctx.save();

      // Piso
      ctx.fillStyle = '#e2e8f0';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + size);
      ctx.lineTo(centerX - size * 1.5, centerY + size / 2);
      ctx.lineTo(centerX, centerY);
      ctx.lineTo(centerX + size * 1.5, centerY + size / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Pared izquierda
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.moveTo(centerX - size * 1.5, centerY + size / 2);
      ctx.lineTo(centerX - size * 1.5, centerY - size);
      ctx.lineTo(centerX, centerY - size * 1.5);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Pared derecha
      ctx.fillStyle = '#f1f5f9';
      ctx.beginPath();
      ctx.moveTo(centerX + size * 1.5, centerY + size / 2);
      ctx.lineTo(centerX + size * 1.5, centerY - size);
      ctx.lineTo(centerX, centerY - size * 1.5);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Ventanas
      const windowSize = 30;
      const windowGap = 20;
      
      ctx.fillStyle = '#60a5fa';
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1;
      
      // Ventanas en pared izquierda
      for (let i = 0; i < 2; i++) {
        const offsetY = centerY - size + i * (windowSize + windowGap);
        ctx.fillRect(
          centerX - size * 1.2,
          offsetY,
          windowSize,
          windowSize
        );
        ctx.strokeRect(
          centerX - size * 1.2,
          offsetY,
          windowSize,
          windowSize
        );
      }

      ctx.restore();

      // Información de herramienta activa
      ctx.fillStyle = '#1f2937';
      ctx.font = '14px sans-serif';
      ctx.fillText(`Herramienta: ${activeTool}`, 20, canvas.height - 20);
    };

    drawIsometric();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawIsometric();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTool]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ zIndex: 10 }}
    />
  );
}