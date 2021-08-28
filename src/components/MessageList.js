import React from "react";
import { useSelector } from "react-redux";

import { Grid } from "../elements";
import { Message } from ".";
import logger from "../shared/Console";

const MessageList = (props) => {
  const messages = useSelector((state) => state.chat.messages);

  return (
    <Grid padding="0 2rem">
      <Grid height="6rem"></Grid>
      {messages?.map((m, idx) => {
        return <Message key={idx} messagesInfo={m} />;
      })}
      <Grid height="7rem"></Grid>
    </Grid>
  );
};

export default MessageList;
