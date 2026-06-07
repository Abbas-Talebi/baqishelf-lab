import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function MediaChart({ labels, values }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // گرادیان خطی افقی (از چپ به راست)
    const gradient = ctx.createLinearGradient(0, 0, canvasRef.current.clientWidth, 0);
    gradient.addColorStop(0, "#8b5cf6"); // بنفش
    gradient.addColorStop(1, "#3b82f6"); // آبی

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: gradient,
            borderRadius: 12,
            barThickness: 28,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#1e1e2f",
            titleColor: "#ffffff",
            bodyColor: "#cccccc",
            callbacks: {
              label: (context) => `${context.raw}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#ccc" },
          },
          y: {
            grid: { display: false },
            ticks: { color: "#ccc", font: { size: 12 } },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [labels, values]);

  return (
    <div style={{ height: "320px", width: "100%" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}