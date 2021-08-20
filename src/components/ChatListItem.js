import React from "react";
import theme from "../styles/theme";
import { Grid, Text } from "../elements";
import logger from "../shared/Console";

const ChatListItem = React.memo((props) => {
  const { color, border, fontSize } = theme;
  const { roomName, live_chat, _onClick, headCountChat, new_msg } = props;

  React.useEffect(() => {
    logger("chat list item props정보");
  }, []);

  if (!live_chat) {
    return (
      // 방장이 채팅방 나갔을 경우 다른 사용자에게 보이는 채팅 리스트
      <React.Fragment>
        <Grid
          justify_content="space-between"
          is_flex4="t"
          padding="1.9rem 2rem"
          borderBottom={border.bg20}
        >
          <Grid is_flex4="t" width="70%">
            <Grid width="5rem" is_flex4="t" margin="0 1rem 0 0">
              <svg
                width="5rem"
                height="5rem"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="50" height="50" rx="12" fill="#EBE9E8" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.6184 11.4886C19.6184 10.6664 18.952 10 18.1298 10C17.3077 10 16.6413 10.6665 16.6413 11.4886V17.0701C16.6413 18.0187 15.8723 18.7877 14.9237 18.7877C13.9752 18.7877 13.2062 18.0187 13.2062 17.0701V11.6031C13.2062 10.7177 12.4884 10 11.6031 10C10.7177 10 10 10.7177 10 11.6031V19.3866V19.3867C10 21.8252 11.7618 23.9446 14.3523 25.022C14.3516 25.0542 14.3512 25.0864 14.3512 25.1187V35.9922C14.3512 38.2056 16.1455 39.9999 18.3588 39.9999C20.5722 39.9999 22.3665 38.2056 22.3665 35.9922V25.1187C22.3665 25.0537 22.3649 24.9889 22.3618 24.9246C24.8286 23.8201 26.4885 21.7537 26.4886 19.3867V19.3866V11.7175C26.4886 10.769 25.7196 10 24.771 10C23.8225 10 23.0535 10.769 23.0535 11.7175V17.0701C23.0535 18.0187 22.2845 18.7877 21.336 18.7877C20.3874 18.7877 19.6184 18.0187 19.6184 17.0701V11.4886ZM29.6947 15.1527C29.6947 12.3069 32.0016 10 34.8474 10C37.6931 10 40 12.3069 40 15.1527V23.9583L40 23.989V37.5955C40 38.9235 38.9234 40.0001 37.5954 40.0001C36.2674 40.0001 35.1908 38.9235 35.1908 37.5955V29.0997C35.0773 29.1072 34.9628 29.111 34.8474 29.111C32.0016 29.111 29.6947 26.8041 29.6947 23.9583V15.1527Z"
                  fill="white"
                />
              </svg>
            </Grid>

            <Grid maxWidth="18rem">
              <Text
                white_space="nowrap"
                color={color.bg80}
                bold2="500"
                size={fontSize.base}
                overflow="hidden"
                text_overflow="ellipsis"
              >
                {roomName}
              </Text>
              <Text color={color.error100} size={fontSize.small}>
                방장이 삭제한 채팅방입니다.
              </Text>
              <Text color={color.error100} size={fontSize.small}>
                [자정 시에 자동 삭제 예정]
              </Text>
            </Grid>
          </Grid>

          <Grid is_flex4="t" width="2.4rem">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5L17 12L9 19"
                stroke="#CECAC7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else {
    return (
      // 그 외

      <React.Fragment>
        <Grid
          justify_content="space-between"
          is_flex4="t"
          padding="1.9rem 2rem"
          borderBottom={border.bg20}
          cursor="t"
          _onClick={_onClick}
        >
          <Grid is_flex4="t" width="70%">
            <Grid width="5rem" is_flex4="t" margin="0 1rem 0 0">
              <svg
                width="5.0rem"
                height="5.0rem"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="50" height="50" rx="12" fill="#FFAF5C" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.6184 11.4886C19.6184 10.6664 18.952 10 18.1298 10C17.3077 10 16.6413 10.6665 16.6413 11.4886V17.0701C16.6413 18.0187 15.8723 18.7877 14.9237 18.7877C13.9752 18.7877 13.2062 18.0187 13.2062 17.0701V11.6031C13.2062 10.7177 12.4884 10 11.6031 10C10.7177 10 10 10.7177 10 11.6031V19.3866V19.3867C10 21.8252 11.7618 23.9446 14.3523 25.022C14.3516 25.0542 14.3512 25.0864 14.3512 25.1187V35.9922C14.3512 38.2056 16.1455 39.9999 18.3588 39.9999C20.5722 39.9999 22.3665 38.2056 22.3665 35.9922V25.1187C22.3665 25.0537 22.3649 24.9889 22.3618 24.9246C24.8286 23.8201 26.4885 21.7537 26.4886 19.3867V19.3866V11.7175C26.4886 10.769 25.7196 10 24.771 10C23.8225 10 23.0535 10.769 23.0535 11.7175V17.0701C23.0535 18.0187 22.2845 18.7877 21.336 18.7877C20.3874 18.7877 19.6184 18.0187 19.6184 17.0701V11.4886ZM29.6947 15.1527C29.6947 12.3069 32.0016 10 34.8474 10C37.6931 10 40 12.3069 40 15.1527V23.9583L40 23.989V37.5955C40 38.9235 38.9234 40.0001 37.5954 40.0001C36.2674 40.0001 35.1908 38.9235 35.1908 37.5955V29.0997C35.0773 29.1072 34.9628 29.111 34.8474 29.111C32.0016 29.111 29.6947 26.8041 29.6947 23.9583V15.1527Z"
                  fill="white"
                />
              </svg>
            </Grid>

            <Grid maxWidth="18rem">
              <Text
                white_space="nowrap"
                color={color.bg100}
                size={fontSize.base}
                overflow="hidden"
                text_overflow="ellipsis"
              >
                {roomName}
              </Text>
              <Text color={color.bg80} size={fontSize.small}>
                {headCountChat}명 참여중
              </Text>
            </Grid>
          </Grid>

          <Grid is_flex4="t" width="auto">
            {new_msg && <svg
              style={{ marginRight: "0.4rem" }}
              width="3.7rem"
              height="2.1rem"
              viewBox="0 0 37 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="37" height="21" rx="10.5" fill="#F35959" />
              <path
                d="M9.42 6.6H7.91V14H9.31V11.03C9.31 10.18 9.2 9.25 9.13 8.45H9.18L9.93 10.04L12.07 14H13.57V6.6H12.17V9.55C12.17 10.39 12.28 11.37 12.36 12.14H12.31L11.57 10.54L9.42 6.6ZM19.8402 6.6H15.3002V14H19.9502V12.76H16.7802V10.78H19.3802V9.54H16.7802V7.83H19.8402V6.6ZM22.1326 6.6H20.6226L22.0526 14H23.8626L24.6726 10.34C24.7926 9.74 24.8826 9.19 24.9926 8.63H25.0326C25.1226 9.19 25.2326 9.74 25.3526 10.34L26.1826 14H28.0226L29.3926 6.6H27.9826L27.4026 10.21C27.2926 10.98 27.1826 11.77 27.0726 12.57H27.0226C26.8626 11.77 26.7126 10.97 26.5526 10.21L25.6926 6.6H24.4326L23.5726 10.21C23.4126 10.98 23.2526 11.77 23.1026 12.57H23.0626C22.9526 11.77 22.8326 11.01 22.7226 10.21L22.1326 6.6Z"
                fill="white"
              />
            </svg>}
            <svg
              width="2.4rem"
              height="2.4rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5L17 12L9 19"
                stroke="#CECAC7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
});

export default ChatListItem;
