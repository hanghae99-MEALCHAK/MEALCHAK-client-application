import React from "react";
import theme from "../styles/theme";
import { Grid, Text } from "../elements";
import logger from "../shared/Console";

const AwaitList = (props) => {
  const { color, border, fontSize } = theme;
  const { roomName } = props;

  React.useEffect(() => {
    logger("참여대기 리스트", props);
  }, []);

  return (
    <React.Fragment>
      <Grid
        justify_content="space-between"
        is_flex4="t"
        padding="1.9rem 2rem"
        borderBottom={border.bg20}
        cursor="t"
      >
        <Grid is_flex4="t" width="70%">
          <Grid width="5rem" is_flex4="t" margin="0 1rem 0 0">
            <svg
              width="50"
              height="50"
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
              color={color.bg100}
              size={fontSize.base}
              overflow="hidden"
              text_overflow="ellipsis"
            >
              {roomName}
            </Text>
            <Text color={color.bg80} size={fontSize.small}>
              승인 대기 중
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AwaitList;
