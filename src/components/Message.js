import React from "react";
import { useSelector, useDispatch } from "react-redux";
import logger from "../shared/Console";
import Spinner from "../shared/Spinner";

import { Grid, Text, Image } from "../elements";
import theme from "../styles/theme";

const Message = (props) => {
  const { color, border, fontSize } = theme;
  const { messagesInfo } = props;

  // 사용자 이름, 이미지
  const user_info = useSelector((state) => state.user.user);

  //   메세지 타임
  let time = "";
  if (!(messagesInfo.createdAt === null)) {
    time = messagesInfo.createdAt?.split(" ")[1];
  }
  const hour = time.split(":")[0];
  const minute = time.split(":")[1];

  React.useEffect(() => {
    // 로딩중
    if (!messagesInfo) {
      return <Spinner />;
    }
  }, []);

  // 사용자 정보 잘 들어오는지 확인
  React.useEffect(() => {
    logger("user nick", user_info?.user_nickname);
    logger("messagesInfo", messagesInfo);
  }, [user_info?.user_nickname]);

  // 지금은 닉네임으로 하지만 나중에 서버에서 메세지 작성자 user 정보주면 그걸로하기
  // if (user_info?.user_id === messagesInfo.sender_id)
  if (user_info?.user_nickname === messagesInfo?.sender) {
    return (
      <Grid is_flex4="t" margin="0 auto 1.6rem" flex_direction="row">
        <Grid width="4rem" margin="0 0.8rem 0 0">
          <Image src={user_info.user_profile} size="4"></Image>
        </Grid>
        <Grid shape="container" width="auto">
          <Text color={color.bg0} size={fontSize.tiny}>
            {messagesInfo.sender}
          </Text>
          <Grid
            bg={color.bg0}
            maxWidth="15rem"
            padding="0.8rem"
            radius="0 1.2rem 1.2rem 1.2rem"
          >
            <Text size={fontSize.small} word_break="break-all">{messagesInfo?.message}</Text>
          </Grid>
        </Grid>
        <Text>
          {hour}:{minute}
        </Text>
      </Grid>
    );
  }

  if (messagesInfo.type === "ENTER") {
    return (
      <Grid
        is_flex4="t"
        border="none"
        radius="0.8rem"
        justify_content="center"
        bg="rgba(54, 55, 60, 0.2)"
        height="2.8rem"
        margin="0 auto 1.6rem"
      >
        <Text color={color.bg0} size={fontSize.small}>
          {messagesInfo.message}
        </Text>
      </Grid>
    );
  }

  return (
    <Grid is_flex4="t" margin="0 auto 1.6rem" flex_direction="row">
      <Text>{messagesInfo.sender}</Text>
      <Text>{messagesInfo?.message}</Text>
      <Text>
        {hour}:{minute}
      </Text>
    </Grid>
  );

  // 다른 사람 메세지
  return <div></div>;
};

export default Message;
