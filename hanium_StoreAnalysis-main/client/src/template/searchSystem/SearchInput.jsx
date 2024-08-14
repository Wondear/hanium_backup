import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const korean_to_table_name = [
  "강원특별자치도",
  "경기도",
  "경상남도",
  "경상북도",
  "광주광역시",
  "대구광역시",
  "대전광역시",
  "부산광역시",
  "서울특별시",
  "세종특별자치시",
  "울산광역시",
  "인천광역시",
  "전라남도",
  "전라북도",
  "제주특별자치도",
  "충청남도",
  "충청북도",
];

const quater_table = [
  { quater: 2204, name: "2022년 4분기" },
  { quater: 2301, name: "2023년 1분기" },
  { quater: 2302, name: "2023년 2분기" },
];

// 왼쪽으로 정렬하기 위한 스타일드 컴포넌트

const CustomButton = styled.button`
  font-family: "NanumSquareNeo";
  font-weight: 500;
  height: 40px;
  background-color: #bfeafa;
  border-color: #61caf2;
  color: #152b3e;
  border-radius: 6px;
  font-weight: bold;
  padding: 5px 20px;
  margin: 5px;
  z-index: 1; /* 다른 요소 위에 표시 */
  &:hover {
    background-color: #90daf6;
  }
`;

const InputContainer = styled.div`
  margin-top: 30px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  gap: 10px; /* 각 요소 사이의 간격 설정 */
  z-index: 3;
`;

const CustomSelect = styled.select`
  font-family: NanumSquareNeo;
  font-weight: 500;
  height: 38px;
  margin: 0px;
  padding: 0px;
`;
function SearchInput(props) {
  const { getInfo, holder } = props; // 데이터 받아왔을 때  값을 반환 해주는 함수를 props 로 받아오기

  const [localList, setLocalList] = useState(null);
  const [quater, setQuater] = useState("2301");

  const [textInput, setTextInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  let errorCount = 0;
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleScaleChange = (event) => {
    setQuater(event.target.value);
  };

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const fetchData = async () => {
    if (selectedOption !== "") {
      const selectedTable = korean_to_table_name[selectedOption];
      let backUrl = `/${selectedTable}/${textInput.trim()}/${quater}`;
      try {
        if (holder == "동") {
          let response = await axios.get(`/search/${backUrl}`);
          setLocalList(response.data);
        } else if (holder == "구") {
          let response1 = await axios.get(`/storeCount/${backUrl}`);
          let response2 = await axios.get(`/popula/${backUrl}`);
          setLocalList({ gu: response1.data, pop: response2.data });
        }
      } catch (error) {
        errorCount++;
        if (errorCount <= 4) fetchData();
        else {
          alert("데이터가 없습니다. 다시 시도해주세요\n" + error.message);
        }
        console.log(error);
      }
    }
  };
  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      // Enter 키를 눌렀을 때 fetchData 함수 호출
      fetchData();
    }
  };

  useEffect(() => {
    if (localList !== null) {
      console.log(localList);
      getInfo(localList);
    }
  }, [localList, getInfo]);

  return (
    <InputContainer>
      <CustomSelect id="quater" value={quater} onChange={handleScaleChange}>
        {quater_table.map((value, index) => (
          <option key={index} value={value.quater.toString()}>
            {value.name}
          </option>
        ))}
      </CustomSelect>
      <CustomSelect
        id="region"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        {korean_to_table_name.map((region, index) => (
          <option key={index} value={index.toString()}>
            {region}
          </option>
        ))}
      </CustomSelect>

      <input
        id="dong"
        type="text"
        value={textInput}
        onKeyPress={handleInputKeyPress}
        onChange={handleInputChange}
        placeholder={`${holder} 이름 검색`}
        style={{
          fontFamily: "NanumSquareNeo",
          fontWeight: "500",
          height: "30px",
          weight: "100px",
        }}
      />

      <CustomButton onClick={fetchData}>검색</CustomButton>
    </InputContainer>
  );
}

export default SearchInput;