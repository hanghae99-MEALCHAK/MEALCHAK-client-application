import React from "react";
import styled from "styled-components";
import { useState } from "react";
import logger from "../shared/Console";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postAction } from "../redux/modules/post";
import { actionCreators as userAction } from "../redux/modules/user";
import { Kakao_auth_url } from "../shared/OAuth";
import Spinner from "../shared/Spinner";

// style
import { Button, Grid, Input, Text } from "../elements";
import { Header, Footer } from "../components";
import theme from "../styles/theme";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const user_info = useSelector((state) => state.user.user);
  const { color, border, radius, fontSize } = theme;

  const [post_info, setPostInfo] = useState({});
  const [openInput, setInput] = useState(false);
  const [edit_nickname, setNick] = useState("");

  const openInputBox = (e) => {
    setInput(true);
    logger("input 여부", openInput);
    logger("user 정보", user_info);
  };

  const closeInputBox = (e) => {
    setInput(false);
    logger("input 여부", openInput);
  };

  const changeNick = (e) => {
    setNick(e.target.value);
  };

  const editUser = () => {
    closeInputBox();
    logger("수정할 이름", edit_nickname);
    dispatch(userAction.editUserNickAX(edit_nickname));
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    logger("input 여부", openInput);
  }, []);

  React.useEffect(() => {
    dispatch(userAction.loginCheck());
  }, [user_info? user_info?.user_nickname : null, user_info? user_info?.user_comment : null]);

  if (is_login) {
    return (
      <Grid
        maxWidth="36rem"
        minHeight="100vh"
        border={border.line1}
        margin="0 auto"
      >
        <Grid shape="container">
          <Header {...props} shape="마이페이지" />
          <Grid borderBottom={border.boldLine} />

          <Grid margin="3.6rem auto 2rem">
            <Profile user_profile={user_info.user_profile}></Profile>
          </Grid>
          <Grid margin="0 auto">
            <Text
              width="auto"
              size={fontSize.large}
              color={color.bg100}
              bold
              line_height="150%"
              text_align="center"
              overflow="hidden"
              text_overflow="ellipsis"
              white_space="nowrap"
              display="block"
            >
              {user_info.user_nickname}
            </Text>
            <Grid width="auto" text_align="center">
              <Text size={fontSize.small} color="#9A9896" line_height="150%">
                {user_info?.user_comment? user_info?.user_comment : "프로필 수정에서 한 줄 소개를 입력해주세요."}
              </Text>
            </Grid>
          </Grid>
          <Grid
            bg={color.brand20}
            is_flex4="t"
            radius="3.2rem"
            maxWidth="29rem"
            margin="2.4rem auto 4.8rem"
            padding="1.2rem"
          >
            <Grid shape="container" text_align="center">
              <Text color={color.brand100} size={fontSize.base} bold2="700">
                6
              </Text>
              <Text color={color.brand100} size={fontSize.tiny} bold2="400">
                밀착 횟수
              </Text>
            </Grid>
            <Grid shape="container" text_align="center">
              <Text color={color.brand100} size={fontSize.base} bold2="700">
                36.5
              </Text>
              <Text color={color.brand100} size={fontSize.tiny} bold2="400">
                매너 온도
              </Text>
            </Grid>
            <Grid shape="container" text_align="center">
              <Text color={color.brand100} size={fontSize.base} bold2="700">
                2
              </Text>
              <Text color={color.brand100} size={fontSize.tiny} bold2="400">
                리뷰
              </Text>
            </Grid>
          </Grid>

          <Grid borderBottom={border.boldLine} />

          <Grid
            is_flex4="t"
            padding="1.9rem 2rem"
            borderBottom={border.bg20}
            cursor="t"
          >
            <svg
              style={{ marginRight: "1.2rem" }}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.7279 6.27208L7.97371 17.0263L8.12132 21.1213L12.2163 21.2689L22.9706 10.5147L18.7279 6.27208Z"
                stroke="#36373C"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M6 25H24"
                stroke="#36373C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Text color={color.bg100} size={fontSize.base} bold2="400">
              내가 쓴 글
            </Text>
          </Grid>
          <Grid
            is_flex4="t"
            padding="1.9rem 2rem"
            borderBottom={border.bg20}
            cursor="t"
          >
            <svg
              style={{ marginRight: "1.2rem" }}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M22.7274 25.1883C22.2716 23.6998 21.2672 22.3846 19.8701 21.4465C18.4729 20.5085 16.7611 20 15 20C13.2389 20 11.5271 20.5085 10.1299 21.4465C8.73276 22.3846 7.72839 23.6998 7.27259 25.1883"
                  stroke="#36373C"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="15"
                  cy="11"
                  r="5"
                  stroke="#36373C"
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

            <Text color={color.bg100} size={fontSize.base} bold2="400">
              친구 초대
            </Text>
          </Grid>
          {user_info && (
            <Grid
              is_flex4="t"
              padding="1.9rem 2rem"
              margin="0 0 7rem"
              cursor="t"
              _onClick={() => {
                dispatch(userAction.logOut());
              }}
            >
              <svg
                style={{ marginRight: "1.2rem" }}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.25 7.5H3.75V23.75H16.25"
                  stroke="#36373C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 15.5C9.58579 15.5 9.25 15.8358 9.25 16.25C9.25 16.6642 9.58579 17 10 17V15.5ZM28.0303 16.7803C28.3232 16.4874 28.3232 16.0126 28.0303 15.7197L23.2574 10.9467C22.9645 10.6538 22.4896 10.6538 22.1967 10.9467C21.9038 11.2396 21.9038 11.7145 22.1967 12.0074L26.4393 16.25L22.1967 20.4926C21.9038 20.7855 21.9038 21.2604 22.1967 21.5533C22.4896 21.8462 22.9645 21.8462 23.2574 21.5533L28.0303 16.7803ZM10 17L27.5 17V15.5L10 15.5V17Z"
                  fill="#36373C"
                />
              </svg>

              <Text color={color.bg100} size={fontSize.base} bold2="400">
                로그아웃
              </Text>
            </Grid>
          )}

          <Footer {...props}></Footer>
        </Grid>
      </Grid>
    );
  } else {
    return <Spinner />;
  }
};

MyPage.defaultProps = {};

const Profile = styled.div`
  margin: auto;
  width: 10rem;
  height: 10rem;
  border-radius: 5rem;
  ${(props) =>
    props.user_profile
      ? `background-image: url(${props.user_profile});`
      : `background-image: url(http://115.85.182.57:8080/image/profileDefaultImg.jpg)`}
  background-size: cover;
  background-position: center;
`;

export default MyPage;
