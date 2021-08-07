import React from "react";
import { useSelector } from "react-redux";
import { Grid, Text, Image } from "../elements";
import { ChatUserItem } from ".";
import theme from "../styles/theme";
import { FiLogOut } from "react-icons/fi";
import logger from "../shared/Console";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const SideContent = (props) => {
  const user_in_chat = useSelector((state) => state.chat.userInList);

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

          <Grid padding="1.6rem 0 0 2.4rem">
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

          <ChatUserItem />
        </Grid>
        <Grid
          position="absolute"
          align_items="flex-end"
          flex
          padding="0 2rem 2rem"
          height="auto"
        >
          <FiLogOut size="2.4rem" />
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
