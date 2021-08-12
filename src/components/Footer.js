import React from "react";
import logger from "../shared/Console";
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";

import { Grid, Text } from "../elements";
import theme from "../styles/theme";
import styled from "styled-components";
import { customAlert } from "./Sweet";

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
      customAlert.sweetNeedLogin();
    }
  };

  return (
    <React.Fragment>
      <Grid
        height="5.2rem"
        maxWidth="36rem"
        margin="0 auto 0 auto"
        padding="0.5rem 0"
        // is_fixed="t"
        position="sticky"
        bottom="0"
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
              style={{ cursor: "pointer", margin: "0.2rem 0 0 0" }}
              width="22"
              height="24"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 20V7.8357C1 7.5098 1.15881 7.20435 1.42557 7.01714L9.42557 1.40311C9.77032 1.16118 10.2297 1.16118 10.5744 1.40311L18.5744 7.01714C18.8412 7.20435 19 7.5098 19 7.8357V20C19 20.5523 18.5523 21 18 21H14C13.4477 21 13 20.5523 13 20V15.1128C13 14.5605 12.5523 14.1128 12 14.1128H8C7.44772 14.1128 7 14.5605 7 15.1128V20C7 20.5523 6.55228 21 6 21H2C1.44772 21 1 20.5523 1 20Z"
                stroke={path === "/home" ? color.brand100 : color.bg60}
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
              <span
                style={{
                  position: "absolute",
                  top: "3.2rem",
                  left: "4.05rem",
                  margin: "0",
                }}
              >
                홈
              </span>
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
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8467 24.3353C10.5903 23.3785 10.0253 22.533 9.23943 21.9299C8.45353 21.3269 7.49061 21 6.5 21C5.5094 21 4.54647 21.3269 3.76057 21.9299C2.97468 22.533 2.40972 23.3785 2.15333 24.3353"
                stroke="#CECAC7"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="6.5"
                cy="14.5"
                r="3.5"
                stroke="#CECAC7"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M31.8467 24.3353C31.5903 23.3785 31.0253 22.533 30.2394 21.9299C29.4535 21.3269 28.4906 21 27.5 21C26.5094 21 25.5465 21.3269 24.7606 21.9299C23.9747 22.533 23.4097 23.3785 23.1533 24.3353"
                stroke="#CECAC7"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="27.5"
                cy="14.5"
                r="3.5"
                stroke="#CECAC7"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M22.6977 24.4413C22.3635 23.1939 21.627 22.0916 20.6024 21.3054C19.5779 20.5193 18.3225 20.0931 17.0311 20.0931C15.7397 20.0931 14.4843 20.5193 13.4598 21.3054C12.4352 22.0916 11.6987 23.1939 11.3644 24.4413"
                stroke="white"
                strokeWidth="4.6012"
                strokeLinecap="round"
              />
              <ellipse
                cx="17.0705"
                cy="12.4869"
                rx="4.60787"
                ry="4.48693"
                stroke="white"
                strokeWidth="4.6012"
                strokeLinecap="round"
              />
              <path
                d="M22.7956 24.0765C22.4537 22.907 21.7004 21.8736 20.6526 21.1366C19.6047 20.3995 18.3208 20 17 20C15.6792 20 14.3953 20.3995 13.3474 21.1366C12.2996 21.8736 11.5463 22.907 11.2044 24.0765"
                stroke="#CECAC7"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <ellipse
                cx="16.9626"
                cy="12.5"
                rx="4.5"
                ry="4.5"
                stroke="#CECAC7"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <Text text_align="center" size="1rem" color={color.bg80} cursor="t">
              <span
                style={{
                  position: "absolute",
                  top: "3.2rem",
                  left: "11.1rem",
                  margin: "0",
                }}
              >
                모임 만들기
              </span>
            </Text>
          </Grid>
          <Grid
            text_align="center"
            maxWidth="9rem"
            _onClick={() => {
              loginCheck("chatlist");
            }}
          >
            <svg
              style={{ cursor: "pointer", margin: "0 0 0.2rem 0" }}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2416 8.01484C24 9.15831 24 10.7501 24 13.9337C24 17.1173 24 18.7091 23.2416 19.8526C22.9133 20.3476 22.4914 20.7726 22.0001 21.1034C21.0085 21.7708 19.6774 21.8552 17.25 21.8659V21.8674L16.0062 24.3735C15.5916 25.2088 14.4084 25.2088 13.9938 24.3735L12.75 21.8674V21.8659C10.3226 21.8552 8.99145 21.7708 7.99993 21.1034C7.50858 20.7726 7.0867 20.3476 6.75839 19.8526C6 18.7091 6 17.1173 6 13.9337C6 10.7501 6 9.15831 6.75839 8.01484C7.0867 7.51982 7.50858 7.0948 7.99993 6.76404C9.13494 6 10.715 6 13.875 6H16.125C19.285 6 20.8651 6 22.0001 6.76404C22.4914 7.0948 22.9133 7.51982 23.2416 8.01484Z"
                stroke={
                  path === "/chatlist" || path === "/allowchat"
                    ? color.brand100
                    : color.bg60
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L18 12"
                stroke={
                  path === "/chatlist" || path === "/allowchat"
                    ? color.brand100
                    : color.bg60
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16H15"
                stroke={
                  path === "/chatlist" || path === "/allowchat"
                    ? color.brand100
                    : color.bg60
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Text
              text_align="center"
              size="1rem"
              color={
                path === "/chatlist" || path === "/allowchat"
                  ? color.brand100
                  : color.bg80
              }
              cursor="t"
            >
              <span
                style={{
                  position: "absolute",
                  top: "3.2rem",
                  left: "21.6rem",
                  margin: "0",
                }}
              >
                채팅
              </span>
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
              style={{ cursor: "pointer", margin: "0 0 -0.3rem 0" }}
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
                  stroke={path === "/mypage" ? color.brand100 : color.bg60}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="15"
                  cy="11"
                  r="5"
                  stroke={path === "/mypage" ? color.brand100 : color.bg60}
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
              <span
                style={{
                  position: "absolute",
                  top: "3.2rem",
                  left: "29rem",
                  margin: "0",
                }}
              >
                마이페이지
              </span>
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
