// 현재 사용자의 위치 정보 제공 허용을 통해 얻는 좌표값을 주소로 변환하는 module
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import axiosModule from "../axios_module";

const SET_LOC = "SET_LOC";

const setLoc = createAction(SET_LOC, (coordinate) => ({ coordinate }));

const initialState = {
  list: [],
};

const getCoordinate = (x, y) => {
  return function (dispatch, getState, { history }) {
    let rest_api = "3125ba608fbb74bdf912f794ddb65da6";
    const headers = {
      Authorization: `KakaoAK ${rest_api}`,
    };
    axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
        { headers: headers }
      )
      .then((res) => {
        console.log(res);
      });
  };
};
export default handleActions(
  {
    [SET_LOC]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
  },
  initialState
);

const actionCreators = {
  setLoc,
  getCoordinate,
};

export { actionCreators };
