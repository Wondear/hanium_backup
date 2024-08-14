import React from "react";

function LocationCompnent(props) {
  return (
    <option key="0" value={props.name}>
      {props.name}
    </option>
  );
}

export default LocationCompnent;
