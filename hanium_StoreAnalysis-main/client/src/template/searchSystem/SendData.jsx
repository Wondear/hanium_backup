import React, { useState } from "react";
import Combine from "./Combine";
import ResearchModal from "./ResearchModal";

function SendData() {
  const [localList, setLocalList] = useState(null);

  const updateData = (List) => {
    setLocalList(List);
    console.log("데이터 전달 " + localList);
    console.log(localList);
  };
  return (
    <div>
      <ResearchModal List={localList}></ResearchModal>
      <Combine getInfo={updateData} localList={localList}></Combine>
    </div>
  );
}

export default SendData;
