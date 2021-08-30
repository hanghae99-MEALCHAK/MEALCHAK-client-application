import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosModule from "../axios_module";

import logger from "../../shared/Console";

const GET_SEARCH_LIST = "GET_SEARCH_LIST";
const FOOD_CHECK = "FOOD_CHECK";
const CLEAR_OLD_SEARCH = "CLEAR_OLD_SEARCH";

const getSearchList = createAction(GET_SEARCH_LIST, (search) => ({ search }));
const food_check = createAction(FOOD_CHECK, (is_food) => ({ is_food }));
const clearOldSearch = createAction(CLEAR_OLD_SEARCH, (post_id) => ({
  post_id,
}));

const initialState = {
  list: [],
  is_food: false,
};

// 검색어, 정결기준을 가지고 검색한 post리스트
const getSearchListDB = (food, sort = "recent") => {
  return function (dispatch, getState, { history }) {
    dispatch(food_check(true));
    axiosModule
      .get(`/search?keyword=${food}&sort=${sort}`)
      .then((res) => {
        let search_list = [];

        res.data.forEach((p) => {
          let hour = p.orderTime.split(" ")[1].split(":")[0];
          let minute = p.orderTime.split(" ")[1].split(":")[1];
          let post = {
            post_id: p.postId,
            title: p.title,
            contents: p.contents,
            category: p.category,
            shop: p.restaurant,
            headCount: p.headCount,
            orderTime: hour + ":" + minute,
            orderDate: p.orderTime.split(" ")[0],
            address: p.address.split("/")[0],
            detail_address: p.address.split("/")[1],
            insert_dt: p.createdAt,
            username: p.username,
            user_id: p.userId,
            userImg: p.profileImg,
            distance: p.distance,
            room_id: p.roomId,
            nowHeadCount: p.nowHeadCount,
            valid: p.valid,
            meeting: p.meetingType === null? "SEPARATE" : p.meetingType,
          };
          search_list.push(post);
        });
        dispatch(getSearchList(search_list));
      })
      .catch((err) => {
        logger("search모듈 - getSeartchListDB: ", err);
      });
  };
};

export default handleActions(
  {
    [GET_SEARCH_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.search;
      }),
    [FOOD_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.is_food = action.payload.is_food;
      }),
    [CLEAR_OLD_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.post_id === parseInt(action.payload.post_id)
        );
        if (idx !== -1) {
          draft.list.splice(idx, 1);
        }
      }),
  },
  initialState
);

const actionCreators = {
  getSearchListDB,
  food_check,
  clearOldSearch,
};

export { actionCreators };
