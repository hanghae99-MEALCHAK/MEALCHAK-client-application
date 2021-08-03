import React from "react";
import { useSelector } from "react-redux";
import { Grid, Text } from "../elements";
import logger from "../shared/Console";
import Spinner from "../shared/Spinner";

const Message = (props) => {
  const { messagesInfo } = props;

  // 사용자 이름, 이미지
  const { user_nickname, user_profile } = useSelector(
    (state) => state.user.user
  );

//   메세지 타임
  let time = "";
  if (!(messagesInfo.createdAt === null)) {
    time = messagesInfo.createdAt?.split(" ")[1];
  }
React.useEffect(() => {
    // 로딩중
    if (!messagesInfo) {
      return (
          <Spinner />
      )
    }

  }, [])

React.useEffect(() => {
    logger("user nick", user_nickname)
    logger("messageInfo", messagesInfo)

}, [messagesInfo?.roomId])

  if(user_nickname === messagesInfo?.sender){
      return(
          <Grid>
              <Text>
                {messagesInfo?.message}
              </Text>
          </Grid>
      )
  }
  return <div></div>;
};

export default Message;
