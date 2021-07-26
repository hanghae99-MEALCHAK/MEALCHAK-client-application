import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

import axios from 'axios';

// action type
const GET_ALL_POST = 'GET_ALL_POST';
const GET_DETAIL_POST = 'GET_DETAIL_POST';

// action creator
const getAllPost = createAction(GET_ALL_POST, (post_list) => ({ post_list }));
const getDetailPost = createAction(GET_DETAIL_POST, (post_id) => ({ post_id }));

// initialState
const initialState = {
  list: [],
};

// middelware
const getAllPostDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://localhost:4000/posts`)
      .then((result) => {
        console.log(result.data);
        dispatch(getAllPost(result.data));
      })
      .catch((err) => {
        console.log('에러: ', err);
      });
  };
};

const getDetailPostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://localhost:4000/posts/${postId}`)
      .then((result) => {
        dispatch(getDetailPost(result.data));
      })
      .catch((err) => {
        console.log('에러: ', err);
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_ALL_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),

    [GET_DETAIL_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_post.push(...action.payload.post_id);

        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  getAllPost,
  getDetailPostDB,
  getAllPostDB,
};

export { actionCreators };
