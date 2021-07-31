import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosModule from "../axios_module";
import jwtDecode from "jwt-decode";

// 개발환경 console.log() 관리용
import logger from "../../shared/Console";

// token
import { token } from "../../shared/OAuth";

// Action
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const LOADING = "LOADING";
const EDIT_NICK = "EDIT_NICK";
const EDIT_ADDRESS = "EDIT_ADDRESS";

// Action Creator
const setUser = createAction(SET_USER, (user_info) => ({ user_info }));
const logOut = createAction(LOG_OUT, () => {});
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const editNick = createAction(EDIT_NICK, (edit_nickname) => ({
  edit_nickname,
}));
const editAddress = createAction(EDIT_ADDRESS, (address) => ({ address }));

// Initial State
const initialState = {
  user: null,
  is_login: false,
  is_loading: false,
};

// middleware

// 카카오 회원가입 및 자동로그인
const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    axiosModule
      .get(`user/kakao/callback?code=${code}`)
      .then((res) => {
        // 인가코드에 관한 응답으로 jwt token 받음
        logger("user모듈 - 36", res);

        const ACCESS_TOKEN = res.data.token;

        // 세션에 토큰 저장
        sessionStorage.setItem("token", ACCESS_TOKEN);

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

// 사용자 닉네임 변경 함수
const editUserNickAX = (edit_nickname) => {
  return function (dispatch, getState, { history }) {
    axiosModule
      .put("/username/update", edit_nickname)
      .then((res) => {
        const edit_nickname = res.data;
        dispatch(editNick(edit_nickname));
        logger("nick 수정 모듈", res);
        window.alert("닉네임 수정이 완료되었습니다.");
      })
      .catch((e) => {
        logger("nick수정 모듈 e", e);
      });
  };
};

// getUserAX 만들어야함 - 마이페이지 user profile

// 로그인 확인
// 페이지가 새로고침 되는 상황마다 user check 후 리덕스에 정보 저장
const loginCheck = () => {
  return function (dispatch, getState, { history }) {
    if (token) {
      axiosModule
        .get("/user/info")
        .then((res) => {
          logger("로그인 체크 res", res);
          const user_info = {
            user_id: res.data.id,
            user_nickname: res.data.username,
            user_profile: res.data.profileImg,
            user_address: res.data.location.address,
          };
          dispatch(
            setUser({
              ...user_info,
            })
          );
        })
        .catch((e) => {
          logger("로그인 체크 에러", e);
        });
    } else {
      dispatch(logOut());
    }
  };
};
// API 연결 후 loginCheck middleware에 추가(App.js확인!)
const editUserAddressAX = (address) => {
  return function (dispatch, getState, { history }) {
    axiosModule
      .put("/user/location", {
        "address": address.address,
        "longitude": address.longitude,
        "latitude": address.latitude,
      })
      .then((res) => {
        // 유저 정보의 주소 데이터 변경
        dispatch(editAddress(res.data.address));
        window.alert("주소 설정이 완료되었습니다.");
        history.replace("/home");
      })
      .catch((err) => {
        logger("address 모듈 error: ", err);
      });
  };
};

// Reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user_info;
        draft.is_login = true;
        draft.is_loaded = true;
        logger("set_user 리듀서", draft.user);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        sessionStorage.removeItem("token");
        draft.user = null;
        draft.is_login = false;
        draft.is_loading = false;

        window.location.replace("/home");
        window.alert("로그아웃 되었습니다.");
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [EDIT_NICK]: (state, action) =>
      produce(state, (draft) => {
        draft.user.user_nickname = action.payload.edit_nickname;
      }),
    [EDIT_ADDRESS]: (state, action) =>
      produce(state, (draft) => {
        draft.user.user_address = action.payload.address;
      }),
  },
  initialState
);

const actionCreators = {
  kakaoLogin,
  loginCheck,
  logOut,
  loading,
  editUserNickAX,
  editUserAddressAX,
};

export { actionCreators };
