import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axiosModule from '../axios_module';
import logger from '../../shared/Console';
import { actionCreators as userActions } from './user';
import { actionCreators as chatActions } from './chat';
import { customAlert } from '../../components/Sweet';
import { actionCreators as locateActions } from './loc';
import { useLocation } from 'react-router';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Text, Grid } from "../../elements";
import theme from "../../styles/theme";
import "../../components/sweet.css";

const { color, fontSize } = theme;
const sweet = withReactContent(Swal);

const SET_POST = 'SET_POST';
const GET_DETAIL_POST = 'GET_DETAIL_POST';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';
const SET_RANK = 'SET_RANK';

const setPost = createAction(SET_POST, (post_list) => ({
  post_list,
}));
const addPost = createAction(ADD_POST, (post_item) => ({ post_item }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const setRank = createAction(SET_RANK, (rank_list) => ({ rank_list }));

const initialState = {
  list: [],
  rank: [],
};

const getPostAX = () => {
  return function (dispatch, getState, { history }) {
    dispatch(userActions.loading(true));

    axiosModule
      .get(`/posts/around`)
      .then((res) => {
        let post_list = [];

        logger('post:35: ', res);

        if (res.data.length !== 0) {
          res.data.forEach((p) => {
            let hour = p.orderTime.split(' ')[1].split(':')[0];
            let minute = p.orderTime.split(' ')[1].split(':')[1];

            let post = {
              post_id: p.postId,
              title: p.title,
              contents: p.contents,
              category: p.category,
              shop: p.restaurant,
              headCount: p.headCount,
              orderTime: hour + ':' + minute,
              orderDate: p.orderTime.split(' ')[0],
              address: p.address,
              insert_dt: p.createdAt,
              username: p.username,
              user_id: p.userId,
              userImg: p.profileImg,
              distance: p.distance,
              room_id: p.roomId,
              nowHeadCount: p.nowHeadCount,
            };
            post_list.push(post);
          });
        } else {
          let post = {
            post_id: '',
          };
          post_list.push(post);
        }
        console.log(post_list);
        dispatch(setPost(post_list));
        dispatch(userActions.loading(false));
      })
      .catch((err) => {
        logger('ErrorMessage: ', err);
      });
  };
};

const getOnePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    axiosModule
      .get(`/posts/${postId}`)
      .then((res) => {
        let p = res.data;
        let post = {
          post_id: p.id,
          title: p.title,
          contents: p.contents,
          category: p.category,
          shop: p.restaurant,
          headCount: p.headCount,
          orderTime: p.orderTime,
          address: p.address,
          insert_dt: p.createdAt,
          username: p.username,
          user_id: p.userId,
          userImg: p.userImg,
        };
        dispatch(setPost([post]));
      })
      .catch((err) => {
        logger('post모듈 - getOnePostDB : ', err);
      });
  };
};

const addPostAX = (post_info) => {
  return function (dispatch, getState, { history }) {
    const address = getState().loc.post_address.address;
    const longitude = getState().loc.post_address.longitude;
    const latitude = getState().loc.post_address.latitude;
    logger('post모듈 addPostAX - 1', post_info.appointmentDate);

    axiosModule
      .post('/posts', {
        title: post_info.title,
        headCount: post_info.headCount,
        category: post_info.foodCategory,
        // address: post_info.place,
        address: address,
        orderTime: `${post_info.appointmentDate} ${post_info.appointmentTime}:00`,
        contents: post_info.contents,
        restaurant: post_info.restaurant,
        longitude: longitude,
        latitude: latitude,
      })
      .then((res) => {
        dispatch(chatActions.setChatListAX());

        customAlert.sweetConfirmReload(
          '작성 완료',
          '모집글 작성이 완료되었습니다.',
          '/home'
        );

        // dispatch(locateActions.setAddressNull());
      })
      .catch((e) => {
        logger('모집글 작성 모듈 에러', e);
        if (
          window.confirm(
            '모집글 작성에 에러가 발생했습니다.\n홈 화면으로 돌아가시겠습니까?'
          )
        ) {
          history.replace('/home');
        } else {
          history.push('/upload');
        }
      });
  };
};

const editPostAX = (post_id, post_info) => {
  return function (dispatch, getState, { history }) {
    const longitude = getState().loc.post_address.longitude;
    const latitude = getState().loc.post_address.latitude;

    axiosModule
      .put(`/posts/${post_id}`, {
        title: post_info.title,
        headCount: post_info.headCount,
        category: post_info.foodCategory,
        address: post_info.place,
        orderTime: `${post_info.appointmentDate} ${post_info.appointmentTime}:00`,
        contents: post_info.contents,
        restaurant: post_info.restaurant,
        longitude: longitude,
        latitude: latitude,
      })
      .then((res) => {
        logger('수정 후 res', res);
        let hour = res.data.orderTime.split(' ')[1].split(':')[0];
        let minute = res.data.orderTime.split(' ')[1].split(':')[1];

        let post = {
          post_id: res.data.postId,
          title: res.data.title,
          contents: res.data.contents,
          category: res.data.category,
          shop: res.data.restaurant,
          headCount: res.data.headCount,
          nowHeadCount: res.data.nowHeadCount,
          orderTime: hour + ':' + minute,
          orderDate: res.data.orderTime.split(' ')[0],
          address: res.data.address,
          user_id: res.data.userId,
          username: res.data.username,
          insert_dt: res.data.createdAt,
          distance: res.data.distance,
          room_id: res.data.roomId,
        };

        logger('수정 포스트 내용', post);

        dispatch(editPost(post_id, post));

        customAlert.sweetConfirmReload(
          '수정 완료',
          '모집글 수정이 완료되었습니다.',
          `/post/${post_id}`
        );
        // customAlert.sweetConfirmReload("수정 완료", '모집글 수정이 완료되었습니다.', `/home`);
      })
      .catch((e) => {
        logger('모집글 수정 모듈 에러', e);
        customAlert.sweetEditError(`/post/${post_id}`);
      });
  };
};

const deletePostAX = (post_id) => {
  return function (dispatch, getState, { history }) {
    sweet
    .fire({
      customClass: {
        popup: "border",
        confirmButton: "confirmButton",
        cancelButton: "cancelButton",
        denyButton: "denyButton",
      },
      width: "auto",
      padding: "0 1rem 1rem",
      title: (
        <Grid>
          <Text size={fontSize.base} bold2="700" margin="0 auto 1rem">
            정말 삭제하시겠어요?
          </Text>
          <Text size={fontSize.small}>
            게시글과 연결된 채팅방도
            <br />
            함께 삭제됩니다 :(
          </Text>
        </Grid>
      ),
      showDenyButton: true,
      denyButtonText: (
        <Grid width="9rem" is_flex2>
          <Text padding="0 2rem" color={color.brand100}>
            취소
          </Text>
        </Grid>
      ),
      denyButtonColor: color.brand20,
      confirmButtonColor: color.brand100,
      confirmButtonText: (
        <Grid width="9rem" is_flex2>
          <Text padding="0 2rem" color={color.bg0}>
            삭제하기
          </Text>
        </Grid>
      ),
      focusConfirm: false,
    })
    .then((res) => {
      if (res.isConfirmed) {
        axiosModule
          .delete(`/posts/${post_id}`)
          .then(() => {
            dispatch(deletePost(post_id));
            customAlert.sweetConfirmReload(
              "삭제가 완료 됐어요",
              "선택하신 게시글이 삭제되었어요.",
              "/home",
            );
          })
          .catch((e) => {
            logger("삭제 에러", e);
            customAlert.sweetConfirmReload(
              "삭제 오류",
              "게시글 삭제 요청 중 에러가 발생했습니다.",
              "/home"
            );
          });
      } else if (res.isDenied) {
        return;
      } else {
        return;
      }
    });
    // axiosModule
    //   .delete(`/posts/${post_id}`)
    //   .then(() => {
    //     dispatch(deletePost(post_id));
    //     customAlert.sweetConfirmReload(
    //       '삭제가 완료 됐어요',
    //       '선택하신 게시글이 삭제되었어요.',
    //       '/mypage'
    //     );
    //   })
    //   .catch((e) => {
    //     logger('삭제 에러', e);
    //   });
  };
};

const getRankDB = () => {
  return function (dispatch, getState, { history }) {
    axiosModule
      .get('/menu')
      .then((res) => {
        let rank_list = [];
        res.data.forEach((p) => {
          let rank = {
            category: p.category,
            imgUrl: p.imgUrl,
          };
          rank_list.push(rank);
        });
        dispatch(setRank(rank_list));
      })
      .catch((err) => {
        logger('post모듈 - getRankDB: ', err);
      });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);

        // draft.list = draft.list.reduce((acc, cur) => {
        //   if (acc.findIndex((a) => a.id === cur.post_id) === -1) {
        //     return [...acc, cur];
        //   } else {
        //     acc[acc.findIndex((a) => a.id === cur.post_id)] = cur;
        //     return acc;
        //   }
        // }, []);
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
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post_item);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.post_id === action.payload.post_id
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.post_id === action.payload.post_id
        );
        if (idx !== -1) {
          draft.list.splice(idx, 1);
        }
      }),
    [SET_RANK]: (state, action) =>
      produce(state, (draft) => {
        draft.rank = action.payload.rank_list;
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  getPostAX,
  getOnePostDB,
  addPostAX,
  editPostAX,
  deletePostAX,
  getRankDB,
};

export { actionCreators };
