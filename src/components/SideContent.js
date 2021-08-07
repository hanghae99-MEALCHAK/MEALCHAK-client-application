import React from "react";
import { useSelector } from "react-redux";
import { Grid, Text, Image } from "../elements";
import { ChatUserItem } from ".";
import theme from "../styles/theme";
import { FiLogOut } from "react-icons/fi";
import logger from "../shared/Console";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { customAlert } from "./Sweet";

const SideContent = (props) => {
  const user_in_chat = useSelector((state) => state.chat.userInList);
  const my_id = useSelector((state) => state.user.user?.user_id);

  React.useEffect(() => {
    logger("사용자 목록", user_in_chat);
    logger("방이름", props.roomName);
  }, []);

  const { color, border, fontSize } = theme;

  return (
    <React.Fragment>
      <Container>
        <Grid shape="container" text_align="left">
          <Grid
            borderBottom={border.line2}
            padding="1.6rem 1rem 1.6rem 2.4rem"
            is_flex="t"
          >
            <Text size={fontSize.base} bold2="700">
              {props.roomName}
            </Text>
            <Grid width="2.4rem">
              <IoClose
                size="24"
                color={color.bg100}
                style={{
                  cursor: "pointer",
                }}
                onClick={props._onClick}
              />
            </Grid>
          </Grid>

          <Grid padding="1.6rem 0 0.8rem 2.4rem">
            <Text size={fontSize.base} color={color.bg80}>
              대화상대
              <span
                style={{
                  padding: "0 0.6rem",
                  fontSize: fontSize.base,
                  fontWeight: 700,
                  color: color.brand100,
                }}
              >
                {user_in_chat.length}
              </span>
            </Text>
          </Grid>

          {user_in_chat.map((user_info, idx) => {
            if (my_id === user_info?.user_id) {
              return (
                <ChatUserItem key={idx} user_info={user_info} shape="is_me" />
              );
            }
          })}
          {user_in_chat.map((user_info, idx) => {
            if (my_id !== user_info?.user_id) {
              return <ChatUserItem key={idx} user_info={user_info} />;
            }
          })}
        </Grid>
        <Grid
          borderTop={border.line2}
          position="absolute"
          align_items="flex-end"
          flex
          padding="1.3rem 0 1.3rem 2.4rem"
          height="auto"
          bg={color.bg0}
        >
          <FiLogOut 
          size="2.4rem" 
          style={{ cursor: "pointer" }} 
          onClick={() => {
            customAlert.SweetOutChat(props.post_id);
          }}
          />
        </Grid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 5rem 5rem auto 5rem;
  grid-auto-rows: minmax(100vh, auto);
`;

export default SideContent;
