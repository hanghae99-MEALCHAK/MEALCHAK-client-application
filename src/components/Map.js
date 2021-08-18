/*global kakao */
import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postAction } from "../redux/modules/post";
import { actionCreators as chatActions } from "../redux/modules/chat";
import "../styles/map.css";

import { Grid, Button, Text, Image } from "../elements";

import theme from "../styles/theme";
import logger from "../shared/Console";
import { customAlert } from "./Sweet";

const Map = (props) => {
  const { color, radius, fontSize } = theme;

  const latitude = useSelector((state) => state.post.post_lat_lng?.latitude);
  const longitude = useSelector((state) => state.post.post_lat_lng?.longitude);

  React.useEffect(() => {
    console.log(props);
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 4,
    };

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

    const content =
      '<div class="wrap">' +
      '    <div class="info">' +
      '        <div class="title">' +
      `            ${props?.title}` +
      // '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
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

    // 마커 위에 커스텀오버레이를 표시합니다
    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    const overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: map,
      position: marker.getPosition(),
    });

    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
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
