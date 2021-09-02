// 메세지 리스트 컴포넌트
import React from "react";
import { useSelector } from "react-redux";
import { Message } from ".";

// style
import { Grid } from "../elements";

const MessageList = (props) => {
  const messages = useSelector((state) => state.chat.messages);

  return (
    <Grid padding="0 2rem">
      <Grid height="6rem"></Grid>
        {messages?.map((m, idx) => {
          return <Message key={idx} messagesInfo={m} />;
        })}
      <Grid height="4.4rem"></Grid>
    </Grid>
  );
};



export default MessageList;