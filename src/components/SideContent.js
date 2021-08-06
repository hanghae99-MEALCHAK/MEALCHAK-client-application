import React from "react";
import { useSelector } from "react-redux";
import { Grid, Text, Image } from "../elements";
import { ChatUserItem } from ".";
import theme from "../styles/theme";
import { FiLogOut } from "react-icons/fi";
import logger from "../shared/Console";

const SideContent = (props) => {
  const user_in_chat = useSelector((state) => state.chat.userInList);

  React.useEffect(() => {
    logger("사용자 목록", user_in_chat);
    logger("방이름", props.roomName);
  }, []);

  const { color, border, fontSize } = theme;

  return (
    <React.Fragment>
      <Grid shape="container" text_align="left">
        <Grid borderBottom={border.line2} padding="1.6rem 2.4rem">
          <Text size={fontSize.base} bold2="700">
            {props.roomName}
          </Text>
        </Grid>
        <Grid shape="container">
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
          <Grid position="absolute">
                
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SideContent;
