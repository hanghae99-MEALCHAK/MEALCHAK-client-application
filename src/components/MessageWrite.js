import React from "react";
import { useState } from "react";
import logger from "../shared/Console";
import { useDispatch } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { useRef } from "react";
import _ from "lodash";

// style
import styled from "styled-components";
import { Grid, Input, Button, Text } from "../elements";
import theme from "../styles/theme";
import { customAlert } from "./Sweet";

const MessageWrite = (props) => {
  // const throttle = _.throttle((m) => dispatch(chatActions.writeMessage(m)), 300);
  // const send_action = React.useCallback(throttle, []);

  const now_message = useRef();
  const msg = now_message.current;

  const dispatch = useDispatch();
  const { color, border, radius, fontSize } = theme;
  const { sendMessage } = props;

  const [new_message, setMessage] = useState("");

  const changeMessage = (e) => {
    setMessage(e.target.value);
    // send_action(e.target.value);
  };

  const sendMessageBtn = () => {
    if (new_message === "") {
      return customAlert.sweetConfirmReload("메세지를 입력해주세요.", null, "");
    }
    logger("보낼 메세지 내용", msg.defaultValue);
    sendMessage(msg.defaultValue);
    setMessage("");
  };

  return (
    <GridTop>
        <Grid is_flex4="t" border={border.bg40} radius={radius.inputBox}>
          <Input
            flex="flex"
            height="4.4rem"
            is_submit
            placeholder="메세지를 입력해주세요."
            type="text"
            length={300}
            onSubmit={sendMessageBtn}
            padding="1.1rem 1.6rem"
            value={new_message}
            _onChange={changeMessage}
            ref={now_message}
            border="none"
          ></Input>
          <Button
            width="6rem"
            padding="0"
            border="none"
            _onClick={sendMessageBtn}
            cursor="pointer"
            bg={color.bg0}
            radius={radius.inputBox}
          >
            <Text color={color.brand100} size={fontSize.small} bg={color.bg0}>
              보내기
            </Text>
          </Button>
        </Grid>
    </GridTop>
  );
};

const GridTop = styled.div`
  @media (min-width: 414px) {
    max-width: 36rem;
    margin: 0 auto 0 -0.1rem;
  }
  height: 5rem;
  width: 100%;
  margin: 0 auto;
  padding: 0.3rem;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.06);
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default MessageWrite;
