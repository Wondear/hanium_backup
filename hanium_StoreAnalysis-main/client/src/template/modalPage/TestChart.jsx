import React, {useEffect, useRef, useState} from "react";
import Chart from "chart.js/auto";

function TestChart(props) {
  const { dataLabel1, dataLabel2, compList } = props;

  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false); // 데이터 준비 상태

  useEffect(() => {
    if (compList && compList.Category) {
      console.log("테스트 차트 로딩");
      const dataArray = Object.values(compList.Category).map(
        (category, index) => ({
          Category: category,
          Data1Count: compList.Data1Count[index],
          Data2Count: compList.Data2Count[index],
          Difference: compList.Difference[index],
        })
      );

      setChartData(dataArray);
      setLabels(dataArray.map((item) => item.Category));
      setIsDataReady(true); // 데이터 준비 완료
    }
  }, [compList]);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (!isDataReady) {
      return; // 데이터가 준비되지 않았으면 아무것도 하지 않음
    }

    const dataKey1 = "Data1Count";
    const dataKey2 = "Data2Count";
    const dataKeyDifference = "Difference";

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
              label: dataLabel1,
              data: chartData.map((item) => item[dataKey1]),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
          },
          {
              label: dataLabel2,
              data: chartData.map((item) => item[dataKey2]),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
          },
          {
              label: "차이값",
              data: chartData.map((item) => item[dataKeyDifference]),
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
          },
        ],
      },
    });

    // 컴포넌트가 언마운트될 때 차트 파기
    return () => {
      chart.destroy();
    };
  }, [isDataReady, chartData, labels]); 

  return (
    <div className="centered-chart">
      <canvas ref={chartRef} width="450vw" height="450vh" />
    </div>
  );
}

export default TestChart;
