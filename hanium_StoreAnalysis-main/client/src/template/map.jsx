import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const { kakao } = window;

const MapWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  height: calc(100% - 65px);
`;

function Map({ latlon, selectedItem }) {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  // 선택된 아이템 정보 상태 추가

  useEffect(() => {
    const container = document.getElementById("map");
    if (!container) return;

    const { lat, lon } = latlon || { lat: 33.450701, lon: 126.570667 };
    const options = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    // Marker 추가 코드
    const markerPosition = new kakao.maps.LatLng(lat, lon);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    // InfoWindow 내용 업데이트 함수
    const infoContent = (name, Rdnm) => {
      if (infoWindow) {
        const updatedInfoContent = `<div style="max-width: 300px; max-height: 200px; width: 100%; padding-right: 8px;">
        <p style="font-size: 13px;">상호명 : ${name} <br><br> 주소 : ${Rdnm} </p>
      </div>`;
        infoWindow.setContent(updatedInfoContent);
      }
    };

    const infoWindow = new kakao.maps.InfoWindow({
      content: "",
      position: markerPosition,
    });

    // 마커를 클릭하면 InfoWindow를 열도록 설정
    kakao.maps.event.addListener(marker, "click", function () {
      console.log(selectedItem);
      if (selectedItem) {
        infoContent(selectedItem.name, selectedItem.Rdnm);
        infoWindow.open(map, marker);
      }
    });

    setMarker(marker);
    setInfoWindow(infoContent);
  }, [latlon, selectedItem]);

  return <MapWrapper id="map" ref={mapRef} />;
}

export default Map;
