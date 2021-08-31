// 채팅 승인 요청 수락, 거절 페이지
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { history } from "../redux/configureStore";

// style
import styled from "styled-components";
import { Header, Footer, AllowList, PcSide } from "../components";
import { Grid, Text, Image } from "../elements";
import theme from "../styles/theme";
import { TapGrid } from "./ChatRoomList";

// 이미지
import { png } from "../styles/img/index";
import { webp } from "../styles/img/webp/index";
import { isWebpSupported } from "react-image-webp/dist/utils";

const AllowChat = (props) => {
  const dispatch = useDispatch();
  const { color, border, fontSize } = theme;

  // 첫 렌더시 들어온 요청 목록 조회
  React.useEffect(() => {
    dispatch(chatActions.requestChatListAX());
  }, []);

  // 채팅 승인 목록
  const allow_list = useSelector((state) => state.chat.requestList);
  // 채팅 알림 여부 판단
  const is_alarm = useSelector((state) => state.user.user?.new_join_request);

  return (
    <React.Fragment>
      <PcSide {...props} />
      <Grid
        minWidth="36rem"
        minHeight="100vh"
        margin="0 auto"
        padding="0 0 5.2rem 0"
      >
        <Grid shape="container">
          <Header {...props} shape="채팅리스트" />
          <Grid height="4.4rem" />
          <Footer {...props}></Footer>
        </Grid>
        <TapGrid>
          <Grid
            width="100%"
            padding="0 2rem"
            margin="0"
            _onClick={() => {
              history.push("/chatlist");
            }}
            cursor="pointer"
          >
            <Text
              size={fontSize.base}
              margin="0 0 0.8rem"
              color={color.bg60}
              bold2="700"
            >
              참여중인 채팅방
            </Text>
          </Grid>
          <Grid
            borderBottom={border.line3}
            width="100%"
            padding="0 2rem"
            margin="0"
            _onClick={() => {
              history.push("/allowchat");
            }}
            cursor="pointer"
            position="relative"
          >
            <Grid
              width="fit-content"
              height="fit-content"
              position="absolute"
              top="-0.6rem"
              right="1.2rem"
            >
              {is_alarm && (
                <Image
                  size="0.9"
                  src={isWebpSupported() ? webp.alarmWebp : png.alarm}
                />
              )}
            </Grid>
            <Text size={fontSize.base} bold2="700" margin="0 0 0.8rem">
              들어온 승인 요청
            </Text>
          </Grid>
        </TapGrid>

        {/* 들어온 승인 요청 항목 리스트*/}
        {allow_list.map((info, idx) => {
          return (
            <AllowList
              key={idx}
              join_id={info.join_id}
              roomName={info.title}
              user_id={info.user_id}
              user_img={info.user_img}
              username={info.username}
            />
          );
        })}

        {/* 들어온 요청이 없는 경우 기본 이미지*/}
        {allow_list.length === 0 && (
          <>
            <Grid
              shape="empty" // 화면 중앙에 이미지 정렬
              src={isWebpSupported() ? webp.emptyBubblesWebp : png.emptyBubbles}
            >
              <EmptyText theme={theme}>아직 들어온 요청이 없어요.</EmptyText>
            </Grid>
            <Grid height="20rem"></Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  );
};

AllowChat.defaultProps = {};

const EmptyText = styled.p`
  position: relative;
  text-align: center;
  top: 15rem;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.color.bg80};
`;
export default AllowChat;
