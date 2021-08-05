import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";

import { Grid } from "../elements";
import { Message } from ".";
import logger from "../shared/Console";

const MessageList = (props) => {
  const messages = useSelector((state) => state.chat.messages);

  // 스크롤 대상
  const messageEndRef = React.useRef(null);
  //  하단 스크롤 함수
  const scrollTomBottom = () => {
    // 모바일이면 실행하지 않기
    if (window.innerWidth <= 375) {
      return;
    }
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        {messages.map((m, idx) => {
          return <Message key={idx} messagesInfo={m} />;
        })}

      <div ref={messageEndRef}></div>
      <Grid height="7rem"></Grid>
    </Grid>
  );
};

export default MessageList;
