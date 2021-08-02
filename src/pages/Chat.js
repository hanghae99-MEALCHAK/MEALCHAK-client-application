import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { token } from "../shared/OAuth";
import { history } from "../redux/configureStore";

// 소켓 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";

// style
import Spinner from "../shared/Spinner"
import { Header, MessageList, MessageWrite } from "../components";
import { Grid, Text } from "../elements";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { actionCreators as postActions } from "../redux/modules/post";
import theme from "../styles/theme";
import logger from "../shared/Console";

const Chat = (props) => {
  // 소켓
  const sock = new SockJS("http://52.78.204.238/chatting");
  const ws = Stomp.over(sock);

  // 현재 방정보
  const dispatch = useDispatch();

  // const roomName = props.history.location.state.roomName;
  // const roomId = props.history.location.state.roomId;
  const roomName = useSelector((state) => state.chat.currentChat.roomName);
  const roomId = useSelector((state) => state.chat.currentChat.roomId);

  const { border } = theme;

  React.useEffect(() => {
    logger("chat props", props);
    dispatch(chatActions.moveChatRoom(roomId, roomName));
  }, []);

  React.useEffect(() => {
    if(!roomId){
      alert("잘못된 접근입니다.\n홈으로 돌아갑니다.")
      history.replace("/home")
      return;
    }
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [roomId]);

  // 채팅방시작하기, 채팅방 클릭 시 roomid에 해당하는 방을 구독
  const wsConnectSubscribe = () => {
    try {
      ws.connect(
        {
          token: token,
        },
        () => {
          ws.subscribe(
            `sub/api/chat/rooms/${roomId}`,
            (data) => {
              const newMessage = JSON.parse(data.body);
              dispatch(chatActions.getMessages(newMessage));
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
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0");
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
    }, 1);
  };

  const sendMessage = (roomId, sender, messageText) => {
    try {
      // 토큰없으면 다시 로그인 시키기
      if (!token) {
        alert("로그인이 필요한 기능입니다. 로그인을 해주세요");
        history.replace("/");
      }
      // send할 데이터
      const data = {
        type: "TALK",
        roomId: roomId,
        sender: sender,
        message: messageText,
      };
      // 빈 텍스트일때 보내기 방지
      if (messageText === "") {
        alert("메세지를 입력해주세요.");
        return;
      }
      // 로딩
      // dispatch(chatActions.isLoading());
      waitForConnection(ws, () => {
        ws.send("/pub/message", { token: token }, JSON.stringify(data));
        logger("메세지보내기 상태", ws.ws.readyState);

        // 메세지 보내고 나면 다시 초기화시켜주는 작업
        // dispatch(chatActions.writeMessage(""));
      });
    } catch (e) {
      logger("message 소켓 함수 에러", e);
    }
  };

  if (!roomId) {
    return (
      // alert("잘못된 접근입니다")
      <React.Fragment>
        <Spinner/>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Grid
          maxWidth="36rem"
          minHeight="100vh"
          border={border.line1}
          margin="0 auto"
          bg="#7B6E62"
        >
          <Grid shape="container">
            <Header {...props} shape="채팅방">
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

export default Chat;
