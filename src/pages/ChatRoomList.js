import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { history } from "../redux/configureStore";

// socket 함수
import { socketFuntion as sf } from "../shared/SocketFn";

// style
import { Header, Footer, ChatListItem } from "../components";
import { Button, Grid, Input, Text } from "../elements";
import theme from "../styles/theme";

const ChatRoomList = (props) => {
    const dispatch = useDispatch();
    React.useEffect(()=>{
        dispatch(chatActions.getChatListAX());
    },[])

  // 현재 roomid 필요

  const { color, border, radius, fontSize } = theme;

  // 채팅 목록
  const chat_list = useSelector(state => state.chat.chatListInfo)

  const enterRoom = (roomId, roomName) => {
    // 채팅방 들어갔다가 뒤로가기 누르면 자동으로 방나가기
    // roomId 리덕스에 저장된 걸로 실제 채팅 페이지 이동했을 때 서버연결 시켜서 보여줌

    // 채팅 시작하기 버튼 누를때 입장 axios 요청 
    // 동시에 구독
    // /chat/join/${roomId}
    dispatch(chatActions.clearMessage());
    dispatch(chatActions.moveChatRoom(roomId, roomName));
    dispatch(chatActions.getChatMessagesAX());
    history.replace({pathname: '/chatting', state: {roomId: roomId, roomName: roomName}});
  };

  return (
    <React.Fragment>
      <Grid
        maxWidth="36rem"
        minHeight="100vh"
        border={border.line1}
        margin="0 auto"
        padding="0 0 6rem 0"
      >
        <Grid shape="container">
          <Header {...props} shape="채팅리스트" />
          <Grid borderBottom={border.boldLine} />

          {chat_list.map((info, idx) => {
            return (
              <ChatListItem
                key={idx}
                roomId={info.roomId}
                roomName={info.title}
                _onClick={(e) => {
                    enterRoom(info.roomId, info.roomName);
                }}
              />
            );
          })}

          <Footer {...props}></Footer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

ChatRoomList.defaultProps = {
  chatRoom: [
    {
      roomId: 1,
      post_id: 1,
      title: "떡볶이를 조지자",
      roomImg: "https://image.flaticon.com/icons/png/512/610/610413.png",
    },
    {
      roomId: 2,
      post_id: 2,
      title: "탕수육 먹을 분 구함",
      roomImg: "https://image.flaticon.com/icons/png/512/610/610413.png",
    },
    {
      roomId: 3,
      post_id: 3,
      title: "닭똥집 같이 시키실 분",
      roomImg: "https://image.flaticon.com/icons/png/512/610/610413.png",
    },
  ],
};

export default ChatRoomList;
