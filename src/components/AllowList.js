import React from "react";
import theme from "../styles/theme";
import { Grid, Text, Image, Button } from "../elements";
import logger from "../shared/Console";
import { customAlert } from "./Sweet";
import { history } from "../redux/configureStore";

const AllowList = (props) => {
  const { color, border, fontSize } = theme;
  const { roomName, join_id, user_id, user_img, username } = props;

  React.useEffect(() => {
    logger("승인요청대기 페이지", props);
  }, []);

  return (
    <React.Fragment>
      <Grid padding="1.6rem 2rem" borderBottom={border.line2}>
        <Grid shape="container" borderBottom={border.bg20}>
          <Grid is_flex4="t" width="100%" margin="0 0 1.9rem">
            <Grid
              is_flex4="t"
              margin="0 1rem 0 0"
              width="auto"
              cursor="pointer"
              _onClick={() => {
                history.push({
                  pathname: "/userprofile",
                  state: { ...props },
                });
              }}
            >
              <Image src={user_img} size="5"></Image>
            </Grid>

            <Grid maxWidth="18rem">
              <Text
                color={color.bg100}
                size={fontSize.base}
                word_break="keep-all"
              >
                {username} 님의 승인 요청
              </Text>
              <Text
                white_space="nowrap"
                color={color.bg80}
                size={fontSize.small}
                overflow="hidden"
                text_overflow="ellipsis"
              >
                {roomName}
              </Text>
            </Grid>
          </Grid>

          <Grid is_flex4="t" width="auto">
            <Button
              height="4.4rem"
              margin="0 0.5rem 0 0"
              border="none"
              bg={color.brand20}
              radius="1.2rem"
              _onClick={() => {
                customAlert.SweetDenyChat(join_id);
              }}
              cursor="pointer"
            >
              <Text
                color={color.brand100}
                padding="0 1rem"
                size={fontSize.small}
                bold2="700"
              >
                거절하기
              </Text>
            </Button>
            <Button
              height="4.4rem"
              margin="0 0 0 0.5rem"
              border="none"
              bg={color.brand100}
              radius="1.2rem"
              _onClick={() => {
                customAlert.SweetAllowChat(join_id);
              }}
              cursor="pointer"
            >
              <Text
                color={color.bg0}
                padding="0 1rem"
                size={fontSize.small}
                bold2="700"
              >
                승인하기
              </Text>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AllowList;
