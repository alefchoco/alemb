import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Shape {
  type: string;
  start: Point;
  end: Point;
  color?: string;
}

interface Canvas2DProps {
  activeTool: string;
  pdfUrl?: string;
}

export function Canvas2D({ activeTool, pdfUrl }: Canvas2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [currentPoint, setCurrentPoint] = useState<Point | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [pdfImage, setPdfImage] = useState<HTMLImageElement | null>(null);

  // Cargar PDF como imagen de fondo
  useEffect(() => {
    if (pdfUrl) {
      const img = new Image();
      img.onload = () => {
        setPdfImage(img);
      };
      img.src = pdfUrl;
    }
  }, [pdfUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      redrawCanvas();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    redrawCanvas();
  }, [shapes, currentPoint, startPoint, isDrawing]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar PDF de fondo si existe
    if (pdfImage) {
      ctx.globalAlpha = 0.7;
      const scale = Math.min(
        canvas.width / pdfImage.width,
        canvas.height / pdfImage.height
      ) * 0.8;
      const x = (canvas.width - pdfImage.width * scale) / 2;
      const y = (canvas.height - pdfImage.height * scale) / 2;
      ctx.drawImage(pdfImage, x, y, pdfImage.width * scale, pdfImage.height * scale);
      ctx.globalAlpha = 1;
    }

    // Dibujar formas guardadas
    shapes.forEach((shape) => {
      ctx.strokeStyle = shape.color || '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      if (shape.type === 'line') {
        ctx.moveTo(shape.start.x, shape.start.y);
        ctx.lineTo(shape.end.x, shape.end.y);
      } else if (shape.type === 'rectangle') {
        const width = shape.end.x - shape.start.x;
        const height = shape.end.y - shape.start.y;
        ctx.rect(shape.start.x, shape.start.y, width, height);
      } else if (shape.type === 'circle') {
        const radius = Math.sqrt(
          Math.pow(shape.end.x - shape.start.x, 2) + 
          Math.pow(shape.end.y - shape.start.y, 2)
        );
        ctx.arc(shape.start.x, shape.start.y, radius, 0, 2 * Math.PI);
      }

      ctx.stroke();

      // Dibujar puntos de control para edición
      if (shape.type === 'line' || shape.type === 'rectangle') {
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(shape.start.x - 3, shape.start.y - 3, 6, 6);
        ctx.fillRect(shape.end.x - 3, shape.end.y - 3, 6, 6);
      }
    });

    // Dibujar forma temporal
    if (isDrawing && startPoint && currentPoint) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();

      if (activeTool === 'line') {
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        
        // Mostrar longitud de la línea
        const length = Math.sqrt(
          Math.pow(currentPoint.x - startPoint.x, 2) + 
          Math.pow(currentPoint.y - startPoint.y, 2)
        );
        const midX = (startPoint.x + currentPoint.x) / 2;
        const midY = (startPoint.y + currentPoint.y) / 2;
        
        ctx.setLineDash([]);
        ctx.fillStyle = '#3b82f6';
        ctx.font = "11px 'Inter'";
        ctx.fillText(length.toFixed(1), midX + 10, midY - 10);
        ctx.setLineDash([5, 5]);
      } else if (activeTool === 'rectangle') {
        const width = currentPoint.x - startPoint.x;
        const height = currentPoint.y - startPoint.y;
        ctx.rect(startPoint.x, startPoint.y, width, height);
        
        // Mostrar dimensiones
        ctx.setLineDash([]);
        ctx.fillStyle = '#3b82f6';
        ctx.font = "11px 'Inter'";
        ctx.fillText(`${Math.abs(width).toFixed(0)} × ${Math.abs(height).toFixed(0)}`, 
          startPoint.x + width / 2 - 20, startPoint.y - 10);
        ctx.setLineDash([5, 5]);
      } else if (activeTool === 'circle') {
        const radius = Math.sqrt(
          Math.pow(currentPoint.x - startPoint.x, 2) + 
          Math.pow(currentPoint.y - startPoint.y, 2)
        );
        ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
        
        // Mostrar radio
        ctx.setLineDash([]);
        ctx.fillStyle = '#3b82f6';
        ctx.font = "11px 'Inter'";
        ctx.fillText(`R: ${radius.toFixed(1)}`, startPoint.x + radius + 10, startPoint.y);
        ctx.setLineDash([5, 5]);
      }

      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === 'select' || activeTool === 'move') return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setStartPoint(point);
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setCurrentPoint(point);
  };

  const handleMouseUp = () => {
    if (isDrawing && startPoint && currentPoint) {
      const newShape: Shape = {
        type: activeTool,
        start: startPoint,
        end: currentPoint,
        color: '#475569',
      };

      setShapes([...shapes, newShape]);
    }

    setIsDrawing(false);
    setStartPoint(null);
    setCurrentPoint(null);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="absolute inset-0 cursor-crosshair"
      style={{ zIndex: 10 }}
    />
  );
}