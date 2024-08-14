import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function PieChart({ list }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const countData = {};
    for (const str of list) {
      if (countData[str]) {
        countData[str]++;
      } else {
        countData[str] = 1;
      }
    }

    // 차트 데이터 설정
    const data = {
      labels: Object.keys(countData),
      datasets: [
        {
          data: Object.values(countData),
          backgroundColor: [
            "#FBC2B5",
            "#FFA8A9",
            "#F786AA",
            "#A14A76",
            "#CDB2AB",
            "#FF69B4",
            "#E0517E",
            "#EE6566",
            "#FFC0CB",
            "#DEA493",
          ],
          borderColor: ["#FFFFFF"],
          borderWidth: 1,
        },
      ],
    };

    setChartData(data);
  }, [list]);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: {
        responsive: false,
      },
    });

    return () => {
      chart.destroy();
    };
  }, [chartData]);

  return (
    <div className="centered-chart">
      <canvas ref={chartRef} width="450vw" height="450vh" />
    </div>
  );
}

export default PieChart;
