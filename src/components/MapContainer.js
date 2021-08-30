/*global kakao */
// 게시글 작성 및 수정 시 지도로 식당 찾기
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as locateActions } from "../redux/modules/loc";
import { Grid } from "../elements";

import { customAlert } from "./Sweet";
import logger from "../shared/Console";

const MapContainer = (props) => {
  const dispatch = useDispatch();

  // 게시글 - 만날 장소의 위도, 경도
  const latitude = useSelector((state) => state.user.user.latitude);
  const longitude = useSelector((state) => state.user.user.longitude);

  React.useEffect(() => {
    // 마커위에 띄울 infowindow
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 지도를 그릴 container (JSX - <Grid id="map">)
    // 지도의 중심좌표(center)와 확대 레벨(level)설정( 값이 없으면 기본 좌표 지정 )
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(
        latitude ? latitude : 33.450701,
        longitude ? longitude : 126.570667
      ),
      level: 3,
    };

    // 지도 생성
    const map = new kakao.maps.Map(container, options);
    // 장소 검색 객체 생성 후 키워드로 장소검색
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(props?.searchPlace, placesSearchCB);

    // input으로 입력한 키워드로 검색완료 시 실행되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (data.length === 0) {
        return customAlert.sweetOK(
          "앗 검색 결과가 없어요",
          "식당 + 지역으로 검색해주세요.",
          "검색이 불가능한 경우 직접 입력 가능해요."
        );
      }
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        // 검색 결과가 있으면(OK) displayMarker로 마커 표시
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // 최초 지도를 그릴 때 지정했던 위도, 경도에서 검색 결과의 위도, 경도로 변경 후 지도 범위 재설정
        map.setBounds(bounds);
      }
      if (status === kakao.maps.services.Status.ERROR) {
        return customAlert.sweetOK(
          "검색 실패",
          "검색 중에 오류가 발생했어요.",
          "잠시 후 다시 시도해주세요."
        );
      }
    }

    // 검색 결과로 나온 place를 기준으로 마커를 표시
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 검색 결과가 정확한 경우, 인포윈도우 노출
      infowindow.setContent(
        '<div style="padding:5px;font-size:1rem;width:max-content;">' +
          place.place_name +
          "</div>"
      );
      infowindow.open(map, marker);

      // 마커영역에 마우스를 올리면 장소명, 주소를 포함한 인포윈도우 노출
      kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:1rem;width:max-content;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });

      // 마커 영역에 마우스를 내리면 장소명, 주소를 포함한 인포윈도우 제거
      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });

      // 마커 클릭 시 해당 장소의 이름, 도로명 주소 설정 여부를 묻고 결정 후 modal 닫기
      kakao.maps.event.addListener(marker, "click", function () {
        customAlert
          .sweetPromise(
            "해당 주소로 선택하시겠어요?",
            place.place_name,
            place.road_address_name
          )
          .then((res) => {
            if (res === true) {
              dispatch(locateActions.setShopAddress(infowindow.a.innerText));
              dispatch(locateActions.setPlaceUrl(place.place_url));
              props?.close();
              props?.placeNull();
            }
            return;
          });
      });
    }
  }, [props?.searchPlace]);

  return (
    <Grid className="map_wrap">
      <Grid
        id="map"
        absolute="relative"
        overflow="hidden"
        width="auto"
        height="100vh"
      />
    </Grid>
  );
};
export default MapContainer;
