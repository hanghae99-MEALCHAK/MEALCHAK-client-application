import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosModule from "../axios_module";
import _ from "lodash";
import moment from "moment";
import { customAlert } from "../../components/Sweet";
import { token } from "../../shared/OAuth";
import { actionCreators as userAction } from "./user";
import logger from "../../shared/Console";
import jwtDecode from "jwt-decode";
import { history } from "../configureStore";

// Action
// 나만의 채팅 목록
const SET_CHAT_LIST = "SET_CHAT_LIST";
// 옮겨가는 (입장하려고 클릭한) 현재 방정보 입력
const MOVE_CHAT_ROOM = "MOVE_CHAT_ROOM";
// 뒤로가기 클릭시 현재방 정보 초기화
const CLEAR_CHAT = "CLEAR_CHAT";
// 구독하면서 실행되는 액션
// 새로입력되는 메세지(리스트 형태) 내용을 메세지에 추가
const GET_MSG = "GET_MSG";
// 처음 방에 입장할때 이전 대화기록 DB에서 가져오기 (array)
const SET_MSG = "SET_MSG";
// 사용자가 입력하는 메세지 내용
const WRITE_MSG = "WRITE_MSG";
// 로딩 중 (false)
const LOADING = "LOADING";
// 로딩 완료 (true)
const LOADED = "LOADED";
// 실시간 메세지 시간 보여주기
const SET_TIME = "SET_TIME";
// 입장 요청 리스트(방장용)
const SET_REQ_LIST = "SET_REQ_LIST";
// 입장 대기 리스트(신청자용)
const AWAIT_LIST = "AWAIT_LIST";
// 채팅 참여 user 정보
const GET_CHAT_USER = "GET_CHAT_USER";

// ActionCreator
const setChatList = createAction(SET_CHAT_LIST, (myChatList) => ({
  myChatList,
}));
const moveChatRoom = createAction(
  MOVE_CHAT_ROOM,
  (room_id, roomName, post_id, own_user_id, order_time) => ({
    room_id,
    roomName,
    post_id,
    own_user_id,
    order_time,
  })
);
const clearChat = createAction(CLEAR_CHAT, () => {});
const getMessages = createAction(GET_MSG, (newMessage) => ({
  newMessage,
}));
const setMessage = createAction(SET_MSG, (chatMassageArray) => ({
  chatMassageArray,
}));
const writeMessage = createAction(WRITE_MSG, (message) => ({ message }));
const loading = createAction(LOADING, () => {});
const loaded = createAction(LOADED, () => {});
const setTime = createAction(SET_TIME, () => ({}));
const setRequestList = createAction(SET_REQ_LIST, (request_list) => ({
  request_list,
}));
const setAwaitList = createAction(AWAIT_LIST, (await_list) => ({ await_list }));
const getChatUser = createAction(GET_CHAT_USER, (user_in_chat_list) => ({
  user_in_chat_list,
}));

// initialState
const initialState = {
  // my chat list
  chatListInfo: [],
  // 현재 채팅들어갈/들어간 방정보
  currentChat: {
    room_id: null,
    roomName: null,
    post_id: null,
  },
  // 현재 접속한 채팅 메시지 (DB저장된 내용에 추가되는 메세지 push)
  messages: [],
  // 사용자가 입력하는 순간의 메세지
  messageText: null,
  // 메세지 로딩
  loading: false,
  // 사용자가 입력하는 순간의 메세지 time
  now_time: null,
  // 방장에게 보이는 승인요청 리스트
  requestList: [],
  awaitList: [],
  userInList: [],
};

// middleware
const setChatListAX = () => {
  return function (dispatch, getState, { history }) {
    if (token) {
      axiosModule
        .get("/chat/rooms/mine")
        .then((res) => {
          logger("나의 채팅방 목록", res);

          let my_chat_list = [];
          res.data.forEach((c) => {
            let one_chat_info = {
              room_id: c.roomId,
              own_user_id: c.ownUserId,
              postId: c.postId,
              roomName: c.title,
              order_time: c.orderTime,
              headCountChat: c.headCountChat,
              live_chat: c.chatValid,
              new_msg: c.newMessage,
            };
            my_chat_list.push(one_chat_info);
          });
          dispatch(setChatList(my_chat_list));
        })
        .catch((e) => {
          customAlert.sweetConfirmReload(
            "채팅방을 불러올 수 없어요",
            [
              "채팅방을 불러오는 데 실패했어요.",
              "홈 탭으로 돌아간 후에 다시 시도해주세요.",
            ],
            "history"
          );
          logger("나의 채팅방 목록 조회 에러", e);
        });
    } else {
      dispatch(userAction.loginCheck());
    }
  };
};

// enterRoom 할때 실행됨
const getChatMessagesAX = () => {
  return function (dispatch, getState, { history }) {
    const room_id = getState().chat.currentChat.room_id;
    const room = getState().chat.currentChat;

    axiosModule
      .get(`/chat/${room_id}/messages`)
      .then((res) => {
        logger("채팅 메세지 목록 조회", res);
        logger("채팅 메세지 room", room);
        let chatMassageArray = [];
        res.data.content.forEach((m) => {
          let one_msg_info = {
            type: m.type,
            room_id: m.roomId,
            sender: m.sender.username,
            sender_id: m.sender.id,
            sender_img: m.sender.profileImg,
            message: m.message,
            createdAt: m.createdAt,
            msg_id: m.id,
          };
          chatMassageArray.push(one_msg_info);
        });
        dispatch(setMessage(chatMassageArray));
      })
      .catch((e) => {
        customAlert.sweetConfirmReload(
          "불러오기 실패",
          [
            "채팅방 메세지를 불러오는데 실패했어요.",
            "잠시 후 다시 시도해주세요.",
          ],
          ""
        );
        logger("채팅 메세지 불러오기 실패", e);
      });
  };
};

// 채팅 승인 대기 목록
const requestChatListAX = () => {
  return function (dispatch, getState, { history }) {
    if (token) {
      axiosModule
        .get("/posts/join/request/list")
        .then((res) => {
          logger("승인 요청 res", res);
          let request_list = [];
          res.data.forEach((req) => {
            let one_req = {
              join_id: req.joinRequestId,
              user_id: req.userId,
              username: req.username,
              user_img: req.profileImg,
              title: req.postTitle,
            };
            request_list.push(one_req);
          });

          dispatch(setRequestList(request_list));
        })
        .catch((e) => {
          logger("방장 승인 대기 목록 에러", e);
          customAlert.sweetConfirmReload(
            "불러오기 실패",
            [
              "승인 대기 목록을 불러오는데 실패했어요.",
              "잠시 후 다시 시도해주세요.",
            ],
            "/chatlist"
          );
        });
    } else {
      dispatch(userAction.loginCheck());
    }
  };
};

// 채팅 입장 신청 목록
// footer 채팅 탭 누를 때 실행
// 채팅 리스트 chatlist 페이지에서 요청
// 채팅 list 에서 disable 처리 느낌으로 리스트하단에 보여줌
const awaitChatListAX = () => {
  return function (dispatch, getState, { history }) {
    axiosModule
      .get("/posts/join/request/await")
      .then((res) => {
        logger("대기 목록", res);
        let await_list = [];
        res.data.forEach((l) => {
          let one_list = {
            title: l.postTitle,
            join_id: l.joinRequestId,
          };
          await_list.push(one_list);
        });

        dispatch(setAwaitList(await_list));
      })
      .catch((e) => {
        // chatlist 페이지에서 열려있는 채팅목록 아래에 비활성화 상태로 뜨도록 하는 것
        logger("신청자 승인 요청 목록 에러", e);
        customAlert.sweetConfirmReload(
          "불러오기 실패",
          [
            "승인 요청 목록을 불러오는데 실패했어요.",
            "잠시 후 다시 시도해주세요.",
          ],
          "/home"
        );
      });
  };
};

const awaitChatOut = (join_id) => {
  return function (dispatch, getState, { history }) {
    axiosModule
      .delete(`/posts/join/request/${join_id}`)
      .then((res) => {
        customAlert.sweetConfirmReload(
          "승인 요청 취소 완료",
          ["승인 요청이 성공적으로 취소 됐어요."],
          "/chatlist"
        );
      })
      .catch((e) => {
        // chatlist 페이지에서 열려있는 채팅목록 아래에 비활성화 상태로 뜨도록 하는 것
        logger("대기 취소 에러", e);
        customAlert.sweetConfirmReload(
          "승인 요청 취소 실패",
          [
            "승인 요청한 채팅을 취소하는데 실패했어요.",
            "잠시 후 다시 시도해주세요.",
          ],
          ""
        );
      });
  };
};

// 채팅방 안에 들어와있는 사용자 정보
const getChatUserAX = (roomId) => {
  return function (dispatch, getState, { history }) {
    if (roomId) {
      return axiosModule
        .get(`/chat/user/${roomId}`)
        .then((res) => {
          let user_in_chat_list = [];
          res.data.forEach((u) => {
            let one_user = {
              user_id: u.id,
              user_name: u.username,
              user_img: u.profileImg,
            };
            user_in_chat_list.push(one_user);
          });
          dispatch(getChatUser(user_in_chat_list));
        })
        .catch((e) => {
          logger("채팅 참여 유저 목록확인 에러", e);
          customAlert.sweetConfirmReload(
            "앗! 잠시 볼 수 없어요",
            [
              "채팅에 참여 중인 사용자를 조회하는 데",
              "실패했어요. 잠시 후 다시 시도해주세요.",
            ],
            "goBack"
          );
        });
    } else {
      return customAlert
        .sweetOK(
          "잘못된 접근입니다.",
          "홈으로 돌아갑니다.",
          "채팅 신청 후 채팅탭을 이용해주세요.",
          "확인"
        )
        .then((res) => {
          return history.replace("/home");
        });
    }
  };
};

const leaveChatAX = (post_id) => {
  return function (dispatch, getState, { history }) {
    customAlert
      .sweetPromise(
        "채팅방을 나가시겠어요?",
        "해당 채팅방이 목록에서 사라져요.",
        "",
        "나가기",
        "취소"
      )
      .then((res) => {
        if (res) {
          axiosModule
            .delete(`/chat/quit/${post_id}`)
            .then((res) => {
              return customAlert.sweetConfirmReload(
                "나가기 완료",
                ["성공적으로 채팅방에서 나왔어요."],
                "/chatlist"
              );
            })
            .catch((e) => {
              logger("채팅방 나가기 요청 에러", e);
              return customAlert.sweetConfirmReload(
                "나가기 실패",
                ["채팅방 나가기에 실패했어요.", "잠시 후 다시 시도해주세요."],
                ""
              );
            });
        } else {
          return null;
        }
      });
  };
};

export default handleActions(
  {
    // setChatList - 나만의 채팅 목록
    [SET_CHAT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.chatListInfo = action.payload.myChatList;
      }),
    // moveChatRoom - 현재 채팅방 id, name
    [MOVE_CHAT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.currentChat.room_id = action.payload.room_id;
        draft.currentChat.roomName = action.payload.roomName;
        draft.currentChat.post_id = action.payload.post_id;
        draft.currentChat.own_user_id = action.payload.own_user_id;
        draft.currentChat.order_time = action.payload.order_time;
      }),
    // clearChat - 현재방 id, name 초기화
    [CLEAR_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.currentChat.room_id = null;
        draft.currentChat.roomName = null;
        draft.currentChat.post_id = null;
        draft.currentChat.own_user_id = null;
        draft.currentChat.order_time = null;
        draft.userInList = [];
        draft.messages = [];
      }),
    // getMessages - 새로운 메세지 정보를 메세지 리스트에 추가
    [GET_MSG]: (state, action) =>
      produce(state, (draft) => {
        const user_id = jwtDecode(token).userId;
        const m = action.payload.newMessage;
        if (m.type === "BAN") {
          // 강퇴 당한 사람의 경우 퇴장 알럿 표시
          if (user_id === parseInt(m.message)) {
            customAlert
              .sweetOK(
                "접근이 불가한 채팅이에요",
                "해당 채팅방에서 퇴장처리되었어요.",
                "채팅방목록으로 돌아갈게요."
              )
              .then(() => {
                return window.location.replace("/chatlist");
              });
          } else {
            // 그 외 사용자들은 리스트에서 강퇴 유저 삭제시킴
            let idx = draft.userInList.findIndex(
              (u) => parseInt(u.user_id) === parseInt(m.message)
            );
            if (idx !== -1) {
              draft.userInList.splice(idx, 1);
            }
            return;
          }
        }

        // 방장이 채팅방을 나간 경우 모든 사용자를 채팅방에서 내보낸다.
        else if (m.type === "BREAK") {
          if (user_id === m.sender.id) {
            return customAlert
              .sweetOK("나가기 완료", "채팅방 나가기가 완료되었습니다.")
              .then((res) => {
                return window.location.replace("/chatlist");
              });
          } else {
            return customAlert
              .sweetOK(
                "앗 사라진 채팅방이에요",
                "방장이 삭제한 채팅방이에요.",
                "다른 밀착을 시작해볼까요?"
              )
              .then(() => {
                return window.location.replace("/chatlist");
              });
          }
        } else {
          const one_msg = {
            type: m.type,
            room_id: m.roomId,
            sender: m.sender.username,
            sender_id: m.sender.id,
            sender_img: m.sender.profileImg,
            message: m.message,
            createdAt: m.createdAt,
            msg_id: m.id,
          };
          draft.messages.push(one_msg);
        }
      }),
    // setMessage - 메세지 DB에서 조회할때 해당 방의 메세지 내역 불러옴
    [SET_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = _.remove(action.payload.chatMassageArray.reverse(), {
          type: "TALK",
        });
      }),
    [WRITE_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.messageText = action.payload.message;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = true;
      }),
    [LOADED]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = false;
      }),
    [SET_TIME]: (state, action) =>
      produce(state, (draft) => {
        const now_time = moment().format("hh:mm");
        draft.now_time = now_time;
      }),
    [SET_REQ_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.requestList = action.payload.request_list;
      }),
    [AWAIT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.awaitList = action.payload.await_list;
      }),
    [GET_CHAT_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userInList = action.payload.user_in_chat_list;
      }),
  },
  initialState
);

const actionCreators = {
  setChatListAX,
  getChatMessagesAX,
  moveChatRoom,
  clearChat,
  getMessages,
  writeMessage,
  loading,
  loaded,
  setTime,
  requestChatListAX,
  awaitChatListAX,
  getChatUserAX,
  awaitChatOut,
  leaveChatAX,
  // clearChatUser,
};

export { actionCreators };
