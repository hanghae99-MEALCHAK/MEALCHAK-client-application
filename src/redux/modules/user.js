import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosModule from "../axios_module";
import jwtDecode from "jwt-decode";

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
        // 인가코드에 관한 응답으로 jwt token 받음
        logger("user모듈 - 36", res);

        const ACCESS_TOKEN = res.data.token;

        // 세션에 토큰 저장
        sessionStorage.setItem('token', ACCESS_TOKEN);

        // 저장된 토큰으로 user 정보 확인 후 리덕스에 저장
        const token = sessionStorage.getItem("token");

        // jwtDecode를 이용해서 user 정보 서버에 요청없이 확인 후 저장
        logger("user 정보 decoding", jwtDecode(token));
        const user_nickname = jwtDecode(token).username;
        const user_id = jwtDecode(token).userId;

        dispatch(
          setUser({
            user_id: user_id,
            user_nickname: user_nickname,
          })
        );

        window.alert(`${user_nickname}님 환영합니다.`);
        window.location.replace("/home");
      })
      .catch((err) => {
        logger("user 모듈 74 - 소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        history.replace("/"); // 로그인 실패하면 로그인화면으로 돌려보냄
      });
  };
};

// 페이지가 새로고침 되는 상황마다 user check 후 리덕스에 정보 저장
const loginCheck = () => {
  return function (dispatch, getState, { history }) {
    if (token) {
      const user_nickname = jwtDecode(token).username;
      const user_id = jwtDecode(token).userId;
      dispatch(
        setUser({
          user_id: user_id,
          user_nickname: user_nickname,
        })
      );
    } else {
      dispatch(logOut());
    }
  };
};

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
        
        window.location.replace("/home");
        window.alert("로그아웃 되었습니다.");
      }),
  },
  initialState
);

const actionCreators = {
  kakaoLogin,
  loginCheck,
  logOut,
};

export { actionCreators };
