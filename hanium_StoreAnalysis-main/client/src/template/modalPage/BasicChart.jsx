import BarChart from '../Chart/BarChart';

function BasicChart({LargeList}) {
  return (
    <div>
      <h3>기본 분석 자료</h3>
      <BarChart list={LargeList}></BarChart>
    </div>
  );
}
export default BasicChart;
