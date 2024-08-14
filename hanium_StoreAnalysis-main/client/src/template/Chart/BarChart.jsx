import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "./BarStyle.css";

function BarChart({ list }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({}); // 차트 데이터를 상태로 관리

  useEffect(() => {
    // list 배열에서 각 문자열의 개수를 카운트하여 데이터를 생성합니다.
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
      labels: Object.keys(countData), // 문자열 목록을 레이블로 사용
      datasets: [
        {
          label: "업종 대분류 통계",
          data: Object.values(countData), // 카운트된 개수를 데이터로 사용
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            // 다른 색상도 추가 가능
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            // 다른 색상도 추가 가능
          ],
          borderWidth: 1,
        },
      ],
    };

    setChartData(data); // 차트 데이터를 상태에 설정
  }, [list]);

  useEffect(() => {
    // 차트 생성 코드
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: chartData, // 변경된 데이터 사용
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // 컴포넌트가 언마운트될 때 차트 파기
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

export default BarChart;
