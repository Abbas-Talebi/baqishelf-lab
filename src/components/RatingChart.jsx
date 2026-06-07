import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function RatingChart({
  labels,
  values,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const chart = new Chart(
      canvasRef.current,
      {
        type: "bar",

        data: {
          labels: labels.map(
            (label) =>
              "⭐".repeat(
                Number(label)
              )
          ),

          datasets: [
            {
				
				backgroundColor:
  "#fbbf24",
  
              data: values,

              borderRadius: 12,

              barThickness: 34,
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
              callbacks: {
                label: (context) =>
                  `${context.raw} اثر`,
              },
            },
          },

          scales: {
            x: {
              beginAtZero: true,

              grid: {
                display: false,
              },

              border: {
                display: false,
              },
            },

            y: {
              grid: {
                display: false,
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
        maxWidth: "900px",
        height: "320px",
        margin: "0 auto",
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}