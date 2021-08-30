/*global kakao */
// 상세페이지 - 게시글 올린 유저의 위치(지도로 보여주기)
import React from "react";
import { useSelector } from "react-redux";

import "../styles/map.css";

import { Grid } from "../elements";
import theme from "../styles/theme";

const Map = (props) => {
  const { radius } = theme;

  // 게시글 - 만날 장소의 위도, 경도
  const latitude = useSelector((state) => state.post.post_lat_lng?.latitude);
  const longitude = useSelector((state) => state.post.post_lat_lng?.longitude);

  React.useEffect(() => {
    // 지도를 그릴 container (JSX - <Grid id="map">)
    // 지도의 중심좌표(center)와 확대 레벨(level)
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 4,
    };

    // 지도 생성
    const map = new kakao.maps.Map(container, options);

    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const marker = new kakao.maps.Marker({ position: markerPosition });
    marker.setMap(map);

    // // 일반 지도, 스카이뷰 지도 타입을 전환 control 생성
    // const mapTypeControl = new kakao.maps.MapTypeControl();

    // // kakao.maps.ControlPosition 컨트롤이 표시될 위치를 정의
    // map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // // 지도 확대 축소, 제어 zoom control 생성
    // const zoomControl = new kakao.maps.ZoomControl();
    // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 커스텀 인포윈도우
    const content =
      '<div class="wrap">' +
      '    <div class="info">' +
      '        <div class="title">' +
      `            ${props?.title}` +
      "        </div>" +
      '        <div class="body">' +
      '            <div class="img">' +
      `                <img class="img02" src=${props?.userImg}>` +
      "           </div>" +
      '            <div class="desc">' +
      `                <div class="ellipsis">${props?.address}</div>` +
      `                <div class="jibun ellipsis">${props?.detail_address ? props?.detail_address : ""}</div>` +
      "            </div>" +
      "        </div>" +
      "    </div>" +
      "</div>";

    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS 이용해 위치를 설정
    const overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: map,
      position: marker.getPosition(),
    });

    // 마커를 클릭했을 때 커스텀 오버레이를 표시
    kakao.maps.event.addListener(marker, "click", function () {
      overlay.setMap(map);
    });

    // // 커스텀 오버레이 닫기
    // function closeOverlay() {
    //   overlay.setMap(null);
    // }
  }, [latitude, longitude]);

  return (
    <React.Fragment>
      <Grid
        id="map"
        width="32rem"
        height="25rem"
        margin="1.6rem auto"
        padding="1.6rem 1.6rem 0.8rem 1.6rem"
        is_border="0.1rem solid #EBE9E8"
        radius={radius.postBox}
      ></Grid>
    </React.Fragment>
  );
};

export default Map;
