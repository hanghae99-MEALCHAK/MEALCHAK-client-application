import React from 'react';
import styled from 'styled-components';
import { actionCreators as chatActions } from '../redux/modules/chat';
import { useDispatch } from 'react-redux';
import { socketFuntion as sf } from '../shared/SocketFn';

import { Grid, Image, Text, Button } from '../elements';
import { history } from '../redux/configureStore';
import logger from '../shared/Console';
import theme from '../styles/theme';

const Post = (props) => {
  const { color, fontSize } = theme;
  const dispatch = useDispatch();

  // 채팅 시작하면 서버에 게스트 입장 요청
  // 구독, 채팅 시작
  const enterRoom = (roomId, roomName, postId) => {
    dispatch(chatActions.enterRoomAX(postId));
    dispatch(chatActions.clearMessage());
    dispatch(chatActions.moveChatRoom(roomId, roomName));
    history.replace({
      pathname: '/chatting',
      state: { roomId: roomId, roomName: roomName },
    });
  };

  // 내 위치에서부터 얼마나 떨어져있는지 보여주는 변수(소수점이므로 1000을 곱해 m로 나타냄)
  const distance = props.distance * 1000;
  return (
    <React.Fragment>
      <Grid
        maxWidth="32rem"
        margin="0 auto 2rem auto"
        bg={color.bg0}
        border="0.1rem solid #EBE9E8"
        radius={fontSize.base}
      >
        <Grid is_float="left" margin="0.5rem 1.5rem 1.5rem 1.5rem">
          <Grid is_flex>
            <UserProfile src={props.userImg} />
            <Grid>
              <Grid is_flex>
                <Text size={fontSize.small} color={color.bg100} bold2="500">
                  {props.username}
                </Text>
                <Grid
                  maxWidth="9.1rem"
                  height="2.3rem"
                  bg={color.bg20}
                  radius="0.5rem"
                  padding="0.4rem 0.8rem"
                  margin="0 3.3rem 0 0"
                >
                  <Text
                    size="1rem"
                    text_align="center"
                    color={color.success100}
                    bold
                  >
                    모집 인원 2/4명
                  </Text>
                </Grid>
              </Grid>
              <Text size="1rem" color={color.bg80} bold2="400">
                {props.insert_dt}
              </Text>
            </Grid>
          </Grid>
        </Grid>
        <Grid maxWidth="29rem" margin="0 1.5rem">
          <Grid>
            <Text
              size={fontSize.postBox}
              line_height="150%"
              color={color.bg100}
              bold
              margin="0 0 1rem 0"
            >
              {props.title}
            </Text>
            <Text
              width="28.8rem"
              height="4rem"
              margin="0 0 1rem 0"
              size={fontSize.small}
              line_height="150%"
              color={color.bg100}
              bold2="400"
              overflow="hidden"
              display="-webkit-box"
              webkit_line="2"
              webkit_box_orient="vertical"
            >
              {props.contents}
            </Text>
          </Grid>
          <Hr />
          <Grid>
            <Grid is_flex4>
              <Text
                size={fontSize.small}
                bold2="400"
                line_height="150%"
                color={color.bg80}
                margin="1rem 0"
              >
                배달 받을 곳
              </Text>
              <Text
                height="1.5rem"
                size="1rem"
                bold2="500"
                color={color.success100}
                line_height="150%"
                margin="0 0 0 1rem"
              >
                {distance > 999
                  ? `내 위치로부터 ${(distance / 1000).toFixed(2)}km`
                  : `내 위치로부터 ${distance}m`}
              </Text>
            </Grid>
            <Text
              width="29rem"
              height="2rem"
              size="1.3rem"
              bold2="500"
              line_height="150%"
              color="#36373C"
              margin="0 0 1rem 0"
              overflow="hidden"
              text_overflow="ellipsis"
              white_space="nowrap"
              display="block"
            >
              {props.address}
            </Text>
          </Grid>
          <Hr />

          <Grid is_flex align_items="center">
            <Grid>
              <Text
                size={fontSize.small}
                bold2="400"
                line_height="150%"
                color={color.bg80}
                margin="1rem 0"
              >
                배달 식당
              </Text>
              <Text
                width="13.6rem"
                size="1.3rem"
                bold2="500"
                line_height="150%"
                color="#36373C"
                margin="0 0 1rem 0"
                overflow="hidden"
                text_overflow="ellipsis"
                white_space="nowrap"
                display="block"
              >
                {props.shop}
              </Text>
            </Grid>
            <Grid is_float="right">
              <Grid text_align="left" padding="0 0 0 1rem">
                <Text
                  size={fontSize.small}
                  bold2="400"
                  line_height="150%"
                  color={color.bg80}
                  margin="1rem 0"
                >
                  주문 예정 시각
                </Text>
                <Text
                  width="13.6rem"
                  size="1.3rem"
                  bold2="500"
                  line_height="150%"
                  color="#36373C"
                  margin="0 0 1rem 0"
                >
                  {props.orderTime}
                </Text>
              </Grid>
            </Grid>
          </Grid>
          <Grid is_flex maxWidth="29rem" margin="0 0 1.5rem 0">
            <Button
              width="14rem"
              height="4.4rem"
              radius="1.2rem"
              bg={color.brand20}
              border="none"
              color={color.brand100}
              size={fontSize.small}
              bold={fontSize.bold}
              _onClick={() => {
                history.push(`/post/${props.post_id}`);
              }}
            >
              자세히 보기
            </Button>
            <Button
              width="14rem"
              height="4.4rem"
              radius="1.2rem"
              bg={color.brand100}
              border="none"
              color={color.bg0}
              size={fontSize.small}
              bold={fontSize.bold}
              cursor="pointer"
              _onClick={(e) => {
                enterRoom(6, props.title, props.post_id);
              }}
            >
              채팅 시작하기
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {};

const UserProfile = styled.div`
  width: 4.3rem;
  height: 3.8rem;
  border-radius: 2rem;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  margin: 1rem 1rem 1rem 0;
`;

const Hr = styled.hr`
  width: 29rem;
  background-color: #f4f4f3;
  border: 0.1rem solid #f4f4f3;
  margin: 0;
`;
export default Post;
