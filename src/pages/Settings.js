import React from "react";
import styled from "styled-components";
import { useState } from "react";
import logger from "../shared/Console";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import { Kakao_auth_url } from "../shared/OAuth";
import Spinner from "../shared/Spinner";
import { Grid, Text } from "../elements";
import theme from "../styles/theme";
import { Header, PcSide } from "../components";

const Settings = (props) => {
  const dispatch = useDispatch();
  const { color, border, fontSize } = theme;
  return (
    <>
      <PcSide {...props} />
      <Grid
        // maxWidth="36rem"
        minHeight="100vh"
        // border={border.line1}
        margin="0 auto"
      >
        <Grid shape="container">
          <Header {...props} shape="설정" />
          <Grid height="4.4rem" />
          <Grid
            is_flex4="t"
            padding="1.9rem 2rem"
            borderBottom={border.bg20}
            cursor="t"
            _onClick={() => {
              dispatch(userActions.logOut());
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
                d="M17.5 6.25H5V23.75H17.5"
                stroke="#36373C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 15H26.25"
                stroke="#36373C"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M21.25 10L26.25 15L21.25 20"
                stroke="#36373C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Text color={color.bg100} size={fontSize.base} bold2="400">
              로그아웃
            </Text>
          </Grid>
          <Grid
            is_flex4="t"
            padding="1.9rem 2rem"
            borderBottom={border.bg20}
            cursor="t"
            _onClick={() => {
              window.alert("구현되지 않은 기능입니다.");
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
              <circle
                cx="15"
                cy="15"
                r="11"
                stroke="#36373C"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M10.0152 19.4941C10.5956 18.9914 11.3711 18.62 12.2227 18.3742C13.0821 18.1261 14.0386 18 15 18C15.9614 18 16.9179 18.1261 17.7774 18.3742C18.6289 18.62 19.4044 18.9914 19.9848 19.4941"
                stroke="#36373C"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="11.25"
                cy="12.5"
                r="1.5"
                fill="#36373C"
                stroke="#36373C"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
              <circle
                cx="18.75"
                cy="12.5"
                r="1.5"
                fill="#36373C"
                stroke="#36373C"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
            </svg>

            <Text color={color.bg100} size={fontSize.base} bold2="400">
              밀착 탈퇴하기
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Settings;
