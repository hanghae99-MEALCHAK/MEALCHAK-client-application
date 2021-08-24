import React from "react";
import { useSelector } from "react-redux";

import { Grid } from "../elements";
import { Message } from ".";
import logger from "../shared/Console";

const MessageList = (props) => {
  const messages = useSelector((state) => state.chat.messages);

  // 스크롤 대상
  const messageEndRef = React.useRef(null);
  //  하단 스크롤 함수
  const scrollTomBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  // 렌더링시 이동
  React.useEffect(() => {
    scrollTomBottom();
  }, [messages]);

  React.useEffect(() => {
    logger("메시지 DB", messages);
  }, []);

  return (
    <Grid padding="0 2rem">
      <Grid height="6rem"></Grid>
      {messages?.map((m, idx) => {
        return <Message key={idx} messagesInfo={m} />;
      })}

      <div ref={messageEndRef}></div>
      <Grid height="7rem"></Grid>
    </Grid>
  );
};

export default MessageList;
