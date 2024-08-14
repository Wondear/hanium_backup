import React, { useState } from "react";
import axios from "axios";

function TestBtn() {
  const [localList, setLocalList] = useState(null);

  const fetchData = () => {
    axios
      .get("/test")
      .then((response) => {
        setLocalList(response.data); // 가져온 데이터를 상태에 저장
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {localList === null ? (
        <div>Loading</div>
      ) : (
        <div>{JSON.stringify(localList)}</div>
      )}
    </div>
  );
}

export default TestBtn;
