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
const EDIT_PROFILE = "EDIT_PROFILE";
// const EDIT_COMMENT = "EDIT_COMMENT";
const EDIT_ADDRESS = "EDIT_ADDRESS";

// Action Creator
const setUser = createAction(SET_USER, (user_info) => ({ user_info }));
const logOut = createAction(LOG_OUT, () => {});
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const editProfile = createAction(EDIT_PROFILE, (profile) => ({
  profile,
}));
// const editComment = createAction(EDIT_NICK, (edit_comment) => ({
//   edit_comment,
// }));
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
const editUserProfileAX = (profile) => {
  return function (dispatch, getState, { history }) {
    axiosModule
      .put("/userInfo/update", {
        username: profile.username,
        comment: profile.comment,
      })
      .then((res) => {
        let _profile = res.data;
        let profile = {
          username: _profile.username,
          comment: _profile.comment
        }
        dispatch(editProfile(profile));
        logger("profile 수정 모듈", res);
      })
      .catch((e) => {
        logger("profile 수정 모듈 e", e);
      });
  };
};

// 로그인 확인
// 페이지가 새로고침 되는 상황마다 user check 후 리덕스에 정보 저장
const loginCheck = () => {
  return function (dispatch, getState, { history }) {
    if (token) {
      axiosModule
      .get('/user/info')
      .then((res) => {
          logger('로그인 체크 res', res);
          const user_info = {
            user_id: res.data.id,
            user_nickname: res.data.username,
            user_profile: res.data.profileImg,
            user_address: res.data.address,
            user_comment: res.data.comment
          };
          dispatch(
            setUser({
              ...user_info,
            })
          );
        }).then(() => {
          // is_login은 안되었는데 토큰 남아있는경우 토큰 지우고 싶은데 방법을 모르겠음
          const is_login = getState().user.is_login;
          if(!is_login){
            dispatch(logOut());
          }
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
        address: address.address,
        longitude: address.longitude,
        latitude: address.latitude,
      })
      .then((res) => {
        // 유저 정보의 주소 데이터 변경
        dispatch(editAddress(res.data.address));
        window.alert("주소 설정이 완료되었습니다.");
        history.push("/home");
        // 유저주소를 변경 후 메인 페이지에서 거리에 따라 게시글 바뀌지 않는 현상 해결
        window.location.reload();
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
    [EDIT_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user.user_nickname = action.payload.profile.username;
        draft.user.user_comment = action.payload.profile.comment;
      }),
    // [EDIT_COMMENT]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.user.user_comment = action.payload.edit_comment;
    //   }),
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
  editUserProfileAX,
  // editUserCommentAX,
  editUserAddressAX,
};

export { actionCreators };
