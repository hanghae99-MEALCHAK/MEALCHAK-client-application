// 게시글 관련 모듈
import { produce } from "immer";
import moment from "moment";
import logger from "../../shared/Console";
import axiosModule from "../axios_module";
import { actionCreators as userActions } from "./user";
import { actionCreators as chatActions } from "./chat";
import { actionCreators as searchActions } from "./search";
import { createAction, handleActions } from "redux-actions";

// sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Text, Grid } from "../../elements";
import theme from "../../styles/theme";
import { customAlert } from "../../components/Sweet";
import "../../components/sweet.css";

const { color, fontSize } = theme;
const sweet = withReactContent(Swal);
const path = document.location.href.split("/")[3];

// Action
const SET_POST = "SET_POST";
const GET_DETAIL_POST_USER_LIST = "GET_DETAIL_POST_USER_LIST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const SET_RANK = "SET_RANK";
const CLEAR_POST = "CLEAR_POST";
const ADD_LAT_LNG = "ADD_LAT_LNG";

// ActionCreator
const setPost = createAction(SET_POST, (post_list) => ({
  post_list,
}));
const getDetailPostUserList = createAction(
  GET_DETAIL_POST_USER_LIST,
  (user_list) => ({ user_list })
);
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const setRank = createAction(SET_RANK, (rank_list) => ({ rank_list }));
const clearPost = createAction(CLEAR_POST, () => ({}));
const addLatLng = createAction(ADD_LAT_LNG, (x_y) => ({ x_y }));

// initialState
const initialState = {
  list: [],
  rank: [],
  chat_user_list: [],
  one_list: [],
  post_lat_lng: [],
};

// middleware
// main 게시글 정보 조회
const getPostAX = (category, sort = "recent") => {
  return function (dispatch, getState, { history }) {
    // dispatch(userActions.loading(true));
    axiosModule
      .get(`/posts/around?category=${category}&sort=${sort}`)
      .then((res) => {
        dispatch(clearPost());
        let post_list = [];

        logger("post:35: ", res);

        if (res.data.length !== 0) {
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
              meeting: p.meetingType === null ? "SEPARATE" : p.meetingType,
              place_url: p.placeUrl,
            };
            // logger("post", post);
            post_list.push(post);
          });
        } else {
          // response가 비어있을 때
        }
        dispatch(setPost(post_list));
        dispatch(userActions.loading(false));
      })
      .catch((err) => {
        logger("ErrorMessage: ", err);
      });
  };
};

// 게시글 하나의 정보조회
// 상세페이지에서 해당 게시글의 만료여부를 판단하기 위해 사용
// 마감된 글에서 사용자가 남아있던 경우 예외처리를 위한 함수
const getOnePostAX = (post_id) => {
  return function (dispatch, getState, { history }) {
    axiosModule
      .get(`/posts/${post_id}`)
      .then((res) => {
        logger("get one post 정보", res);

        // 게시글의 만남 예정시간 조회 후 현재시간과 비교하여 마감 여부 판단
        let p = res.data;
        const time = p.orderTime.split(" ")[1].split(":").join("");
        const orderDate = p.orderTime.split(" ")[0].split("-").join("");
        const post_time_int = parseInt(orderDate + time) + 100;

        // 마감 여부
        const today = moment().format("YYYY-MM-DD");
        const now = moment().format("HH:mm:ss");
        const now_time_int = parseInt(
          today.split("-").join("") + now.split(":").join("")
        );
        logger("get one post 정보", now_time_int);
        logger("get one post 정보", post_time_int);

        // 현재시간이 클 경우, 모집 마감된 경우
        // 로직 작성 당시 어디에서 실행이 안되는지 판단하기 위해 로거 사용
        if (now_time_int > post_time_int) {
          return customAlert
            .sweetOK(
              "이미 모집 마감된 글이에요",
              "새로운 모집글을 확인해주세요."
            )
            .then((res) => {
              logger("상세 확인 1");
              const search_list = getState().search.list;
              if (search_list.length === 0) {
                // 홈 상세페이지
                logger("상세 확인 홈");
                return window.location.replace("/home");
              } else {
                // 검색결과 있다는건 검색페이지라는 뜻
                logger("상세 확인 검색");

                if (search_list.length === 1) {
                  logger("상세 확인 검색 길이 1");
                  return window.location.replace("/search");
                } else {
                  logger("상세 확인 검색 길이 많음");
                  history.goBack();
                  // 검색결과가 있는경우 마감된 글만 제외후 검색결과를 유지하여 보여줌
                  return dispatch(searchActions.clearOldSearch(post_id));
                }
              }
            });
        } else {
          logger("상세 확인 null");
          return null;
        }
      })
      .catch((e) => {
        logger("상세보기 마감 에러", e);
      });
  };
};

// 상세페이지 참여중인 사용자 목록 조회
const getDetailPostUserListAX = (postId) => {
  return function (dispatch, getState, { history }) {
    axiosModule
      .get(`/posts/${postId}`)
      .then((res) => {
        logger("getDtailPostUserListAX : ", res);
        let user_list = [];
        res.data.userList.forEach((p) => {
          let user = {
            user_id: p.id,
            user_name: p.username,
            user_img: p.profileImg,
          };
          user_list.push(user);
        });
        dispatch(getDetailPostUserList(user_list));
        dispatch(
          addLatLng({
            latitude: res.data.latitude,
            longitude: res.data.longitude,
          })
        );
      })
      .catch((err) => {
        logger("getDetailPostUserListAX 에러: ", err);
      });
  };
};

// 모임 만들기 신규 글 업로드 함수
const addPostAX = (post_info) => {
  return function (dispatch, getState, { history }) {
    const address = getState().loc.post_address.address;
    const longitude = getState().loc.post_address.longitude;
    const latitude = getState().loc.post_address.latitude;
    const place_url = getState().loc.place_url;
    logger("post모듈 addPostAX - 1", post_info.appointmentDate);

    axiosModule
      .post("/posts", {
        title: post_info.title,
        headCount: post_info.headCount,
        category: post_info.foodCategory,
        address: `${address}/${post_info.detail_place}`,
        orderTime: `${post_info.appointmentDate} ${post_info.appointmentTime}:00`,
        contents: post_info.contents,
        restaurant: post_info.restaurant,
        longitude: longitude,
        latitude: latitude,
        meeting: post_info.meeting === null ? "SEPARATE" : post_info.meeting,
        placeUrl: place_url,
      })
      .then((res) => {
        dispatch(chatActions.setChatListAX());

        // 모집글 게시 성공 시
        customAlert.sweetConfirmReload(
          "밀착 준비 완료",
          [
            "모임 만들기 작성글을 성공적으로 작성했어요.",
            "이제 채팅을 기다려볼까요?",
          ],
          "/home"
        );
      })
      .catch((e) => {
        logger("모집글 작성 모듈 에러", e);
        customAlert
          .sweetOK(
            "모집글 작성 실패",
            "모임 모집글을 작성하는데 실패했어요.",
            "잠시 후 다시 시도해주세요."
          )
          .then(() => {
            window.location.replace("/home");
          });
      });
  };
};

// 모임 만들기 수정 함수
const editPostAX = (post_id, post_info, path) => {
  return function (dispatch, getState, { history }) {
    const longitude = getState().loc.post_address.longitude;
    const latitude = getState().loc.post_address.latitude;

    axiosModule
      .put(`/posts/${post_id}`, {
        title: post_info.title,
        headCount: post_info.headCount,
        category: post_info.foodCategory,
        address: `${post_info.place}/${post_info.detail_place}`,
        orderTime: `${post_info.appointmentDate} ${post_info.appointmentTime}:00`,
        contents: post_info.contents,
        restaurant: post_info.restaurant,
        longitude: longitude,
        latitude: latitude,
        meetingType: post_info.meeting,
      })
      .then((res) => {
        logger("수정 후 res", res);
        let hour = res.data.orderTime.split(" ")[1].split(":")[0];
        let minute = res.data.orderTime.split(" ")[1].split(":")[1];

        let post = {
          post_id: res.data.postId,
          title: res.data.title,
          contents: res.data.contents,
          category: res.data.category,
          shop: res.data.restaurant,
          headCount: res.data.headCount,
          nowHeadCount: res.data.nowHeadCount,
          orderTime: hour + ":" + minute,
          orderDate: res.data.orderTime.split(" ")[0],
          address: res.data.address.split("/")[0],
          detail_address: res.data.address.split("/")[1],
          user_id: res.data.userId,
          username: res.data.username,
          insert_dt: res.data.createdAt,
          distance: res.data.distance,
          room_id: res.data.roomId,
          meeting:
            res.data.meetingType === null ? "SEPARATE" : res.data.meetingType,
        };

        logger("수정 포스트 내용", post);

        // 마이페이지에서 수정한 경우 수정 완료 이후 렌딩 페이지 처리
        dispatch(editPost(post_id, post));
        if (path === "/mypost") {
          customAlert.sweetConfirmReload(
            "수정 완료",
            ["모집글 수정이 완료되었습니다."],
            "/mypost"
          );
          return;
        }
        customAlert.sweetConfirmReload(
          "모집글 수정 완료",
          ["성공적으로 모집글 수정이 완료되었어요."],
          `/post/${post_id}`
        );
      })
      .catch((e) => {
        // 모집글 수정 중 마감기한이 지난 경우의 예외 처리
        logger("모집글 수정 모듈 에러", e);
        customAlert
          .sweetOK("이미 모집 마감된 글이에요", "새로운 모집글을 확인해주세요.")
          .then(() => {
            window.location.replace("/home");
          });
      });
  };
};

// 채팅 신청함수
// 신청 예외 처리 (이미 신청한 경우, 본인 글인 경우, 참여중인 경우, 마감된 경우)
const requestChatPostAX = (user_id, post_user_id, post_id, detail_path) => {
  return function (dispatch, getState, { history }) {
    if (user_id === post_user_id) {
      return customAlert
        .sweetPromise(
          "이미 참여 중인 채팅이에요",
          "참여 중인 채팅은 채팅 탭에서",
          "확인할 수 있어요. 채팅 탭으로 이동할까요?",
          "이동하기"
        )
        .then((res) => {
          if (res) {
            return history.push("/chatlist");
          } else {
            return;
          }
        });
    } else {
      return customAlert
        .sweetPromise(
          "채팅방에 참여하시겠어요?",
          "참여하기를 누르면, 방장에게",
          "승인 요청을 보낼게요!",
          "참여하기",
          "취소"
        )
        .then((res) => {
          if (res) {
            return axiosModule
              .get(`/posts/join/request/${post_id}`)
              .then((res) => {
                logger("채팅 신청", res);
                if (res.data === "이미 신청한 글입니다") {
                  return customAlert.sweetConfirmReload(
                    "이미 신청한 방이에요",
                    ["참여 승인이 수락될 때까지", "기다려주세요."],
                    ""
                  );
                }
                if (res.data === "이미 속해있는 채팅방입니다") {
                  return customAlert
                    .sweetPromise(
                      "이미 참여 중인 채팅이에요",
                      "참여 중인 채팅은 채팅 탭에서",
                      "확인할 수 있어요. 채팅 탭으로 이동할까요?",
                      "이동하기"
                    )
                    .then((res) => {
                      if (res) {
                        return history.push("/chatlist");
                      } else {
                        return;
                      }
                    });
                } else {
                  return customAlert.sweetConfirmReload(
                    "방장에게 승인 요청을 보냈어요",
                    [
                      "채팅 탭에서 승인 대기 중인",
                      "채팅을 확인하실 수 있어요.",
                    ],
                    ""
                  );
                }
              })
              .catch((e) => {
                logger("채팅방 참여 승인 요청 에러", e);
                // 만료된 글에 채팅 신청 누른 경우 500 나면서 여기로 떨어짐
                if (detail_path === "post") {
                  return customAlert
                    .sweetOK(
                      "이미 모집 마감된 글이에요",
                      "새로운 모집글을 확인해주세요."
                    )
                    .then((res) => {
                      // 마감된 포스트 지울 내용 필요
                      logger("채팅 버튼 확인");
                      logger("채팅 마감 검색 경로", path);

                      const search_list = getState().search.list;
                      if (search_list.length === 0) {
                        // 홈 상세페이지
                        logger("채팅 버튼 홈, 검색상세", search_list);
                        return window.location.replace("/home");
                      } else {
                        // 검색결과 있다는건 검색페이지라는 뜻
                        logger("채팅 버튼 검색");
                        if (search_list.length === 1) {
                          logger("채팅 버튼 검색 1개일때");
                          return window.location.replace("/search");
                        } else {
                          logger("채팅 버튼 검색 여러개일때");
                          history.goBack();
                          return dispatch(
                            searchActions.clearOldSearch(post_id)
                          );
                        }
                      }
                    });
                }

                // 검색페이지
                if (path === "search") {
                  logger("채팅 마감 검색 경로", path);
                  return customAlert
                    .sweetOK(
                      "이미 모집 마감된 글이에요",
                      "새로운 모집글을 확인해주세요."
                    )
                    .then((res) => {
                      const search_list = getState().search.list;

                      if (search_list.length === 1) {
                        logger("검색 마감 채팅 버튼 결과", search_list);
                        return window.location.replace("/search");
                      } else {
                        logger("채팅 마감 검색 여러개");
                        return dispatch(searchActions.clearOldSearch(post_id));
                      }
                    });
                }

                // home 채팅시작 버튼일 경우
                if (path === "home") {
                  return customAlert
                    .sweetOK(
                      "이미 모집 마감된 글이에요",
                      "새로운 모집글을 확인해주세요."
                    )
                    .then((res) => {
                      return window.location.replace("/home");
                    });
                }
              });
          } else {
            return;
          }
        });
    }
  };
};

const deletePostAX = (post_id, path) => {
  return function (dispatch, getState, { history }) {
    sweet
      .fire({
        customClass: {
          popup: "border",
          confirmButton: "confirmButton",
          cancelButton: "cancelButton",
          denyButton: "denyButton",
          actions: "meal-action-class",
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
          <Grid width="9rem" is_flex2 margin="auto">
            <Text padding="0" color={color.brand100} bold2={fontSize.bold}>
              취소
            </Text>
          </Grid>
        ),
        denyButtonColor: color.brand20,
        confirmButtonColor: color.brand100,
        confirmButtonText: (
          <Grid width="9rem" is_flex2 margin="auto">
            <Text padding="0" color={color.bg0} bold2={fontSize.bold}>
              삭제하기
            </Text>
          </Grid>
        ),
        focusConfirm: false,
        reverseButtons: true,
      })
      .then((res) => {
        if (res.isConfirmed) {
          axiosModule
            .delete(`/posts/${post_id}`)
            .then(() => {
              dispatch(deletePost(post_id));
              if (path === "is_profile") {
                customAlert.sweetConfirmReload(
                  "삭제가 완료 됐어요",
                  ["선택하신 게시글이 삭제되었어요."],
                  "/mypost"
                );
                return;
              }
              customAlert.sweetConfirmReload(
                "삭제가 완료 됐어요",
                ["선택하신 게시글이 삭제되었어요."],
                "/home"
              );
            })
            .catch((e) => {
              logger("삭제 에러", e);
              customAlert.sweetConfirmReload(
                "삭제 오류",
                ["게시글 삭제 요청 중 에러가 발생했습니다."],
                "/home"
              );
            });
        } else if (res.isDenied) {
          return;
        } else {
          return;
        }
      });
  };
};

const getRankDB = () => {
  return function (dispatch, getState, { history }) {
    axiosModule
      .get("/menu")
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
        logger("post모듈 - getRankDB: ", err);
      });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
      }),

    [GET_DETAIL_POST_USER_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_user_list = action.payload.user_list;
      }),
    [ADD_LAT_LNG]: (state, action) =>
      produce(state, (draft) => {
        draft.post_lat_lng = action.payload.x_y;
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
    [CLEAR_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [];
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  getPostAX,
  getDetailPostUserListAX,
  addPostAX,
  editPostAX,
  deletePostAX,
  getRankDB,
  requestChatPostAX,
  getOnePostAX,
};

export { actionCreators };
