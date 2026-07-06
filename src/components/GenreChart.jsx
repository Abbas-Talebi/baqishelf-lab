import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function GenreChart({ labels, values }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // تولید رنگ‌های با حداکثر تضاد با استفاده از نسبت طلایی و تغییر اشباع/روشنایی
  const generateColors = (count, labelsArray) => {
    if (count === 0) return [];

    const colors = [];
    const goldenRatio = 0.618033988749895; // نسبت طلایی
    let nonGrayIndex = 0;

    for (let i = 0; i < count; i++) {
      if (labelsArray[i] === "سایرین") {
        colors.push(`hsl(0, 0%, 30%)`); // خاکستری ثابت
      } else {
        // پخش Hue با نسبت طلایی (فاصله‌ی ۱۳۷.۵ درجه)
        const hue = (nonGrayIndex * 360 * goldenRatio) % 360;
        
        // تغییر اشباع و روشنایی برای تضاد بیشتر (بین ۶۵ تا ۸۵ برای اشباع و ۵۰ تا ۷۰ برای روشنایی)
        const saturation = 70 + (nonGrayIndex % 3) * 5; // 70,75,80
        const lightness = 50 + (nonGrayIndex % 4) * 5; // 50,55,60,65
        
        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        nonGrayIndex++;
      }
    }
    return colors;
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const backgroundColors = generateColors(values.length, labels);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: backgroundColors,
          borderWidth: 2,
          borderColor: '#111'
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%",
        layout: {
          padding: { bottom: 10 }
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: '#ccc',
              padding: 15,
              font: { size: 11, family: 'Vazirmatn' },
              usePointStyle: true,
              boxWidth: 8
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            titleFont: { family: 'Vazirmatn' },
            bodyFont: { family: 'Vazirmatn' },
            callbacks: {
              label: (context) => {
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percent = ((value / total) * 100).toFixed(1);
                return ` ${value} اثر (${percent}%)`;
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
  }, [labels, values]);

  return (
    <div style={{ width: "100%", height: "280px", margin: "0 auto" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}