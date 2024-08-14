import React from "react";
import styled from "styled-components";

// 스타일을 따로 정의
// Container : 리스트 항목 누르면 주소 업종 자세히 보이는 공간
const Container = styled.div`
  display: flex; /* SearchList 컨테이너를 Flex 컨테이너로 설정 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  flex-grow: 1; /* 크기를 화면에 맞게 조절 */
  width: 80%;
  margin : 5px 17px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #61caf2;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 10vh;
`;

const Title = styled.h2`
  font-family: "NanumSquareNeo";
  font-weight: 700;
  font-size: 22px;
  margin-bottom : 8px;
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: #333;
`;

function SearchDetail(props) {
  const { name, detail, small } = props;

  return (
    <Container>
      {name && (
        <div>
          <Title>{name}</Title>
          <Description>
            주소: {detail}
            <br /> 업종: {small}
          </Description>
        </div>
      )}
    </Container>
  );
}

export default SearchDetail;
