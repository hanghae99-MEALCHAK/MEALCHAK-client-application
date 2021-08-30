// 채팅 메세지 컴포넌트
import React from "react";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import Spinner from "../shared/Spinner";

// style
import { Grid, Text, Image } from "../elements";
import theme from "../styles/theme";

const Message = (props) => {
  const { color, fontSize } = theme;
  const { messagesInfo } = props; // MessageList.js 의 props

  // 사용자 이름, 이미지 정보
  const user_info = useSelector((state) => state.user.user);

  // 메세지 타임
  let time = "";
  if (!(messagesInfo.createdAt === null)) {
    time = messagesInfo.createdAt?.split(" ")[1];
  }
  const DB_time = time?.split(":")[0] + ":" + time?.split(":")[1]; // DB에서 불러온 메세지 시간 정보
  const now_time = useSelector((state) => state.chat.now_time); // 실시간 메세지의 시간 정보

  React.useEffect(() => {
    // 로딩중
    if (!messagesInfo) {
      return <Spinner />;
    }
  }, []);

  // 메세지 타입이 출입 정보인 경우 뷰
  if (messagesInfo.type === "ENTER" || messagesInfo.type === "QUIT") {
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

  // 메세지 타입이 강퇴인 경우 메세지 보이지 않기
  if (messagesInfo.type === "BAN") {
    return;
  }

  // 메세지 타입이 대화인 경우 뷰
  // 메세지 작성자 user id, 현재 사용자 id 비교
  if (messagesInfo.type === "TALK") {
    // 내가 보낸 메세지의 뷰
    if (user_info?.user_id === parseInt(messagesInfo.sender_id)) {
      return (
        <Grid margin="0 auto 1.6rem" text_align="left">
          <Grid is_flex4="t" justify_content="space-between">
            <Grid />
            <Grid
              is_flex4="t"
              maxWidth="28rem"
              flex_direction="row-reverse"
              align_items="flex-end"
            >
              <Grid
                bg={color.brand40}
                width="max-content"
                padding="0.8rem"
                radius="1.2rem 0 1.2rem 1.2rem"
              >
                <Text size={fontSize.small} word_break="break-all">
                  {messagesInfo?.message}
                </Text>
              </Grid>

              <Text
                size={fontSize.tiny}
                margin="0 0.4rem 0 0"
                color={color.bg0}
              >
                {DB_time !== ":undefined" ? DB_time : now_time}
              </Text>
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      // 타 사용자의 메세지 뷰
      return (
        <Grid
          is_flex4="t"
          margin="0 auto 1.6rem -0.4rem"
          flex_direction="row"
          align_items="start"
        >
          <Grid width="4rem" margin="0 0.8rem 0 0">
            <Image
              size="4"
              cursor="t"
              src={messagesInfo.sender_img}
              _onClick={() => {
                history.push({
                  pathname: `/userprofile/${messagesInfo?.sender_id}`,
                  state: { user_id: messagesInfo?.sender_id },
                });
              }}
            ></Image>
          </Grid>
          <Grid margin="0 auto 1.6rem" text_align="left" padding="1rem 0 0">
            <Text color={color.bg0} size={fontSize.tiny} text_align="left">
              {messagesInfo.sender}
            </Text>
            <Grid is_flex4="t" justify_content="space-between">
              <Grid
                is_flex4="t"
                maxWidth="23rem"
                flex_direction="row"
                align_items="flex-end"
              >
                <Grid
                  bg={color.bg0}
                  width="max-content"
                  padding="0.8rem"
                  radius="0 1.2rem 1.2rem 1.2rem"
                >
                  <Text size={fontSize.small} word_break="break-all">
                    {messagesInfo?.message}
                  </Text>
                </Grid>

                <Text
                  size={fontSize.tiny}
                  margin="0 0 0 0.4rem"
                  color={color.bg0}
                >
                  {DB_time !== ":undefined" ? DB_time : now_time}
                </Text>
                <Grid width="1rem" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  } else {
    return null;
  }
};

export default Message;
