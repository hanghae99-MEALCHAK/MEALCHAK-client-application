import React from "react";
import theme from "../styles/theme";
import { Grid, Text, Image } from "../elements";
import logger from "../shared/Console";
import { customAlert } from "./Sweet";

const AllowList = (props) => {
  const { color, border, fontSize } = theme;
  const { roomName, join_id, user_id, user_img, username } = props;

  React.useEffect(() => {
    logger("승인요청대기 페이지", props);
  }, []);

  return (
    <React.Fragment>
      <Grid
        justify_content="space-between"
        is_flex4="t"
        padding="1.9rem 2rem"
        borderBottom={border.bg20}
      >
        <Grid is_flex4="t" width="70%">
          <Grid width="5rem" is_flex4="t" margin="0 1rem 0 0">
            <Image src={user_img}></Image>
          </Grid>

          <Grid shape="container" maxWidth="18rem">
            <Text
              white_space="nowrap"
              color={color.bg100}
              size={fontSize.base}
              overflow="hidden"
              text_overflow="ellipsis"
            >
              {roomName}
            </Text>
            <Text color={color.bg80} size={fontSize.small}>
              {username}
            </Text>
          </Grid>
        </Grid>

        <Grid shape="container" width="auto">
          <Grid
            bg={color.brand100}
            radius="1.2rem"
            margin="0 0 0.5rem"
            _onClick={() => {
                customAlert.SweetAllowChat(join_id);
            }}
            cursor="pointer"
          >
            <Text color={color.bg0} padding="0 1rem">
              수락
            </Text>
          </Grid>
          <Grid
            bg={color.brand20}
            radius="1.2rem"
            _onClick={() => {
                customAlert.SweetDenyChat(join_id);
            }}
            cursor="pointer"
          >
            <Text color={color.brand100} padding="0 1rem">
              거절
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AllowList;
