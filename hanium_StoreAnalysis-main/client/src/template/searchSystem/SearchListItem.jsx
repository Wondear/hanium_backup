import React, { useState } from "react";
import styled from "styled-components";

const ListItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 수평 가운데 정렬 */
  cursor: pointer;
  // padding: 10px;
  height : 4vh;
  width: 15vw;
`;
const ItemNumber = styled.span`
  margin-right: 10px;
  font-weight: bold;
`;
const ItemName = styled.p`
  margin: 0;
`;
function SearchListItem(props) {
  const { name, index, small } = props;
  return (
    <ListItemContainer>
      <ItemNumber>{index + 1}.</ItemNumber>
      <ItemName>{name}</ItemName>
      <ItemName>{small}</ItemName>
    </ListItemContainer>
  );
}
export default SearchListItem;
