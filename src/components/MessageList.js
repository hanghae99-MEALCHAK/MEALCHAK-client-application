import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";

import { Grid } from "../elements";
import { Message } from ".";
import logger from "../shared/Console";

const MessageList = (props) => {
    const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);

  // 스크롤 대상
  const messageEndRef = React.useRef(null);
  //  하단 스크롤 함수
  const scrollTomBottom = () => {
    // 모바일이면 실행하지 않기
    if (window.innerWidth <= 375) {
      return
    }
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  // 렌더링시 이동
  React.useEffect(() => {
    scrollTomBottom();
    logger("msg info", messages)
  }, [messages]);

  React.useEffect(() => {
      dispatch(chatActions.getChatMessagesAX())
  }, [])

  return (
    <Grid shape="container">
      {messages.map((m, idx) => {
        return <Message key={idx} messagesInfo={m} />;
      })}

      <div ref={messageEndRef}></div>
    </Grid>
  );
};

export default MessageList;
