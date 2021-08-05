import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { history } from "../redux/configureStore";

// style
import { Header, Footer, AllowList } from "../components";
import { Button, Grid, Input, Text } from "../elements";
import theme from "../styles/theme";
import logger from "../shared/Console";

const AllowChat = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(chatActions.requestChatListAX());
  }, []);

  // 현재 room_id 필요

  const { color, border, radius, fontSize } = theme;

  // 채팅 승인 목록
  const allow_list = useSelector((state) => state.chat.requestList);

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

          <Grid is_flex4="t" text_align="center" borderBottom={border.line1}>
            <Grid
              width="auto"
              padding="0 2rem"
              margin="auto"
              _onClick={() => {
                history.push("/chatlist");
              }}
              cursor="pointer"
            >
              <Text size={fontSize.base} margin="0 0 0.8rem" color={color.bg60}>
                참여중인 채팅방
              </Text>
            </Grid>
            <Grid
              borderBottom={border.line3}
              width="auto"
              padding="0 2rem"
              margin="auto"
              _onClick={() => {
                history.push("/allowchat");
              }}
              cursor="pointer"
            >
              <Text size={fontSize.base} bold2="700" margin="0 0 0.8rem">
                들어온 승인 요청
              </Text>
            </Grid>
          </Grid>

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

          {allow_list.length === 0 && (
              <Grid>
                  
              </Grid>
          )}

          <Footer {...props}></Footer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

AllowChat.defaultProps = {};

export default AllowChat;
