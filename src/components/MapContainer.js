/*global kakao */
import React from "react";
import { customAlert } from "./Sweet";

import { Grid } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as locateActions } from "../redux/modules/loc";
import logger from "../shared/Console";
import Swal from "sweetalert2";
const MapContainer = (props) => {
  const dispatch = useDispatch();

  const latitude = useSelector((state) => state.user.user.latitude);
  const longitude = useSelector((state) => state.user.user.longitude);

  React.useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(props?.searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (data.length === 0) {
        return alert("검색 결과가 없습니다!");
        // return customAlert
        //   .sweetOK(
        //     "앗 검색 결과가 없어요",
        //     "식당 + 지역으로 검색해주세요!",
        //     "검색어를 찾을 수 없는 경우, 직접 입력 가능"
        //   )
        //   .then((res) => {
        //     return console.log(res);
        //   });
      }
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);
      }
    }

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

      // 마커영역에 마우스 올리면 장소명을 포함한 인포윈도우 노출
      kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:1rem;width:max-content;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });

      // 마커 영역에 마우스를 내리면 인포윈도우 제거
      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });

      // 마커 클릭 시 해당 장소의 이름, 도로명 주소 설정 여부를 묻고 결정 후 모달 닫기
      kakao.maps.event.addListener(marker, "click", function () {
        customAlert
          .sweetPromise(
            "해당 주소로 선택하시겠어요?",
            place.place_name,
            place.road_address_name
          )
          .then((res) => {
            if (res) {
              dispatch(locateActions.setShopAddress(infowindow.a.innerText));
              props?.close();
              props?.placeNull();
            }
            return;
          });
        // 도로명주소 place.road_address_name / url주소 place.place_url
        // 가게 이름 place.place_name
      });
    }
  }, [props?.searchPlace]);

  return (
    <Grid className="map_wrap">
      <Grid
        id="map"
        absolute="relative"
        overflow="hidden"
        width="35.97rem"
        height="100vh"
      />
      {/* <Grid id="menu_wrap" className="bg_white">
        <Grid className="option"></Grid>
      </Grid> */}
    </Grid>
  );
};
export default MapContainer;
