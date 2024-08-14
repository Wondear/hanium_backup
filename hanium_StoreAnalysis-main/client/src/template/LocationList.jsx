import React, { useState } from "react";
import LocationCompnent from "./LocationCompnent";
function LocationList(props) {
  const { locations, setLocations } = useState(); //로케이션 정보를 만들어서
  //리스트를 뽑아서 옵션에게 전달해서 출력
  const location = [
    { name: "선택안함" },
    { name: "0" },
    { name: "1" },
    { name: "2" },
    { name: "3" },
  ];

  return (
    <div>
      <select>
        {location.map((option) => (
          <LocationCompnent name={option.name}></LocationCompnent>
        ))}
      </select>
    </div>
  );
}

const styles = {};

export default LocationList;
