import React from "react";

// style
import { Header, Footer, ChatListItem } from "../components";
import { Button, Grid, Input, Text } from "../elements";
import theme from "../styles/theme";

// 소켓 통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const ChatRoomList = (props) => {
  const sock = new SockJS("http://34.64.109.170:7777/chatting");
  const ws = Stomp.over(sock);

  // 현재 roomid 필요
  //  const roomId = useSelector((state) => state.chat.currentChat.roomId);

  const { color, border, radius, fontSize } = theme;

  // 채팅 가짜 데이터
  const chat_list = props.chatRoom;

  const enterRoom = (roomId) => {
    // 채팅방 들어갔다가 뒤로가기 누르면 자동으로 방나가기
    // roomId 리덕스에 저장된 걸로 실제 채팅 페이지 이동했을 때 서버연결 시켜서 보여줌
  };

  return (
    <React.Fragment>
      <Grid
        maxWidth="36rem"
        minHeight="100vh"
        border={border.line1}
        margin="0 auto"
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
                roomImg={info.roomImg}
                _onClick={(e) => {}}
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
