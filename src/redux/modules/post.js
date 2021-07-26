import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import axiosModule from "../axios_module";

const SET_POST = "SET_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));

const initialState = {
  list: [],
};

const getPostAX = () => {
  return async function (dispatch, getState, { history }) {
    const res = await axiosModule.get("/posts");
    try {
      console.log(res);
      let post_list = [];
      res.data.forEach((p) => {
        let post = {
          post_id: p.postId,
          title: p.title,
          contents: p.contents,
          headCount: p.headCount,
          orderTime: p.orderTime,
          address: p.address,
          insert_dt: p.createdAt,
        };
        post_list.push(post);
      });
      dispatch(setPost(post_list));
    } catch (err){
      console.log(err);
    }
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  getPostAX,
};

export { actionCreators };
