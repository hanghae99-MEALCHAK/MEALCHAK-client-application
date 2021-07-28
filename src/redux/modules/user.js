import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import axiosModule from '../axios_module';

// 개발환경 console.log() 관리용
import logger from '../../shared/Console';

// token
import { token } from '../../shared/OAuth';

// Action
const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

// Action Creator
const setUser = createAction(SET_USER, (user_info) => ({ user_info }));
const logOut = createAction(LOG_OUT, () => {});

// Initial State
const initialState = {
  user: null,
  is_login: false,
};

// middleware

const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    axiosModule
      .get(`user/kakao/callback?code=${code}`)
      .then((res) => {
        logger('user모듈 - 36', res); // 토큰이 넘어올 것임

        const ACCESS_TOKEN = res.data.token;

        // 세션에 토큰 저장
        sessionStorage.setItem('token', ACCESS_TOKEN);

        const token = sessionStorage.getItem('token');

        // 세션에 저장한 토큰으로 다시 유저정보 서버에 요청
        const header = {
          Authorization: `${token}`,
        };
        history.replace('/');
        // axiosModule
        //   .get('/user/info', { headers: header })
        //   .then((res) => {
        //     logger('user모듈 - 54', res);

        //     dispatch(
        //       setUser({
        //         user_id: res.data.user_id,
        //         user_nickname: res.data.user_nickname,
        //       })
        //     );

        //     window.alert(`${res.data.user_nickname}님 환영합니다.`);
        //     window.location.replace('/');
        //   })
        //   .catch((e) => {
        //     logger('user 모듈 70 - user 정보 조회 에러', e);
        //   });
      })
      .catch((err) => {
        logger('user 모듈 74 - 소셜로그인 에러', err);
        window.alert('로그인에 실패하였습니다.');
        history.replace('/tutorial'); // 로그인 실패하면 로그인화면으로 돌려보냄
      });
  };
};

// const loginCheck = () => {
//   return function (dispatch, getState, { history }) {
//     if (token) {
//       axiosModule
//         .get('/user/info')
//         .then((res) => {
//           if (res.data) {
//             logger('user모듈 - login check', res.data);

//             dispatch(
//               setUser({
//                 user_id: res.data.user_id,
//                 user_nickname: res.data.user_nickname,
//               })
//             );
//           } else {
//             dispatch(logOut());
//           }
//         })
//         .catch((e) => {
//           logger('에러발생', e);
//           window.alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
//           history.replace('/');
//         });
//     }
//   };
// };

// Reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user_info;
        draft.is_login = true;
        logger('set_user 리듀서', draft.user);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        sessionStorage.removeItem('token');
        draft.user = null;
        draft.is_login = false;
        window.location.replace('/tutorial');
      }),
  },
  initialState
);

const actionCreators = {
  kakaoLogin,
  // loginCheck,
  logOut,
};

export { actionCreators };
