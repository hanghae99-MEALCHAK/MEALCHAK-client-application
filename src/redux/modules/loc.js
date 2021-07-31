// 현재 사용자의 위치 정보 제공 허용을 통해 얻는 좌표값을 주소로 변환하는 module

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import axiosModule from "../axios_module";
import { actionCreators as userActions } from "./user";
import { actionCreators as postActions } from "./post";

import jwtDecode from "jwt-decode";

import logger from "../../shared/Console";

const SET_LOC = "SET_LOC";
const SET_POSTADDRESS = "SET_POSTADDRESS";

const setLoc = createAction(SET_LOC, (coordinate) => ({ coordinate }));
const setPostAddress = createAction(SET_POSTADDRESS, (address) => ({
  address,
}));

const initialState = {
  list: [],
  post_address: null,
};

// 좌표를 주소로 변환하는 middleware
// const getCoordinate = (x, y) => {
//   return function (dispatch, getState, { history }) {
//     let rest_api = "3125ba608fbb74bdf912f794ddb65da6";
//     const headers = {
//       Authorization: `KakaoAK ${rest_api}`,
//     };
//     axios
//       .get(
//         `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}&input_coord=WGS84`,
//         { headers: headers }
//       )
//       .then((res) => {
//         console.log(res);
//       });
//   };
// };

// 특정 주소(도로명주소 혹은 지번주소)로 위도, 경도, 지번, 도로명주소, 우편번호 도출 middleware
const getMyCoordinateAX = (address) => {
  return function (dispatch, getState, { history }) {
    let rest_api = "3125ba608fbb74bdf912f794ddb65da6";
    const headers = {
      Authorization: `KakaoAK ${rest_api}`,
    };
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/address.json?analyze_type=exact&query=${address}`,
        { headers: headers }
      )
      .then((res) => {
        logger("loc:52: ", res);
        const doc = res.data.documents[0];
        const address = {
          // //  도로명주소
          address: doc.address_name,
          // //  거리 계산을 위한 '구' 정보
          gu_name: doc.road_address.region_2depth_name,
          // //  위도
          latitude: parseFloat(doc.y),
          // //  경도
          longitude: parseFloat(doc.x),
        };
        dispatch(userActions.editUserAddressAX(address));
      });
  };
};

// 특정 주소 도출 middleware(게시글 주소 추가)
const getMyPostCoordAX = (address) => {
  return function (dispatch, getState, { history }) {
    let rest_api = "3125ba608fbb74bdf912f794ddb65da6";
    const headers = {
      Authorization: `KakaoAK ${rest_api}`,
    };
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/address.json?analyze_type=exact&query=${address}`,
        { headers: headers }
      )
      .then((res) => {
        logger("loc:52: ", res);
        const doc = res.data.documents[0];
        const address = {
          // //  도로명주소
          address: doc.address_name,
          // //  거리 계산을 위한 '구' 정보
          gu_name: doc.road_address.region_2depth_name,
          // //  위도
          latitude: parseFloat(doc.y),
          // //  경도
          longitude: parseFloat(doc.x),
        };
        // dispatch(postActions.(address));
      });
  };
};

export default handleActions(
  {
    [SET_LOC]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [SET_POSTADDRESS]: (state, action) =>
      produce(state, (draft) => {
        draft.post_address = action.payload.address;
      }),
  },
  initialState
);

const actionCreators = {
  setLoc,
  // getCoordinate,
  getMyCoordinateAX,
  getMyPostCoordAX,
};

export { actionCreators };
