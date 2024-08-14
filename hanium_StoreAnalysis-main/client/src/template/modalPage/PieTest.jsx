import PieChart from "../Chart/PieChart";

function BasicPie({ LargeList }) {
  return (
    <div>
      <h3>기본 PIE형 분석 자료</h3>
      <PieChart list={LargeList}></PieChart>
    </div>
  );
}
export default BasicPie;
