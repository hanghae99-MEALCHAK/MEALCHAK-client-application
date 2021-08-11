import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as chatActions } from '../redux/modules/chat';
import { actionCreators as userAction } from '../redux/modules/user';
import { history } from '../redux/configureStore';
import { token } from '../shared/OAuth';

// style
import { Header, Footer, ChatListItem, AwaitList } from '../components';
import { Button, Grid, Input, Text } from '../elements';
import theme from '../styles/theme';
import styled from 'styled-components';

import logger from '../shared/Console';

const ChatRoomList = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userAction.loginCheck());
    if (token) {
      dispatch(chatActions.setChatListAX());
      dispatch(chatActions.awaitChatListAX());
    }
  }, []);

  // 현재 room_id 필요

  const { color, border, radius, fontSize } = theme;

  // 채팅 목록
  const chat_list = useSelector((state) => state.chat.chatListInfo);

  // 채팅 대기 목록
  const await_list = useSelector((state) => state.chat.awaitList);

  const enterRoom = (room_id, roomName, post_id, own_user_id, order_time) => {
    // 채팅방 들어갔다가 뒤로가기 누르면 자동으로 방나가기
    // room_id 리덕스에 저장된 걸로 실제 채팅 페이지 이동했을 때 서버연결 시켜서 보여줌

    // 채팅 시작하기 버튼 누를때 입장 axios 요청
    // 동시에 구독
    // /chat/join/${room_id}
    dispatch(chatActions.clearMessage());
    dispatch(
      chatActions.moveChatRoom(
        room_id,
        roomName,
        post_id,
        own_user_id,
        order_time
      )
    );
    history.replace({
      pathname: '/chatting',
      state: {
        room_id: room_id,
        roomName: roomName,
        post_id: post_id,
        own_user_id: own_user_id,
        order_time: order_time,
      },
    });
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
          <Grid height="4.4rem" />

          <Grid is_flex4="t" text_align="center" borderBottom={border.line1}>
            <Grid
              borderBottom={border.line3}
              width="auto"
              padding="0 2rem"
              margin="auto"
              _onClick={() => {
                history.push('/chatlist');
              }}
              cursor="pointer"
            >
              <Text size={fontSize.base} bold2="700" margin="0 0 0.8rem">
                참여중인 채팅방
              </Text>
            </Grid>
            <Grid width="auto" padding="0 2rem" margin="auto">
              <Text
                bold2="700"
                size={fontSize.base}
                margin="0 0 0.8rem"
                color={color.bg60}
                _onClick={() => {
                  history.push('/allowchat');
                }}
                cursor="pointer"
              >
                들어온 승인 요청
              </Text>
            </Grid>
          </Grid>
          {chat_list.map((info, idx) => {
            return (
              <ChatListItem
                key={idx}
                live_chat={info.live_chat}
                room_id={info.room_id}
                roomName={info.roomName}
                post_id={info.postId}
                headCountChat={info.headCountChat}
                _onClick={(e) => {
                  enterRoom(
                    info.room_id,
                    info.roomName,
                    info.postId,
                    info.own_user_id,
                    info.order_time
                  );
                }}
              />
            );
          })}

          {await_list.map((info, idx) => {
            return (
              <AwaitList
                key={idx}
                roomName={info.title}
                join_id={info.join_id}
              />
            );
          })}

          {await_list.length === 0 && chat_list.length === 0 && (
            <>
              <Grid shape="empty" src="illust/emptyBubbles.png">
                <EmptyText theme={theme}>아직 채팅 내용이 없어요.</EmptyText>
              </Grid>
              <Grid height="20rem"></Grid>
            </>
          )}

          <Footer {...props}></Footer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

ChatRoomList.defaultProps = {};

const EmptyText = styled.p`
  position: relative;
  text-align: center;
  top: 15rem;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.color.bg80};
`;

export default ChatRoomList;
