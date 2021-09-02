// 실제 채팅이 이루어지는 채팅방 페이지
import React from "react";
import moment from "moment";
import logger from "../shared/Console";
import { token } from "../shared/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { actionCreators as userAction } from "../redux/modules/user";

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
import { customAlert } from "../components/Sweet";
import "../styles/side.css";

// side bar
import Sidebar from "react-sidebar";

const Chat = (props) => {
  // side bar 열기, 닫기 상태 관리
  const [isOpen, setIsOpen] = React.useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };

  // 배포, 개발 환경 채팅 주소 관리
  const env = process.env.NODE_ENV;
  const devTarget =
    env === "development" ? "http://115.85.182.57/chatting" : "https://gorokke.shop/chatting";
  // 소켓
  const sock = new SockJS(devTarget);
  const ws = Stomp.over(sock);

  // 현재 방정보
  // ChatRoomList에서 받아오는 정보
  // 채팅 목록 조회시 받아온 정보로 특정 채팅방 입장
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

  // 새로고침될때 방 정보 날아가지 않도록 함
  React.useEffect(() => {
    logger("chat props", props);
    logger("chat sender info", sender_profile);
    logger("chat user_in_chat", user_in_chat);
    dispatch(userAction.loginCheck());

    // 리덕스의 현재방 정보 변경
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
      // 이전 대화 기록 불러오기
      dispatch(chatActions.getChatMessagesAX());
      // 현재 채팅방 참여 사용자 정보 불러오기
      dispatch(chatActions.getChatUserAX(room_id));
    }
  }, []);

  // 방 정보가 바뀌면 소켓 연결 구독, 구독해제
  React.useEffect(() => {
    // 방 정보가 없는 경우 홈으로 돌려보내기
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
        customAlert.sweetNeedLogin();
      }
      // send할 데이터
      const data = {
        type: "TALK",
        roomId: room_id,
        sender: sender_nick,
        senderImg: sender_profile,
        senderId: sender_id,
        message: new_message,
      };
      waitForConnection(ws, () => {
        ws.debug = null;

        ws.send("/pub/message", { token: token }, JSON.stringify(data));
        logger("메세지보내기 상태", ws.ws.readyState);
      });
    } catch (e) {
      logger("message 소켓 함수 에러", e);
      logger("메세지보내기 상태", ws.ws.readyState);
    }
  };

  // 방장이 악성 유저 강퇴 시키도록 만든 강퇴 함수
  const sendBen = (other_user_id, other_user_name) => {
    try {
      // 토큰없으면 다시 로그인 시키기
      if (!token) {
        customAlert.sweetNeedLogin();
      }
      // send할 데이터
      const data = {
        type: "BAN",
        roomId: room_id,
        senderId: sender_id,
        // 강퇴할 사람 user_id
        message: other_user_id,
      };
      waitForConnection(ws, () => {
        ws.debug = null;

        ws.send("/pub/message", { token: token }, JSON.stringify(data));
        logger("강퇴 메세지 상태", ws.ws.readyState);
        customAlert.sweetOK(
          "퇴장 처리가 완료되었어요",
          `${other_user_name}님을`,
          `채팅에서 내보냈어요.`,
          ""
        );
      });
    } catch (e) {
      customAlert.sweetConfirmReload(
        "퇴장 처리 실패",
        ["채팅에서 내보내는 데 실패했어요.", "잠시 후 다시 시도해주세요."],
        ""
      );
      logger("message 소켓 함수 에러", e);
      logger("강퇴 메세지 상태", ws.ws.readyState);
    }
  };

  // 방장 채팅방 나가기 함수
  // 방장이 나가면 채팅방이 사라지고, 글이 삭제 됩니다.
  const sendBreak = () => {
    try {
      // 토큰없으면 다시 로그인 시키기
      if (!token) {
        return customAlert.sweetNeedLogin();
      }
      // send할 데이터
      const data = {
        type: "BREAK",
        roomId: room_id,
        senderId: sender_id,
        message: "방장이 삭제한 채팅방이에요.",
      };
      waitForConnection(ws, () => {
        ws.debug = null;

        ws.send("/pub/message", { token: token }, JSON.stringify(data));
        logger("방폭 메세지 상태", ws.ws.readyState);
      });
    } catch (e) {
      customAlert.sweetConfirmReload(
        "방 삭제 실패",
        ["방 삭제 요청에 실패했어요."],
        ""
      );
      logger("message 소켓 함수 에러", e);
      logger("방폭 메세지 상태", ws.ws.readyState);
    }
  };

  // 메세지가 변할 때마다 스크롤 이동시켜주기
  const messages = useSelector((state) => state.chat.messages);

  // 스크롤 대상
  const messageEndRef = React.useRef();

  const scrollTomBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  };
  // 렌더링시 이동
  React.useEffect(() => {
    scrollTomBottom();
    logger("tell me you are moving now", messageEndRef);
  }, [messages.length]);

  // 방 정보가 없는 경우 
  if (!room_id) {
    return (
      <React.Fragment>
        <Spinner />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <PcSide {...props} />
        <Container ref={messageEndRef}>
          <Grid shape="container" align_items="flex-end">
            {/* 채팅방 안 사이드 메뉴 창 */}
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

            {/* 메세지 뷰 */}
            <MessageList />
            {/* 메세지 보내기 input */}
            <MessageWrite sendMessage={sendMessage} />
          </Grid>
        </Container>
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
  touch-action: none;
`;

const Container = styled.div`
  --inputBox: 4.4rem;
  height: 100vh;
  margin: 0 auto;
  background-color: #7b6e62;
  width: 100%;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Chat;
