import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import axiosModule from "../axios_module";

const SET_POST = "SET_POST";
const GET_ALL_POST = "GET_ALL_POST";
const GET_DETAIL_POST = "GET_DETAIL_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const getAllPost = createAction(GET_ALL_POST, (post_list) => ({ post_list }));
const getDetailPost = createAction(GET_DETAIL_POST, (post_id) => ({ post_id }));

const initialState = {
  list: [],
};

// const getPostAX = () => {
//   return async function (dispatch, getState, { history }) {
//     const res = await axiosModule.get("/posts");
//     try {
//       console.log(res);
//       let post_list = [];
//       res.data.forEach((p) => {
//         let post = {
//           post_id: p.postId,
//           title: p.title,
//           contents: p.contents,
//           headCount: p.headCount,
//           orderTime: p.orderTime,
//           address: p.address,
//           insert_dt: p.createdAt,
//         };
//         post_list.push(post);
//       });
//       dispatch(setPost(post_list));
//     } catch (err){
//       console.log(err);
//     }
//   };
// };

const getPostAX = () => {
  return function (dispatch, getState, { history }) {
    axiosModule.get("/posts").then((res) => {
      console.log(res);
      let post_list = [];
      res.data.forEach((p) => {
        let post = {
          post_id: p.id,
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
    }).catch((err) => {
      console.log(err);
    })
  };
};
//     axiosModule.get("/posts").then(
//       console.log(res);
//       let post_list = [];
//       res.data.forEach((p) => {
//         let post = {
//           post_id: p.postId,
//           title: p.title,
//           contents: p.contents,
//           headCount: p.headCount,
//           orderTime: p.orderTime,
//           address: p.address,
//           insert_dt: p.createdAt,
//         };
//         post_list.push(post);
//       });
//       dispatch(setPost(post_list));
//     ).catch((err) => {
//       console.log(err);
//     });
//   };
// };
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
        console.log("에러: ", err);
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
        console.log("에러: ", err);
      });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
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

const actionCreators = {
  setPost,
  getPostAX,
  getAllPost,
  getDetailPostDB,
  getAllPostDB,
};

export { actionCreators };
