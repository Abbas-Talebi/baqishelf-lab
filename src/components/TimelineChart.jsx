import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function TimelineChart({
  labels,
  values,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const chart = new Chart(
      canvasRef.current,
      {
        type: "line",

        data: {
          labels,

          datasets: [
            {
				
				borderColor:
  "#10b981",

backgroundColor:
  "rgba(16,185,129,.15)",
				
              label:
                "آثار ثبت شده",

              data: values,

              fill: true,

              tension: 0.4,

              pointRadius: 5,

              pointHoverRadius: 8,

              borderWidth: 3,
            },
          ],
        },

        options: {
          responsive: true,

          maintainAspectRatio: false,

          plugins: {
            legend: {
              display: false,
            },

            tooltip: {
              callbacks: {
                label: (context) =>
                  `${context.raw} اثر`,
              },
            },
          },

          scales: {
            x: {
              grid: {
                display: false,
              },

              border: {
                display: false,
              },
            },

            y: {
              beginAtZero: true,

              ticks: {
                precision: 0,
              },

              border: {
                display: false,
              },
            },
          },
        },
      }
    );

    return () => {
      chart.destroy();
    };
  }, [labels, values]);

  return (
    <div
      style={{
        width: "100%",
        height: "420px",
        position: "relative",
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}