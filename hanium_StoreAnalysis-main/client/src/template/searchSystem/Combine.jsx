import React from "react";
import SearchList from "./SearchList";
import SearchInput from "./SearchInput";
import styled from "styled-components";

const Container = styled.div`
  font-family: "NanumSquareNeo";
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  gap: 10px; /* 요소 사이의 간격 설정 */
  z-index: 2;
`;

function Combine(props) {
  const { localList, getInfo } = props;

  return (
    <Container>
      <SearchInput getInfo={getInfo} holder="동"></SearchInput>
      <div>
        {localList ? (
          <SearchList
            lats={Object.values(localList.lat)}
            lons={Object.values(localList.lon)}
            names={Object.values(localList.open_bizes_nm)}
            Rdnm={Object.values(localList.rdnm_adr)}
            colum={Object.values(localList.open_bizes_nm)}
            small={Object.values(localList.inds_scls_nm)}
          ></SearchList>
        ) : (
          <SearchList names={null}></SearchList>
        )}
      </div>
    </Container>
  );
}

export default Combine;
