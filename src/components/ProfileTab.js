// 마이페이지, 타 유저 프로필, 내가 보는 내 프로필의 매너점수, 성별, 연령 탭
import React from "react";

// styles
import { Grid, Text } from "../elements";
import theme from "../styles/theme";

const ProfileTab = (props) => {
  const { color, border, fontSize, radius } = theme;
  const info = props.user_info;

  return (
    <React.Fragment>
      <Grid
        is_flex
        width="32rem"
        height="7.9rem"
        margin="1.5rem auto 2rem auto"
      >
        <Grid
          is_flex_column
          width="10.1rem"
          height="7.9rem"
          bg={color.bg0}
          border={border.bg40}
          margin="0rem auto 0.5rem"
          padding="0rem 0.5rem 0.5rem 0.5rem"
          justify_content="center"
          radius={radius.button}
        >
          <Text
            width="3.1rem"
            height="3.2rem"
            size={fontSize.display4}
            bold
            text_align="center"
            line_height="150%"
            color={color.brand100}
          >
            {info?.user_manner.toFixed(1)}
          </Text>
          <Text
            width="4rem"
            height="1.5rem"
            size={fontSize.tiny}
            bold2="500"
            line_height="150%"
            text_align="center"
            color={color.bg80}
            padding="0"
          >
            매너 점수
          </Text>
        </Grid>
        <Grid
          is_flex_column
          width="10.1rem"
          height="7.9rem"
          bg={color.bg0}
          border={border.bg40}
          margin="0rem auto 0.5rem"
          padding="0rem 0.5rem 0.5rem 0.5rem"
          justify_content="center"
          radius={radius.button}
        >
          <Text
            width="5.8rem"
            height={info?.user_gender ? "3.2rem" : "2.4rem"}
            size={fontSize.display4}
            bold
            text_align="center"
            line_height="150%"
            padding={info?.user_gender ? "0" : "0 0 3.1rem 0"}
            margin={info?.user_gender ? "0" : "0.1rem 0 0 0"}
            color={color.brand100}
          >
            {info?.user_gender ? (
              info?.user_gender === "male" ? (
                <svg
                  width="3rem"
                  height="3rem"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="8"
                    cy="12"
                    r="4"
                    stroke="#FF9425"
                    strokeWidth="2"
                  />
                  <line
                    x1="16"
                    y1="4"
                    x2="16"
                    y2="9"
                    stroke="#FF9425"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="16"
                    y1="4"
                    x2="11"
                    y2="4"
                    stroke="#FF9425"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="15.6569"
                    y1="4.41421"
                    x2="11.4142"
                    y2="8.65685"
                    stroke="#FF9425"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="3rem"
                  height="3rem"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="8.3999"
                    r="4.8"
                    stroke="#FF9425"
                    strokeWidth="2.4"
                  />
                  <line
                    x1="11.9998"
                    y1="14.4"
                    x2="11.9998"
                    y2="20.4"
                    stroke="#FF9425"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <line
                    x1="15.5998"
                    y1="16.8001"
                    x2="8.3998"
                    y2="16.8001"
                    stroke="#FF9425"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              )
            ) : (
              "미입력"
            )}
          </Text>
          <Text
            width="4rem"
            height="1.5rem"
            size={fontSize.tiny}
            bold2="500"
            line_height="150%"
            text_align="center"
            color={color.bg80}
            padding="0"
          >
            성별
          </Text>
        </Grid>
        <Grid
          is_flex_column
          width="10.1rem"
          height="7.9rem"
          bg={color.bg0}
          border={border.bg40}
          margin="0rem auto 0.5rem"
          padding="0rem 0.5rem 0.5rem 0.5rem"
          justify_content="center"
          radius={radius.button}
        >
          <Text
            width={info?.user_age ? "4.5rem" : "5.8rem"}
            height="3.2rem"
            size={fontSize.display4}
            bold
            text_align="center"
            line_height="150%"
            color={color.brand100}
            padding="0 0 2.6rem 0"
            margin="0"
          >
            {info?.user_age
              ? info.user_age?.includes("1")
                ? "10대"
                : info.user_age?.includes("2")
                ? "20대"
                : info.user_age?.includes("3")
                ? "30대"
                : info.user_age?.includes("4")
                ? "40대"
                : info.user_age?.includes("5") && "50대"
              : "미입력"}
          </Text>
          <Text
            width="4rem"
            height="1.5rem"
            size={fontSize.tiny}
            bold2="500"
            line_height="150%"
            text_align="center"
            color={color.bg80}
            padding="0"
          >
            연령
          </Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProfileTab;
