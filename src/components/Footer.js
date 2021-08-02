import React from "react";
import logger from "../shared/Console";
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";

import { Grid, Text } from "../elements";
import theme from "../styles/theme";
import styled from "styled-components";

const Footer = (props) => {
  const { color } = theme;

  const path = props.match.path;
  const is_login = useSelector((state) => state.user.is_login);

  // props로 받아온 주소정보로 현재위치 탭 color 변경
  React.useEffect(() => {
    logger("footer props", props);
  }, []);

  const loginCheck = (path) => {
    if (is_login) {
      history.push(`/${path}`);
    } else {
      window.alert("로그인이 필요한 기능입니다.\n로그인을 해주세요.");
      history.push("/");
    }
  };

  return (
    <React.Fragment>
      <Grid
        height="auto"
        maxWidth="36rem"
        margin="0 auto 0 -0.1rem"
        padding="0.5rem 0"
        is_fixed="t"
        bg={color.bg0}
        shadow="t"
      >
        <Div>
          <Grid
            text_align="center"
            maxWidth="9rem"
            _onClick={() => {
              window.scrollTo(0, 0);
              history.push("/home");
            }}
          >
            <svg
              style={{ cursor: "pointer" }}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 24V11.8357C6 11.5098 6.15881 11.2043 6.42557 11.0171L14.4256 5.40311C14.7703 5.16118 15.2297 5.16118 15.5744 5.40311L23.5744 11.0171C23.8412 11.2043 24 11.5098 24 11.8357V24C24 24.5523 23.5523 25 23 25H19C18.4477 25 18 24.5523 18 24V19.1128C18 18.5605 17.5523 18.1128 17 18.1128H13C12.4477 18.1128 12 18.5605 12 19.1128V24C12 24.5523 11.5523 25 11 25H7C6.44772 25 6 24.5523 6 24Z"
                stroke={path === "/home" ? color.brand100 : color.bg80}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Text
              text_align="center"
              size="1rem"
              cursor="t"
              color={path === "/home" ? color.brand100 : color.bg80}
            >
              홈
            </Text>
          </Grid>

          <Grid
            text_align="center"
            maxWidth="9rem"
            _onClick={() => {
              loginCheck("upload");
            }}
          >
            <svg
              style={{ cursor: "pointer" }}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.7279 6.27208L7.97371 17.0263L8.12132 21.1213L12.2163 21.2689L22.9706 10.5147L18.7279 6.27208Z"
                stroke={path === "/upload" ? color.brand100 : color.bg80}
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M6 25H24"
                stroke={path === "/upload" ? color.brand100 : color.bg80}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Text text_align="center" size="1rem" color={color.bg80} cursor="t">
              글쓰기
            </Text>
          </Grid>

          <Grid
            text_align="center"
            maxWidth="9rem"
            _onClick={() => {
              loginCheck("chatlist")
            }}
          >
            <svg
              style={{ cursor: "pointer" }}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2416 8.01484C24 9.15831 24 10.7501 24 13.9337C24 17.1173 24 18.7091 23.2416 19.8526C22.9133 20.3476 22.4914 20.7726 22.0001 21.1034C21.0085 21.7708 19.6774 21.8552 17.25 21.8659V21.8674L16.0062 24.3735C15.5916 25.2088 14.4084 25.2088 13.9938 24.3735L12.75 21.8674V21.8659C10.3226 21.8552 8.99145 21.7708 7.99993 21.1034C7.50858 20.7726 7.0867 20.3476 6.75839 19.8526C6 18.7091 6 17.1173 6 13.9337C6 10.7501 6 9.15831 6.75839 8.01484C7.0867 7.51982 7.50858 7.0948 7.99993 6.76404C9.13494 6 10.715 6 13.875 6H16.125C19.285 6 20.8651 6 22.0001 6.76404C22.4914 7.0948 22.9133 7.51982 23.2416 8.01484Z"
                stroke={path === "/chatlist" ? color.brand100 : color.bg80}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L18 12"
                stroke={path === "/chatlist" ? color.brand100 : color.bg80}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16H15"
                stroke={path === "/chatlist" ? color.brand100 : color.bg80}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Text
              text_align="center"
              size="1rem"
              color={path === "/chatlist" ? color.brand100 : color.bg80}
              cursor="t"
            >
              채팅
            </Text>
          </Grid>

          <Grid
            text_align="center"
            maxWidth="9rem"
            _onClick={() => {
              loginCheck("mypage");
            }}
          >
            <svg
              style={{ cursor: "pointer", margin: "0 0 -0.5rem 0" }}
              margin="auto"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M22.7274 25.1883C22.2716 23.6998 21.2672 22.3846 19.8701 21.4465C18.4729 20.5085 16.7611 20 15 20C13.2389 20 11.5271 20.5085 10.1299 21.4465C8.73276 22.3846 7.72839 23.6998 7.27259 25.1883"
                  stroke={path === "/mypage" ? color.brand100 : color.bg80}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="15"
                  cy="11"
                  r="5"
                  stroke={path === "/mypage" ? color.brand100 : color.bg80}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="30" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <Text
              text_align="center"
              size="1rem"
              color={path === "/mypage" ? color.brand100 : color.bg80}
              cursor="t"
            >
              마이페이지
            </Text>
          </Grid>
        </Div>
      </Grid>
    </React.Fragment>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default Footer;
