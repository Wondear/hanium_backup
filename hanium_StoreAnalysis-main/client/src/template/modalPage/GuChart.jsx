import React, { useState } from "react";
import MixedChart from "../Chart/MixedChart";
import SearchInput from "../searchSystem/SearchInput";

function GuChart() {
  const [data, setData] = useState({ dong: [] });

  const updateData = (newData) => {
    setData(newData);
  };
  console.log("확인 : ", data);

  return (
    <div>
      <SearchInput getInfo={updateData} holder="구" />
      <MixedChart data={data} />
    </div>
  );
}

export default GuChart;
