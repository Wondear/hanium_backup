// //상권비교그래프
//
// import React, {useEffect, useState} from 'react';
// import {Bar} from 'react-chartjs-2';
//
// function TestChart(props) {
//   const { dataLabel1, dataLabel2} = props;
//   const [chartData, setChartData] = useState(null);
//
//   useEffect(() => {
//     // JSON 데이터를 가져옵니다.
//     fetch('/storeAnalyze_middle.json')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         if (!data.Category || !data.Data1Count || !data.Data2Count || !data.Difference) {
//           throw new Error('Data is not in the expected format');
//         }
//
//         // 데이터를 배열로 변환
//         const dataArray = Object.values(data.Category).map((category, index) => ({
//           Category: category,
//           Data1Count: data.Data1Count[index],
//           Data2Count: data.Data2Count[index],
//           Difference: data.Difference[index],
//         }));
//
//         setChartData(dataArray);
//       })
//       .catch(error => {
//         console.error('Error fetching or processing data:', error);
//       });
//   }, []);
//
//   if (!chartData) return <div>Loading...</div>; // 데이터가 아직 로드되지 않았을 때의 처리
//
//   // 차트 데이터를 준비합니다.
//   const labels = chartData.map(item => item.Category);
//   const dataKey1 = 'Data1Count';
//   const dataKey2 = 'Data2Count';
//   const dataKeyDifference = 'Difference';
//
//   // 차트 데이터 세트를 업데이트합니다.
//   const datasets = [
//     {
//       label: dataLabel1,
//       data: chartData.map(item => item[dataKey1]),
//       backgroundColor: 'rgba(170, 0, 255, 0.2)',
//       borderColor: 'rgba(170, 0, 255, 1)',
//       borderWidth: 1,
//     },
//     {
//       label: dataLabel2,
//       data: chartData.map(item => item[dataKey2]),
//       backgroundColor: 'rgba(54, 162, 235, 0.2)',
//       borderColor: 'rgba(54, 162, 235, 1)',
//       borderWidth: 1,
//     },
//     {
//       label: '차이값',
//       data: chartData.map(item => item[dataKeyDifference]),
//       backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       borderColor: 'rgba(75, 192, 192, 1)',
//       borderWidth: 1,
//     },
//   ];
//
//   return (
//     <div>
//       <h1>Chart Analysis</h1>
//       <Bar
//         data={{
//           labels: labels,
//           datasets: datasets,
//         }}
//       />
//     </div>
//   );
// }
//
// export default TestChart;
