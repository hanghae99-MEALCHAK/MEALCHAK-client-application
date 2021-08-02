import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosModule from "../axios_module";
import axios from "axios";
import { token } from "../../shared/OAuth";

import logger from "../../shared/Console";

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
// 메세지 내용 초기화 (방이동시)
const CLEAR_MSG = "CLEAR_MSG";
// 사용자가 입력하는 메세지 내용
const WRITE_MSG = "WRITE_MSG";
// 로딩 중 (false)
const LOADING = "LOADING";
// 로딩 완료 (true)
const LOADED = "LOADED";

// ActionCreator
const setChatList = createAction(SET_CHAT_LIST, (myChatList) => ({
  myChatList,
}));
const moveChatRoom = createAction(MOVE_CHAT_ROOM, (roomId, roomName) => ({
  roomId,
  roomName,
}));
const clearChat = createAction(CLEAR_CHAT, () => {});
const getMessages = createAction(GET_MSG, (newMessage) => ({ newMessage }));
const setMessage = createAction(SET_MSG, (chatMassageArray) => ({
  chatMassageArray,
}));
const clearMessage = createAction(CLEAR_MSG, () => ({}));
const writeMessage = createAction(WRITE_MSG, (message) => ({ message }));
const loading = createAction(LOADING, () => {});
const loaded = createAction(LOADED, () => {});

// initialState
const initialState = {
  // my chat list
  chatListInfo: [],
  // 현재 채팅들어갈/들어간 방정보
  currentChat: {
    roomId: null,
    roomName: null,
  },
  // 현재 접속한 채팅 메시지 (DB저장된 내용에 추가되는 메세지 push)
  messages: [],
  // 사용자가 입력하는 순간의 메세지
  messageText: null,
  // 메세지 로딩
  loading: false,
};

// middleware
const getChatListAX = () => {
  const header = {
    Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2cwNDE2QG5hdGUuY29tIiwidXNlcklkIjoyLCJ1c2VybmFtZSI6ImFzZzA0MTZAbmF0ZS5jb20iLCJpYXQiOjE2Mjc3Mzk5NjMsImV4cCI6MTYyNzc2MTU2M30.-kNIqVP2w8gMld2oNSbEh3Hm_DStnZSeetqaAIGmSPQ",
  };
  return function (dispatch, getState, { history }) {
    axios
      .get("http://13.125.39.31/chat/rooms/mine", { headers: header })
      .then((res) => {
        logger("나의 채팅방 목록", res);
        if (!res.data) {
          alert("개설된 채팅방 목록이 없습니다.\n채팅을 시작해보세요");
          return;
        }
        let my_chat_list = [];
        res.data.forEach((c) => {
          let one_chat_info = {
            roomId: c.roomId,
            ownUserId: c.ownUserId,
            postId: c.postId,
            roomName: c.postTitle,
          };
          my_chat_list.push(one_chat_info);
        });
        dispatch(setChatList(my_chat_list));
      })
      .catch((e) => {
        alert("채팅방 목록조회에 실패했습니다.\n메인페이지로 돌아갑니다.");
        history.replace("/home");
        logger("나의 채팅방 목록 조회 에러", e);
      });
  };
};

// enterRoom 할때 실행됨
const getChatMessagesAX = () => {
  return function (dispatch, getState, { history }) {
    const roomId = getState().chat.currentChat.roomId;
    axios
      .get(`http://13.125.39.31/chat/${roomId}/messages`)
      .then((res) => {
        let chatMassageArray = [];
        res.data.forEach((m) => {
          let one_msg_info = {
            roomId: m.roomId,
            sender_nick: m.sender,
            message: m.message,
          };
          chatMassageArray.push(one_msg_info);
        });
        dispatch(setMessage(chatMassageArray));
      })
      .catch((e) => {
        alert("채팅방 메세지 불러오기에 실패했습니다.");
        logger("채팅 메세지 불러오기 실패", e);
      });
  };
};

const enterRoomAX = (postId) => {
  return function (dispatch, getState, { history }) {
    const header = {
      Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2cwNDE2QG5hdGUuY29tIiwidXNlcklkIjoyLCJ1c2VybmFtZSI6ImFzZzA0MTZAbmF0ZS5jb20iLCJpYXQiOjE2Mjc3Mzk5NjMsImV4cCI6MTYyNzc2MTU2M30.-kNIqVP2w8gMld2oNSbEh3Hm_DStnZSeetqaAIGmSPQ",
    };

    axios
      .get(`http://13.125.39.31/chat/join/${postId}`, {
        headers: header,
      })
      .then((res) => {
        //여기서 입장하셨습니다 메세지를 리덕스에 저장해서 띄우줄수있지않을까?
      })
      .catch((e) => {
        logger("게스트 채팅방 입장 요청 에러발생", e);
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
        draft.currentChat.roomId = action.payload.roomId;
        draft.currentChat.roomName = action.payload.roomName;
      }),
    // clearChat - 현재방 id, name 초기화
    [CLEAR_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.currentChat.roomId = null;
        draft.currentChat.roomName = null;
      }),
    // getMessages - 새로운 메세지 정보를 메세지 리스트에 추가
    [GET_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.messages.push(action.payload.newMessage);
      }),
    // setMessage - 메세지 DB에서 조회할때 해당 방의 메세지 내역 불러옴
    [SET_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = action.payload.chatMassageArray;
      }),
    [CLEAR_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = [];
      }),
  },
  initialState
);

const actionCreators = {
  getChatListAX,
  getChatMessagesAX,
  enterRoomAX,
  moveChatRoom,
  clearChat,
  getMessages,
  clearMessage,
};

export { actionCreators };