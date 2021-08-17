import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { token } from "../shared/OAuth";
import { history } from "../redux/configureStore";
import moment from "moment";

// 소켓 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";

// style
import styled from "styled-components";
import Spinner from "../shared/Spinner";
import {
  Header,
  MessageList,
  MessageWrite,
  SideContent,
  PcSide,
} from "../components";
import { Grid } from "../elements";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { actionCreators as userAction } from "../redux/modules/user";
import theme from "../styles/theme";
import logger from "../shared/Console";
import { customAlert } from "../components/Sweet";
import "../styles/side.css";

// side bar
import Sidebar from "react-sidebar";

const Chat = (props) => {
  const { border } = theme;

  // side nav
  const [isOpen, setIsOpen] = React.useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };

  // 소켓
  // const sock = new SockJS("http://52.78.204.238/chatting");
  const sock = new SockJS("http://115.85.182.57/chatting");
  const ws = Stomp.over(sock);
  // ws.reconnect_delay = 500;

  // 현재 방정보
  const dispatch = useDispatch();

  const roomName = props.history.location.state?.roomName;
  const room_id = props.history.location.state?.room_id;
  const post_id = props.history.location.state?.post_id;
  const own_user_id = props.history.location.state?.own_user_id;
  const order_time = props.history.location.state?.order_time;

  // 채팅 참여 중인 사용자 정보
  const user_in_chat = useSelector((state) => state.chat?.userInList);

  // 보낼 메세지 정보
  const sender_nick = useSelector((state) => state.user.user?.user_nickname);
  const sender_profile = useSelector((state) => state.user.user?.user_profile);
  const sender_id = useSelector((state) => state.user.user?.user_id);
  const messageText = useSelector((state) => state.chat.messageText);

  // 새로고침될때 방 정보 날아가지 않도록 함
  React.useEffect(() => {
    logger("chat props", props);
    logger("chat sender info", sender_profile);
    logger("chat user_in_chat", user_in_chat);
    dispatch(userAction.loginCheck());

    if (token) {
      dispatch(
        chatActions.moveChatRoom(
          room_id,
          roomName,
          post_id,
          own_user_id,
          order_time
        )
      );
      dispatch(chatActions.getChatMessagesAX());
      dispatch(chatActions.getChatUserAX(room_id));
    }
  }, []);

  // 방 정보가 바뀌면 소켓 연결 구독, 구독해제
  React.useEffect(() => {
    if (!room_id) {
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
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [room_id ? room_id : null]);

  // 채팅방시작하기, 채팅방 클릭 시 room_id에 해당하는 방을 구독
  const wsConnectSubscribe = () => {
    try {
      ws.debug = null;
      ws.connect(
        {
          token: token,
        },
        () => {
          ws.subscribe(
            `/sub/api/chat/rooms/${room_id}`,
            (data) => {
              const newMessage = JSON.parse(data.body);
              logger("구독후 새로운 메세지 data", newMessage);

              // 실시간 채팅 시간 넣어주는 부분
              const now_time = moment().format("YYYY-MM-DD HH:mm:ss");
              dispatch(
                chatActions.getMessages({ ...newMessage, createdAt: now_time })
              );
            },
            {
              token: token,
            }
          );
        }
      );
    } catch (e) {
      logger("소켓 커넥트 에러", e);
    }
  };

  // 다른 방을 클릭하거나 뒤로가기 버튼 클릭시 연결해제 및 구독해제
  const wsDisConnectUnsubscribe = () => {
    try {
      ws.debug = null;
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0");
          clearTimeout(waitForConnection);
        },
        { token: token }
      );
    } catch (e) {
      logger("연결 구독 해체 에러", e);
    }
  };

  // 웹소켓이 연결될 때 까지 실행하는 함수
  const waitForConnection = (ws, callback) => {
    setTimeout(() => {
      if (ws.ws.readyState === 1) {
        callback();
      } else {
        waitForConnection(ws, callback);
      }
    }, 0.1);
  };

  const sendMessage = (new_message) => {
    try {
      // 토큰없으면 다시 로그인 시키기
      if (!token) {
        customAlert.sweetNeedLogin("replace");
      }
      // send할 데이터
      const data = {
        type: "TALK",
        roomId: room_id,
        sender: sender_nick,
        senderImg: sender_profile,
        senderId: sender_id,
        message: new_message,
        // message : 해당 유저 id
        // roomId : 방 번호
      };
      // 빈 텍스트일때 보내기 방지
      if (new_message === "") {
        customAlert.sweetConfirmReload("메세지를 입력해주세요.", null, "");
        return;
      }
      // 로딩
      // dispatch(chatActions.loading());
      dispatch(chatActions.setTime());
      waitForConnection(ws, () => {
        ws.debug = null;

        ws.send("/pub/message", { token: token }, JSON.stringify(data));
        logger("메세지보내기 상태", ws.ws.readyState);

        // 메세지 보내고 나면 다시 초기화시켜주는 작업
        dispatch(chatActions.writeMessage(""));
      });
    } catch (e) {
      logger("message 소켓 함수 에러", e);
      logger("메세지보내기 상태", ws.ws.readyState);
    }
  };

  const sendBen = (other_user_id, other_user_name) => {
    try {
      // 토큰없으면 다시 로그인 시키기
      if (!token) {
        customAlert.sweetNeedLogin("replace");
      }
      // send할 데이터
      const data = {
        type: "BAN",
        roomId: room_id,
        senderId: sender_id,
        // 강퇴할 사람 user_id
        message: other_user_id,
      };

      // 로딩
      // dispatch(chatActions.loading());
      waitForConnection(ws, () => {
        ws.debug = null;

        ws.send("/pub/message", { token: token }, JSON.stringify(data));
        logger("강퇴 메세지 상태", ws.ws.readyState);
        customAlert.sweetConfirmReload(
          "퇴장 시키기 완료",
          [`${other_user_name}님이 퇴장 되었습니다.`],
          ""
        );
      });
    } catch (e) {
      customAlert.sweetConfirmReload(
        "퇴장 에러",
        ["퇴장 요청중 에러 발생"],
        ""
      );
      logger("message 소켓 함수 에러", e);
      logger("강퇴 메세지 상태", ws.ws.readyState);
    }
  };

  // 방장 방폭 함수
  const sendBreak = () => {
    try {
      // 토큰없으면 다시 로그인 시키기
      if (!token) {
        customAlert.sweetNeedLogin("replace");
      }
      // send할 데이터
      const data = {
        type: "BREAK",
        roomId: room_id,
        senderId: sender_id,
        message: "방장이 방을 폭파시켰습니다. 안녕히가세요 :)",
      };

      // 로딩
      // dispatch(chatActions.loading());
      waitForConnection(ws, () => {
        ws.debug = null;

        ws.send("/pub/message", { token: token }, JSON.stringify(data));
        logger("강퇴 메세지 상태", ws.ws.readyState);
      });
    } catch (e) {
      customAlert.sweetConfirmReload(
        "방폭 에러",
        ["방폭 요청중 에러 발생"],
        ""
      );
      logger("message 소켓 함수 에러", e);
      logger("방폭 메세지 상태", ws.ws.readyState);
    }
  };

  if (!room_id) {
    return (
      // alert("잘못된 접근입니다")
      <React.Fragment>
        <Spinner />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <PcSide {...props} />
        <Grid
          // maxWidth="36rem"
          minHeight="100vh"
          // border={border.line1}
          margin="0 auto"
          bg="#7B6E62"
        >
          <Grid shape="container" align_items="flex-end" bg="#7B6E62">
            <SideGrid isOpen={isOpen}>
              <Sidebar
                transitions={true}
                touch={true}
                pullRight={true}
                sidebar={
                  <SideContent
                    own_user_id={own_user_id}
                    order_time={order_time}
                    roomName={roomName}
                    _onClick={onClick}
                    post_id={post_id}
                    sendBen={sendBen}
                    sendBreak={sendBreak}
                  />
                }
                open={isOpen}
                onSetOpen={setIsOpen}
                sidebarClassName={isOpen ? "side-nav active" : "side-nav"}
                styles={{
                  content: { text_align: "right" },
                }}
              >
                <></>
              </Sidebar>
            </SideGrid>
            <Header
              {...props}
              shape="채팅방"
              roomName={roomName}
              _onClick={onClick}
            >
              {roomName}
            </Header>

            <MessageList />
            <MessageWrite sendMessage={sendMessage} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
};

const SideGrid = styled.div`
  position: absolute;
  width: 30rem;
  height: 100vh;
  z-index: 101;
  text-align: right;
  display: ${(props) => (props.isOpen ? "auto" : "none")};
`;

export default Chat;
