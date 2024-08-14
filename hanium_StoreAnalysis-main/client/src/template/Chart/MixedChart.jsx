import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./BarStyle.css";

function MixedChart({ data }) {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    //console.log("확인 " + data.gu);

    if (chartRef.current && data && data.gu) {
      // 이전 차트 인스턴스 파기
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      const labels = Object.values(data.gu.adong_nm);
      const storeCountData = Object.values(data.gu.count);
      const populationRatioData = Object.values(data.pop.total);
      console.log(Object.values(data.gu.adong_nm));

      const newChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "점포 수",
              data: storeCountData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              yAxisID: "storeCountYAxis",
            },
            {
              label: "인구 수",
              data: populationRatioData,
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              type: "line",
              yAxisID: "populationRatioYAxis",
            },
          ],
        },
        options: {
          scales: {
            storeCountYAxis: {
              position: "left",
              beginAtZero: true,
              title: {
                display: true,
                text: "점포 수",
              },
            },
            populationRatioYAxis: {
              position: "right",
              beginAtZero: true,
              title: {
                display: true,
                text: "인구 수",
              },
            },
          },
        },
      });

      // 새 차트 인스턴스 참조
      chartInstance.current = newChart;
    }
  }, [data]);

  return (
    <div className="centered-chart">
      <canvas ref={chartRef} width="450vw" height="450vh" />
    </div>
  );
}

export default MixedChart;
