import React, { useState, useEffect } from "react";
import SearchListItem from "./SearchListItem";
import ListGroup from "react-bootstrap/ListGroup";
import SearchDetail from "./SearchDetail";
import Map from "../map.jsx";
import styled from "styled-components"; // styled-components 추가
const { kakao } = window;

// 내부 컴포넌트를 감싸는 스타일드 컴포넌트 추가
const SearchListContainer = styled.div`
  flex-grow: 1; /* 크기를 화면에 맞게 조절 */
  position: relative; /* 추가 */
  padding: 10px;
  border: 1px solid #61caf2;
  background-color: #eef9fe;
  width: 100%;
  max-height: 80vh; /* 화면 높이의 80%로 설정 (원하는 비율로 조절) */
  z-index: 3;
`;

const StyledList = styled(ListGroup)`
  .list-group-item {
    font-family: "NanumSquareNeo";
    font-weight: 600;
    border: 1px solid #61caf2;
    border-radius: 4px;
    background-color: #ffffff;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: #61caf2;
    }
  }
`;

const Custombutton = styled.button`
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  border: 1px solid #61caf2;
  border-radius: 4px;
  color: #346896;
  background-color: #ffffff;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #61caf2;
  }
`;

function SearchList(props) {
  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState(0); // 페이지 상태 변수 추가

  const { names, lats, lons, Rdnm, small } = props;
  const [mapLatlon, setMapLatlon] = useState({
    lat: 33.450701,
    lon: 126.570667,
  });
  var maxItemsToShow = 10; // 최대 랜더링할 항목 수

  // 선택된 아이템 정보 상태 추가
  const [selectedItem, setSelectedItem] = useState(null);

  // item을 클릭하면 해당 아이템 정보를 선택하도록 설정
  const handleItemClick = (name, Rdnm, lat, lon, small) => {
    console.log("Clicked Item: ", name, Rdnm, lat, lon);
    setSelectedItem({
      name,
      Rdnm,
      lat,
      lon,
      small,
    });
    setShowDetail(true);
    updateMapLatlon(lat, lon);
  };

  function sliceRender() {
    const startIndex = page * maxItemsToShow;
    const endIndex = startIndex + maxItemsToShow;
    return filteredNames.slice(startIndex, endIndex);
  }

  const updateMapLatlon = (lat, lon) => {
    //세부사항 같이 조정
    setMapLatlon({ lat, lon });
  };

  useEffect(() => {
    // 초기 좌표
    updateMapLatlon(33.450701, 126.570667);
  }, []);
  useEffect(() => {
    setPage(0);
    setShowDetail(false);
  }, [props]);

  if (!names) {
    return <Map />;
  }

  // name이 null이 아닌 항목만 필터링
  const filteredNames = names.filter((name, index) => name !== null);
  const filteredLats = lats.filter((lat, index) => names[index] !== null);
  const filteredLons = lons.filter((lon, index) => names[index] !== null);
  const filteredRdnmAdr = Rdnm.filter((Rdnm, index) => names[index] !== null);
  const filteredSmall = small.filter((small, index) => names[index] !== null);

  return (
    <div>
      <SearchListContainer>
        {showDetail && selectedItem && (
          <SearchDetail
            name={selectedItem.name}
            detail={selectedItem.Rdnm}
            small={selectedItem.small}
          ></SearchDetail>
        )}
        <StyledList>
          {sliceRender().map((name, index) => (
            <div key={index}>
              <ListGroup.Item
                action
                onClick={() =>
                  handleItemClick(
                    filteredNames[maxItemsToShow * page + index],
                    filteredRdnmAdr[maxItemsToShow * page + index],
                    filteredLats[maxItemsToShow * page + index],
                    filteredLons[maxItemsToShow * page + index],
                    filteredSmall[maxItemsToShow * page + index]
                  )
                }
              >
                <SearchListItem
                  name={name}
                  index={maxItemsToShow * page + index}
                  Rdnm={filteredRdnmAdr[maxItemsToShow * page + index]}
                  lat={filteredLats[maxItemsToShow * page + index]}
                  lon={filteredLons[maxItemsToShow * page + index]}
                />
              </ListGroup.Item>
            </div>
          ))}
          <div style={{ marginTop: 10, alignItems: "center" }}>
            <Custombutton
              onClick={() => {
                if (page > 0) {
                  setPage(page - 1);
                }
              }}
            >
              ◀
            </Custombutton>{" "}
            <Custombutton
              onClick={() => {
                if (
                  page <
                  Math.ceil(filteredNames.length / maxItemsToShow) - 1
                ) {
                  setPage(page + 1);
                }
              }}
            >
              ▶
            </Custombutton>
          </div>
        </StyledList>
      </SearchListContainer>
      <Map latlon={mapLatlon} selectedItem={selectedItem} />
    </div>
  );
}

export default SearchList;
