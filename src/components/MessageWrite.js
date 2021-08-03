import React from "react";
import { useState } from "react";
import logger from "../shared/Console";
import { useDispatch } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";

// style
import styled from "styled-components";
import { Grid, Input, Button, Text } from "../elements";
import theme from "../styles/theme";

const MessageWrite = (props) => {
  const dispatch = useDispatch();
  const { color, border, radius, fontSize } = theme;
  const { sendMessage } = props;

  const [new_message, setMessage] = useState("");

  const changeMessage = (e) => {
    setMessage(e.target.value);
    dispatch(chatActions.writeMessage(e.target.value));
  };

  const sendMessageBtn = () => {
    logger("보낼 메세지 내용", new_message);
    sendMessage();
    setMessage("");
  };

  return (
    <React.Fragment>
      <Grid
        height="auto"
        maxWidth="36rem"
        // margin="0 auto 0 -0.1rem"
        padding="1rem"
        is_fixed="t"
        bg={color.bg0}
        shadow="t"
      >
        <Grid is_flex4="t" border={border.bg20} radius={radius.inputBox}>
          <Input
            is_submit
            placeholder="메세지를 입력해주세요."
            type="text"
            length={300}
            onSubmit={sendMessageBtn}
            padding="1.1rem 0.5rem 1.1rem 1.6rem"
            value={new_message}
            _onChange={changeMessage}
            border="none"
          ></Input>
          <Button
            width="6rem"
            padding="0"
            border="none"
            _onClick={sendMessageBtn}
            cursor="pointer"
          >
            <Text color={color.brand100} size={fontSize.small} bg={color.bg0}>
              보내기
            </Text>
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default MessageWrite;
