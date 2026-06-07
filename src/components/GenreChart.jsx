import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function GenreChart({ labels, values }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // تابع تولید رنگ‌های متمایز با استفاده از فضای HSL
  const generateColors = (count, saturation = 70, lightness = 60) => {
    return Array.from({ length: count }, (_, i) => {
      const hue = (i * 360) / count;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    });
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // تولید رنگ به تعداد داده‌ها (اگر بیش از ۶۰ باشد، همچنان پویا می‌ماند)
    const backgroundColors = generateColors(values.length, 75, 55);

    // تخریب چارت قبلی در صورت وجود
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: backgroundColors,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "55%",
        plugins: {
          legend: {
            position: "right",
            labels: {
              padding: 20,
              font: { size: 12 },
              boxWidth: 14,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percent = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percent}%)`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [labels, values]); // وابستگی‌ها: با تغییر داده‌ها، چارت بازسازی می‌شود

  return (
    <div
      style={{
        maxWidth: "900px",
        height: "420px",
        margin: "0 auto",
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}