import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import BasicChart from "../modalPage/BasicChart";
import TestChart from "../modalPage/TestChart";
import PieTest from "../modalPage/PieTest";
import GuChart from "../modalPage/GuChart";
import axios from "axios";

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
const Container = styled.div`
  font-family: "NanumSquareNeo";
  font-weight: 700;
  font-size: 24px;
  display: flex; /* SearchList 컨테이너를 Flex 컨테이너로 설정 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  flex-grow: 1; /* 크기를 화면에 맞게 조절 */
  width: 80%;
  margin: 5px 17px;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 10vh;
`;

// 커스텀 버튼 스타일 정의
const CustomButton = styled.button`
  font-family: "NanumSquareNeo";
  font-weight: 300;
  background-color: #bfeafa;
  border-color: #61caf2;
  color: #152b3e;
  border-radius: 6px;
  font-weight: bold;
  padding: 10px 20px;
  margin: 5px;
  position: fixed; /* 화면에 고정 */
  left: 0; /* 화면 왼쪽에 위치 */
  transform: translateY(-50%); /* 버튼을 수직 정중앙으로 이동 */
  z-index: 1; /* 다른 요소 위에 표시 */
  &:hover {
    background-color: #90daf6;
  }
`;

// 모달에 적용할 스타일 컴포넌트 생성
const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: ${(props) => props.top || "50%"};
  left: ${(props) => props.left || "50%"};
  transform: translate(-50%, -50%);
  z-index: 22;

  //흰색부분 content, body : 들어가는 영역
  .modal-content {
    z-index: 1;
    background-color: #ffffff; /* 모달 내용 배경색 */
    z-index: 22;
    position: fixed; /* 화면 정중앙에 고정하기 위해 fixed 사용 */
    top: ${(props) => props.top || "50%"};
    left: ${(props) => props.left || "50%"};
    transform: translate(-50%, -50%); /* 모달을 정확한 중앙으로 이동 */
    /* top: 50%;  수직 정중앙에 위치시키기 위해 50% 위치 설정 */
    /* left: 50%;  수평 정중앙에 위치시키기 위해 50% 위치 설정 */

    width: 50vw;
    height: 90vh;
    overflow: true;
    border-radius: 8px;
  }

  .modal-body {
    height: 80vh;
  }
  // 파란부분
  .modal-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 5vh;
    background-color: #337ab7; /* 모달 헤더 배경색 */
    border-radius: 8px 8px 0px 0px;
    color: white; /* 모달 헤더 텍스트 색상 */
    padding: 10px;
  }

  .modal-footer {
    background-color: #f5f5f5; /* 모달 푸터 배경색 */
  }
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; // 높이를 100%로 설정하여 컨테이너를 뷰포트 높이에 맞춥니다
`;

//버튼 눌렀을 때 나오는 페이지들
const PageDiv = styled.div`
  height: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column; /* 수직 중앙 정렬을 원하면 column으로 설정 */
  align-items: center;
  justify-content: center;
`;

const draggingState = {
  isDragging: false,
  initialX: 0,
  initialY: 0,
};

function ResearchModal(props) {
  const { List } = props;
  const [show, setShow] = useState(false);
  const [ModalTitle, setModalTitle] = useState(false);

  const modalRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0); // 현재 활성화된 탭의 인덱스
  const [selectedOption, setSelectedOption] = useState("compListMajor");

  const [compListMajor, setCompListMajor] = useState("");
  const [compListMiddle, setCompListMiddle] = useState("");
  const [region1, setRegion1] = useState({ region: "", dong: "" });
  const [region2, setRegion2] = useState({ region: "", dong: "" });

  let errorCount = 0;

  const chartInstance = useRef(null);
  const regionElement = useRef(null);
  const dongElement = useRef(null);
  const infos = useRef(null);
  const quater = useRef(null);

  useEffect(() => {
    const handleDragStart = (e) => {
      e.preventDefault();
      draggingState.isDragging = true;
      draggingState.initialX =
        e.clientX - e.target.getBoundingClientRect().left;
      draggingState.initialY = e.clientY - e.target.getBoundingClientRect().top;
      document.body.style.cursor = "grabbing"; // 커서를 'grabbing'으로 설정하여 드래그 중인 상태로 표시
    };

    // 드래그 중 이벤트 핸들러
    const handleDrag = (e) => {
      if (!draggingState.isDragging) return;
      const newX = e.clientX - draggingState.initialX;
      const newY = e.clientY - draggingState.initialY;
      e.target.style.left = newX + "px";
      e.target.style.top = newY + "px";
    };

    // 드래그 종료 이벤트 핸들러
    const handleDragEnd = () => {
      draggingState.isDragging = false;
      document.body.style.cursor = "auto"; // 커서를 기본 상태로 복원
    };

    const modalElement = modalRef.current;

    if (modalElement) {
      modalElement.addEventListener("mousedown", handleDragStart);
      modalElement.addEventListener("mousemove", handleDrag);
      modalElement.addEventListener("mouseup", handleDragEnd);

      return () => {
        modalElement.removeEventListener("mousedown", handleDragStart);
        modalElement.removeEventListener("mousemove", handleDrag);
        modalElement.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, []);

  useEffect(() => {
    // useRef로 DOM 요소에 참조를 할당합니다
    regionElement.current = document.querySelector("#region");
    dongElement.current = document.querySelector("#dong");
    infos.current = document.querySelector("#info");
    quater.current = document.querySelector("#quater");
    modalRef.current = document.querySelector("#modal");

    if (infos.current) {
      infos.current.addEventListener("click", () => {
        handleShow(4, "도움말");
      });
    }

    // 창 크기가 변경될 때마다 위치를 조정
    const handleResize = () => {
      const modalContent = document.querySelector(".modal-content");
      if (modalContent) {
        modalContent.style.top = "50%"; // 초기 위치로 리셋
        modalContent.style.left = "50%";
      }
    };

    window.addEventListener("resize", handleResize);

    // 이벤트 리스너 정리
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //const delteSave = () => {};

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const setSave = () => {
    // useRef를 통해 DOM 요소에 접근합니다
    if (region1.region == "") {
      console.log(dongElement.current.value);
      setRegion1({
        region: korean_to_table_name[regionElement.current.value],
        dong: dongElement.current.value,
      });
      console.log(region1.region);
    } else {
      getCompData();
      handleShow(1);
    }
  };

  const getCompData = async () => {
    let newRegion2 = {
      region: korean_to_table_name[regionElement.current.value],
      dong: dongElement.current.value,
    };
    setRegion2(newRegion2); // state 업데이트
    const curQuater = quater.current.value;
    //대분류 비교 결과
    try {
      const response = await axios.get(
        `/comp/${region1.region}/${region1.dong}/${newRegion2.region}/${newRegion2.dong}/major/${curQuater} `
      );
      setCompListMajor(response.data);
      errorCount = 0;
    } catch (error) {
      errorCount++;
      if (errorCount <= 2) getCompData();
      else {
        alert("데이터가 없습니다. 다시 시도해주세요\n" + error.message);
      }
      console.log(error);
    }

    //중분류 비교결과
    try {
      const response = await axios.get(
        `/comp/${region1.region}/${region1.dong}/${newRegion2.region}/${newRegion2.dong}/middle/${curQuater} `
      );
      setCompListMiddle(response.data);
      errorCount = 0;
    } catch (error) {
      errorCount++;
      if (errorCount <= 4) getCompData();
      else {
        alert("데이터가 없습니다. 다시 시도해주세요\n" + error.message);
      }
      console.log(error);
    }
  };
  const destroyChart = () => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
  };

  const handleClose = () => {
    destroyChart(); // 모달을 닫기 전 차트 파괴
    setShow(false);
  };

  const handleShow = (num, title) => {
    setShow(true);
    setCurrentIndex(num);
    if (title) {
      setModalTitle(title);
    }
  };

  const removeRegion = () => setRegion1({ region: "", dong: "" });

  // 경고창을 띄우는 함수
  const showAlert = () => {
    alert("현재 검색된 데이터가 없습니다.\n검색 후 시도해주세요"); // 원하는 경고창 메시지로 수정
  };

  return (
    <div style={{ zIndex: 2, position: "relative" }}>
      <div>
        <CustomButton
          onClick={() => (List != null ? handleShow(0, "지역통계") : showAlert)}
        >
          지역 통계
        </CustomButton>

        <CustomButton
          onClick={(e) => {
            dongElement.current.value == "" ? showAlert() : setSave();
          }}
          style={{ left: "290px" }}
        >
          {region1.region == ""
            ? "현재 지역 저장"
            : `${region1.region} ${region1.dong}와/과 비교 `}
          {region1.region != "" ? (
            <i
              class="fas fa-times"
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 중지
                removeRegion();
              }}
            ></i>
          ) : null}
        </CustomButton>

        <CustomButton
          onClick={() => handleShow(3, "구 조회")}
          style={{ left: "150px" }}
        >
          구 조회
        </CustomButton>
      </div>

      {/* StyledModal 컴포넌트를 사용하여 모달에 스타일 적용 */}
      <StyledModal id="modal" show={show} onHide={handleClose}>
        <Modal.Header>
          <h3>{ModalTitle}</h3>
          <div
            style={{
              marginRight: "20px",
              flex: "1",
              textAlign: "right",
              height: "18px",
            }}
          >
            <i className="fas fa-times" onClick={handleClose}></i>{" "}
            {/* header의 X 아이콘 */}
          </div>
        </Modal.Header>
        <Modal.Body>
          <PageDiv>
            {currentIndex === 0 && List != null ? (
              <div>
                <CustomButton
                  onClick={() =>
                    List != null
                      ? (handleShow(2, `${quater.current.value}분기 비교자료`),
                        destroyChart())
                      : showAlert()
                  }
                  style={{
                    position: "fixed",
                    left: "70%",
                    transform: "translateX(-50%)",
                  }}
                >
                  원형그래프로 보기
                </CustomButton>
                <BasicChart LargeList={Object.values(List.inds_lcls_nm)} />
              </div>
            ) : null}
            {currentIndex === 1 && List != null ? (
              <div>
                <label>
                  <input
                    type="radio"
                    value="compListMajor"
                    checked={selectedOption === "compListMajor"}
                    onChange={handleRadioChange}
                  />
                  대분류 차트
                </label>
                <label>
                  <input
                    type="radio"
                    value="compListMiddle"
                    checked={selectedOption === "compListMiddle"}
                    onChange={handleRadioChange}
                  />
                  중분류 차트
                </label>
                <TestChart
                  dataLabel1={region1.dong}
                  dataLabel2={region2.dong} // region2 state를 props로 전달
                  compList={
                    selectedOption == "compListMajor"
                      ? compListMajor
                      : compListMiddle
                  }
                ></TestChart>
              </div>
            ) : null}
            {currentIndex === 2 && (
              <div>
                <CustomButton
                  onClick={() =>
                    List != null ? (handleShow(0), destroyChart()) : showAlert()
                  }
                  style={{
                    position: "fixed",
                    left: "70%",
                    transform: "translateX(-50%)",
                  }}
                >
                  막대 그래프로 보기
                </CustomButton>
                {/* 세 번째 PIE 차트 버튼 */}
                {currentIndex === 2 && List != null ? (
                  //<PieChart LargeList={data} labels={labels} chartRef={chartRef} />
                  <PieTest LargeList={Object.values(List.inds_lcls_nm)} />
                ) : null}
              </div>
            )}
            {/* currentIndex === 3 ? <div>구 단위 인구수</div> : null */}
            {currentIndex === 3 ? (
              <div>
                <GuChart />
              </div>
            ) : null}

            {currentIndex === 4 ? (
              <Container>
                동 단위 검색 :<br /> 기본 화면에서 지역을 고른 뒤, 읍/면/동
                단위로 입력하면 해당 지역의 점포 정보를 보여줍니다.
                <br /> ※검색 예시 부산광역시 광안1동 <br />
                <br />
                구 조회 :<br /> 버튼을 눌러 들어간 페이지에서 검색하면 해당
                지역의 점포수와 인구수를 차트로 보여줍니다. <br />
                <br />
                지역 통계 :<br /> 동 단위 검색의 정보를 차트로 보여줍니다.
                <br />
                <br />
                비교 통계 :<br />동 단위 검색을 한 뒤, 현재 지역 저장을 누르면
                현재 지역이 저장되고, 다음에 다른 지역을 검색 후 다시 버튼을
                누르면 현재 지역과 저장된 지역을 비교한 차트를 보여줍니다.
                <br />
                등록은 버튼 내부에 X 표시를 눌러 취소할 수 있습니다.
              </Container>
            ) : null}
          </PageDiv>
        </Modal.Body>
      </StyledModal>
    </div>
  );
}

export default ResearchModal;
