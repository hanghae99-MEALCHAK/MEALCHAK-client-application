import React from "react";
import { Grid, Image, Text } from "../elements";
import theme from "../styles/theme";
import { history } from "../redux/configureStore";

const ChatUserItem = (props) => {
  const { fontSize, color } = theme;
  const user_info = props.user_info;
  const shape = props.shape;

  if (shape === "is_me") {
    return (
      <Grid is_flex4="t" padding="0.8rem 0 0.8rem 2rem">
        <Image src={user_info.user_img}></Image>
        <Text padding="0 0.5rem" bold2="700">
          나 ({user_info.user_name})
        </Text>
      </Grid>
    );
  }

  return (
    <Grid is_flex4="t" padding="0.8rem 0 0.8rem 2rem">
      <Image
        cursor="pointer"
        shape="circle"
        src={user_info.user_img}
        _onClick={() => {
            history.push({
                pathname: "/userprofile",
                state: { ...user_info },
              });
        }}
      ></Image>
      <Text padding="0 0.5rem">{user_info.user_name}</Text>
    </Grid>
  );
};

export default ChatUserItem;
