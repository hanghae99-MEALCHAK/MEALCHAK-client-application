import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosModule from "../axios_module";
import jwtDecode from "jwt-decode";
import { customAlert } from "../../components/Sweet";
import { Text } from "../../elements";

import { actionCreators as imageActions } from "./image";

// 개발환경 console.log() 관리용
import logger from "../../shared/Console";

// token
import { token } from "../../shared/OAuth";

// Action
const SET_USER = "SET_USER";
const SET_ANOTHER_USER = "SET_ANOTHER_USER";
const SET_MYREVIEW = "SET_MYREVIEW";
const SET_MYPOST = "SET_MYPOST";
const LOG_OUT = "LOG_OUT";
const LOADING = "LOADING";
const EDIT_PROFILE = "EDIT_PROFILE";
const EDIT_ADDRESS = "EDIT_ADDRESS";

// Action Creator
const setUser = createAction(SET_USER, (user_info) => ({ user_info }));
const setAnotherUser = createAction(SET_ANOTHER_USER, (user_info) => ({
  user_info,
}));
const setMyReview = createAction(SET_MYREVIEW, (my_review) => ({ my_review }));
const setMyPost = createAction(SET_MYPOST, (my_post) => ({ my_post }));
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
  anotherUser: null,
  myReview: [],
  myPost: [],
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

        customAlert.sweetConfirmReload(
          "로그인 성공",
          `${user_nickname}님 환영합니다.`,
          "/home"
        );
      })
      .catch((err) => {
        logger("user 모듈 74 - 소셜로그인 에러", err);
        customAlert.sweetConfirmReload(
          "로그인 오류",
          "로그인에 실패하였습니다.",
          "/"
        ); // 로그인 실패하면 로그인화면으로 돌려보냄
      });
  };
};

// 사용자 정보 변경 middleware
const editUserProfileAX = (profile) => {
  return function (dispatch, getState, { history }) {
    let form = new FormData();
    form.append("username", profile.username);
    form.append("comment", profile.comment);
    form.append("file", profile.image);

    axiosModule
      .put("/userInfo/update", form)
      .then((res) => {
        let _profile = res.data;
        let profile = {
          username: _profile.username,
          comment: _profile.comment,
          profileImg: _profile.profileImg,
        };
        dispatch(editProfile(profile));
        dispatch(imageActions.setPreview(null));
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
        .get("/user/info")
        .then((res) => {
          logger("로그인 체크 res", res);
          const user_info = {
            user_id: res.data.id,
            user_nickname: res.data.username,
            user_profile: res.data.profileImg,
            user_address: res.data.address,
            user_comment: res.data.comment,
            user_manner: res.data.mannerScore,
          };
          dispatch(
            setUser({
              ...user_info,
            })
          );
        })
        .then(() => {
          // is_login은 안되었는데 토큰 남아있는경우 토큰 지우고 싶은데 방법을 모르겠음
          const is_login = getState().user.is_login;
          if (!is_login) {
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
        history.push("/home");
        // 유저주소를 변경 후 메인 페이지에서 거리에 따라 게시글 바뀌지 않는 현상 해결
        window.location.reload();
      })
      .catch((err) => {
        logger("address 모듈 error: ", err);
      });
  };
};

// 타 유저 프로필 페이지 - 해당 유저 정보 가져오기
const findUserProfileAX = (user_id) => {
  return function (dispatch, getState, { history }) {
    if (token) {
      axiosModule
        .get(`/userInfo/${user_id}`)
        .then((res) => {
          logger("타 유저 프로필 체크 res", res);
          const user_info = {
            user_id: res.data.userId,
            user_profile: res.data.profileImg,
            user_nickname: res.data.username,
            user_comment: res.data.comment,
            user_manner: res.data.mannerScore,
            user_review: res.data.reviews,
          };
          dispatch(
            setAnotherUser({
              ...user_info,
            })
          );
        })
        .then(() => {
          // // is_login은 안되었는데 토큰 남아있는경우 토큰 지우고 싶은데 방법을 모르겠음
          // const is_login = getState().user.is_login;
          // if (!is_login) {
          //   dispatch(logOut());
          // }
        })
        .catch((e) => {
          logger("타 유저 프로필 확인 에러", e);
        });
    } else {
      dispatch(logOut());
    }
  };
};
// 마이페이지 - 내가 쓴 글 조회
const getMyPostAX = () => {
  return function (dispatch, getState, { history }) {
    if (token) {
      axiosModule
        .get("/posts/myPosts")
        .then((res) => {
          logger("내가 쓴 글 res", res);
          let posts = [];

          if (res.data.length !== 0) {
            res.data.forEach((p) => {
              let hour = p.orderTime.split(" ")[1].split(":")[0];
              let minute = p.orderTime.split(" ")[1].split(":")[1];

              const my_post = {
                post_id: p.postId,
                title: p.title,
                contents: p.contents,
                category: p.category,
                shop: p.restaurant,
                headCount: p.headCount,
                orderTime: hour + ":" + minute,
                orderDate: p.orderTime.split(" ")[0],
                address: p.address,
                insert_dt: p.createdAt,
                username: p.username,
                user_id: p.userId,
                userImg: p.profileImg,
                // distance: p.distance,
                room_id: p.roomId,
                nowHeadCount: p.nowHeadCount,
                valid: p.valid,
              };
              posts.push(my_post);
            });
          }
          dispatch(setMyPost(posts));
        })
        .catch((e) => {
          logger("내가 받은 리뷰 에러", e);
        });
    } else {
      dispatch(logOut());
    }
  };
};

// 마이페이지 - 내가 받은 리뷰 조회
const getMyReviewAX = () => {
  return function (dispatch, getState, { history }) {
    if (token) {
      axiosModule
        .get("/review")
        .then((res) => {
          logger("내가 받은 리뷰 res", res);
          let reviews = [];

          if (res.data.length !== 0) {
            res.data.forEach((p) => {
              const my_review = {
                user_profile: p.profileImg,
                user_nickname: p.username,
                my_manner: p.manner,
                review: p.review,
                insert_dt: p.createdAt,
              };
              reviews.push(my_review);
            });
          }
          dispatch(setMyReview(reviews));
        })
        .catch((e) => {
          logger("내가 받은 리뷰 에러", e);
        });
    } else {
      dispatch(logOut());
    }
  };
};

// 타 유저 프로필 - 리뷰 남기기
const reviewWriteAX = (manner, review, user_id, nickname) => {
  return function (dispatch, getState, { history }) {
    if (token) {
      axiosModule
        .post(`/review/${user_id}`, {
          mannerType: manner,
          review: review,
        })
        .then((res) => {
          logger("내가 받은 리뷰 res", res);
          customAlert.sweetReviewWrite("성공적으로 리뷰를 보냈어요!", `${nickname} 님께`, "따뜻한 마음이 전송되었어요 :)", "goBack");
          // history.replace("/userprofile");
          // window.location.replace("/userprofile");
        })
        .catch((e) => {
          logger("내가 받은 리뷰 에러", e);
          customAlert.sweetConfirmReload("이미 리뷰를 작성하셨습니다!", "이전 페이지로 돌아갑니다.", "goBack");
        });
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
        draft.is_loaded = true;
        logger("set_user 리듀서", draft.user);
      }),
    [SET_ANOTHER_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.anotherUser = action.payload.user_info;
        logger("set_another_user 리듀서", draft.anotherUser);
      }),
    [SET_MYREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.myReview.push(...action.payload.my_review);
        logger("set_my_review 리듀서", draft.myReview);
      }),
    [SET_MYPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.myPost.push(...action.payload.my_post);
        logger("set_my_post 리듀서", draft.myPost);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        sessionStorage.removeItem("token");
        draft.user = null;
        draft.is_login = false;
        draft.is_loading = false;

        customAlert.sweetConfirmReload(
          "로그아웃 되었습니다.",
          "또 만나요!",
          "/home"
        );
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [EDIT_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user.user_nickname = action.payload.profile.username;
        draft.user.user_comment = action.payload.profile.comment;
        draft.user.user_profile = action.payload.profile.profileImg;
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
  editUserProfileAX,
  editUserAddressAX,
  findUserProfileAX,
  getMyReviewAX,
  getMyPostAX,
  reviewWriteAX,
};

export { actionCreators };
