import React from "react";
import styled from "styled-components";
import { useState } from "react";
import logger from "../shared/Console";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postAction } from "../redux/modules/post";
import { actionCreators as userAction } from "../redux/modules/user";
import { Kakao_auth_url } from "../shared/OAuth";

// style
import { Button, Grid, Text } from "../elements";
import { UploadInput, UploadContents, Header, Footer } from "../components";
import theme from "../styles/theme";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const [post_info, setPostInfo] = useState({});

  const { color, border, radius, fontSize } = theme;

  const user_info = useSelector((state) => state.user.user);

  if (is_login) {
    return (
      <Grid maxWidth="36rem" minWidth="36rem" minHeight="100vh" border={border.line1} margin="0 auto">
        <Grid shape="container">
          <Header {...props} shape="마이페이지" />
          <Footer {...props}></Footer>
        </Grid>
        <Grid width="36rem" height="12rem" margin="0 auto" is_flex2>
          <Profile></Profile>
          <svg
            style={{ position: "absolute", margin: "3rem 0 0 4rem" }}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15" cy="15" r="14.5" fill="white" stroke="#CECAC7" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.8541 11C6.83011 11 6 11.8301 6 12.8541V17.8571C6 19.8619 6 20.8643 6.45983 21.5961C6.69961 21.9777 7.02229 22.3004 7.4039 22.5402C8.13571 23 9.1381 23 11.1429 23H18.8571C20.8619 23 21.8643 23 22.5961 22.5402C22.9777 22.3004 23.3004 21.9777 23.5402 21.5961C24 20.8643 24 19.8619 24 17.8571V12.8541C24 11.8301 23.1699 11 22.1459 11C21.4436 11 20.8016 10.6032 20.4875 9.97508L19.6667 8.33333L19.6666 8.33329C19.5567 8.1134 19.5017 8.00345 19.4394 7.90782C19.1141 7.40882 18.5833 7.08078 17.9915 7.01299C17.8781 7 17.7552 7 17.5093 7H12.4907C12.2448 7 12.1219 7 12.0085 7.01299C11.4167 7.08078 10.8859 7.40882 10.5606 7.90782C10.4983 8.00346 10.4433 8.11342 10.3333 8.33333L9.51246 9.97508C9.19839 10.6032 8.55638 11 7.8541 11ZM17 16C17 17.1046 16.1046 18 15 18C13.8954 18 13 17.1046 13 16C13 14.8954 13.8954 14 15 14C16.1046 14 17 14.8954 17 16ZM19 16C19 18.2091 17.2091 20 15 20C12.7909 20 11 18.2091 11 16C11 13.7909 12.7909 12 15 12C17.2091 12 19 13.7909 19 16Z"
              fill="#CECAC7"
            />
          </svg>
          <Grid
            is_flex2
            width="9rem"
            height="3rem"
            absolute="absolute"
            top="16.5rem"
          >
            <Grid>
              <Text
                width="9rem"
                size={fontSize.base}
                color={color.bg100}
                bold
                line_height="150%"
                text_align="center"
                overflow="hidden"
                text_overflow="ellipsis"
                white_space="nowrap"
                display="block"
              >
                user_name
              </Text>
            </Grid>
            <svg
              style={{ position: "absolute", margin: "-1rem 0 0 11.5rem" }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.204 10.7962L19 9.00019C19.5453 8.45494 19.8179 8.18231 19.9636 7.88822C20.2409 7.32866 20.2409 6.67171 19.9636 6.11215C19.8179 5.81806 19.5453 5.54544 19 5.00019C18.4548 4.45494 18.1821 4.18231 17.888 4.03658C17.3285 3.75929 16.6715 3.75929 16.112 4.03658C15.8179 4.18231 15.5453 4.45494 15 5.00019L13.1814 6.81884C14.1452 8.46944 15.5314 9.845 17.204 10.7962ZM11.7269 8.2733L4.8564 15.1438C4.43134 15.5689 4.21881 15.7814 4.07907 16.0425C3.93934 16.3036 3.88039 16.5983 3.7625 17.1878L3.1471 20.2648C3.08058 20.5974 3.04732 20.7637 3.14193 20.8583C3.23654 20.9529 3.40284 20.9196 3.73545 20.8531L6.81243 20.2377C7.40189 20.1198 7.69661 20.0609 7.95771 19.9211C8.21881 19.7814 8.43134 19.5689 8.8564 19.1438L15.7458 12.2544C14.1241 11.2388 12.7524 9.87646 11.7269 8.2733Z"
                fill="#CECAC7"
              />
            </svg>
          </Grid>
          <Grid
            width="36rem"
            height="1.6rem"
            bg={color.bg20}
            absolute="absolute"
            top="22rem"
          />
        </Grid>

        <Grid
          width="20rem"
          height="3rem"
          absolute="absolute"
          top="26.5rem"
          margin="0 0 0 6.2rem"
        >
          <svg
            style={{ position: "absolute", margin: "0 0 0 -3rem" }}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15" cy="15" r="15" fill="#EBE9E8" />
          </svg>
          <Text
            width="7rem"
            height="2.4rem"
            size={fontSize.base}
            color={color.bg100}
            line_height="150%"
            text_align="left"
          >
            내가 쓴 글
          </Text>
        </Grid>
        <Grid
          width="20rem"
          height="3rem"
          absolute="absolute"
          top="31rem"
          margin="0 0 0 6.2rem"
        >
          <svg
            style={{ position: "absolute", margin: "0 0 0 -3rem" }}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15" cy="15" r="15" fill="#EBE9E8" />
          </svg>
          <Text
            width="7rem"
            height="2.4rem"
            size={fontSize.base}
            color={color.bg100}
            line_height="150%"
            text_align="left"
          >
            설정
          </Text>
        </Grid>
        {user_info && (
          <Grid
            width="20rem"
            height="3rem"
            absolute="absolute"
            top="35.5rem"
            margin="0 0 0 6.2rem"
          >
            <svg
              style={{ position: "absolute", margin: "0 0 0 -3rem" }}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15" cy="15" r="15" fill="#EBE9E8" />
            </svg>
            <Text
              width="7rem"
              height="2.4rem"
              size={fontSize.base}
              color={color.bg100}
              line_height="150%"
              text_align="left"
              cursor="t"
              _onClick={() => {
                dispatch(userAction.logOut())
              }}
            >
              로그아웃
            </Text>
          </Grid>
        )}

      </Grid>
    );
  } else {
    return (
      <Grid
        // height="100vh"
        maxWidth="36rem"
        border={border.line1}
        margin="0 auto"
      >
        <Grid shape="container">
          <Text>로그인 이후 이용가능한 서비스입니다.</Text>
          <Grid
            height="auto"
            maxWidth="35.5rem"
            margin="0 auto"
            padding="2.8rem 2rem 2.7rem"
            is_fixed="t"
            bg={color.bg0}
          >
            <Button
              shape="large"
              color="#FEE500"
              _onClick={() => {
                window.location.href = `${Kakao_auth_url}`;
              }}
            >
              <Grid is_flex4="t" height="4.4rem">
                <svg
                  style={{ position: "absolute", marginLeft: "1.9rem" }}
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.9"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 0C4.029 0 0 3.13 0 6.989C0.063509 8.21942 0.463823 9.40875 1.15723 10.4272C1.85063 11.4456 2.81048 12.254 3.93201 12.764L2.93201 16.431C2.914 16.5032 2.91832 16.5792 2.9444 16.6489C2.97048 16.7187 3.01708 16.7788 3.07806 16.8215C3.13905 16.8642 3.21157 16.8874 3.28601 16.888C3.36045 16.8886 3.4333 16.8667 3.495 16.825L7.87201 13.925C8.24201 13.961 8.61702 13.982 8.99902 13.982C13.969 13.982 17.999 10.853 17.999 6.993C17.999 3.133 13.969 0.0039978 8.99902 0.0039978"
                    fill="black"
                  />
                </svg>
                <Text margin="auto" size={fontSize.base} bold2="700">
                  카카오 로그인
                </Text>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

MyPage.defaultProps = {};

const Profile = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 5rem;
  background-image: url("https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg");
  background-size: cover;
  background-position: center;
`;
export default MyPage;
