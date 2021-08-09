import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import theme from "../styles/theme";
import { history } from "../redux/configureStore";
import { IoIosCloseCircle } from "react-icons/io";
import { customAlert } from "./Sweet";
import logger from "../shared/Console";

const ChatUserItem = (props) => {
  const { fontSize, color, radius } = theme;
  const user_info = props.user_info;
  const shape = props.shape;
  const owner = props.owner;

  React.useEffect(() => {
    logger("sendBen 찾기", props);
  }, []);

  if (shape === "is_me") {
    return (
      <Grid is_flex4="t" padding="0.8rem 0 0.8rem 2rem">
        <Image src={user_info.user_img}></Image>
        <Text padding="0 0.5rem" bold2="700" size={fontSize.base}>
          나 ({user_info.user_name})
        </Text>
      </Grid>
    );
  }

  if (owner) {
    return (
      <Grid is_flex4="t" padding="0.8rem 2rem">
        <Grid is_flex4="t">
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
          <Text padding="0 0.5rem" size={fontSize.base}>
            {user_info.user_name}
          </Text>
        </Grid>
        <IoIosCloseCircle
          size="2.4rem"
          color={color.bg60}
          onClick={() => {
            customAlert.SweetBen(
              props.sendBen,
              user_info.user_id,
              user_info.user_name
            );
          }}
        />
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
      <Text padding="0 0.5rem" size={fontSize.base}>
        {user_info.user_name}
      </Text>
    </Grid>
  );
};

export default ChatUserItem;
