import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import theme from "../styles/theme";
import { history } from "../redux/configureStore";
import { IoIosCloseCircle } from "react-icons/io";
import { customAlert } from "./Sweet";
import logger from "../shared/Console";
import { useSelector } from "react-redux";

const ChatUserItem = (props) => {
  const { fontSize, color, radius } = theme;
  const user_info = props.user_info;
  const shape = props.shape;
  const owner = props.owner;

  const my_info = useSelector((state) => state.user.user);

  React.useEffect(() => {
    logger("sendBen 찾기", props);
  }, []);

  if (shape === "is_me") {
    return (
      <Grid is_flex4="t" padding="0.8rem 0 0.8rem 2rem">
        <Image
          margin="0.4rem 0.8rem 0.4rem 0"
          cursor="pointer"
          _onClick={() => {
            if (props?.user_info.user_id !== my_info.user_id) {
              return history.push({
                pathname: `/userprofile/${props?.user_info.user_id}`,
                state: { user_id: props.user_info.user_id },
              });
            }
            if (props?.user_info.user_id === my_info.user_id) {
              return history.push({
                pathname: `/myprofile`,
                state: { user_id: props.user_info.user_id },
              });
            }
          }}
          src={user_info.user_img}
        ></Image>
        <Text bold2="700" size={fontSize.base}>
          나 ({user_info.user_name})
        </Text>
        {user_info.user_id === props.own_user_id && (
          <Text
            width="2.7rem"
            height="1.5rem"
            margin="0 0 0 0.4rem"
            size={fontSize.tiny}
            bg={color.brand20}
            color={color.brand100}
            radius="0.4rem"
            bold2="700"
            text_align="center"
          >
            방장
          </Text>
        )}
      </Grid>
    );
  }

  // 내가 방장 일때 다른 사람 뷰
  if (owner) {
    return (
      <Grid is_flex4="t" padding="0.8rem 2rem">
        <Grid is_flex4="t">
          <Image
            margin="0.4rem 0.8rem 0.4rem 0"
            cursor="pointer"
            shape="circle"
            src={user_info.user_img}
            _onClick={() => {
              if (props?.user_info.user_id !== my_info.user_id) {
                return history.push({
                  pathname: `/userprofile/${props?.user_info.user_id}`,
                  state: { user_id: props.user_info.user_id },
                });
              }
              if (props?.user_info.user_id === my_info.user_id) {
                return history.push({
                  pathname: `/myprofile`,
                  state: { user_id: props.user_info.user_id },
                });
              }
            }}
          ></Image>
          <Text size={fontSize.base}>{user_info.user_name}</Text>
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
        margin="0.4rem 0.8rem 0.4rem 0"
        cursor="pointer"
        shape="circle"
        src={user_info.user_img}
        _onClick={() => {
          if (props?.user_info.user_id !== my_info.user_id) {
            return history.push({
              pathname: `/userprofile/${props?.user_info.user_id}`,
              state: { user_id: props.user_info.user_id },
            });
          }
          if (props?.user_info.user_id === my_info.user_id) {
            return history.push({
              pathname: `/myprofile`,
              state: { user_id: props.user_info.user_id },
            });
          }
        }}
      ></Image>
      <Text size={fontSize.base}>{user_info.user_name}</Text>
      {user_info.user_id === props.own_user_id && (
        <Text
          padding="0.1rem"
          width="2.7rem"
          height="1.5rem"
          margin="0 0 0 0.4rem"
          size={fontSize.tiny}
          bg={color.brand20}
          color={color.brand100}
          radius="0.4rem"
          bold2="700"
          text_align="center"
        >
          방장
        </Text>
      )}
    </Grid>
  );
};

export default ChatUserItem;
