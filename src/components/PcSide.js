import React from "react";
import logger from "../shared/Console";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { token } from "../shared/OAuth";

import { Grid, Text, Image } from "../elements";
import theme from "../styles/theme";
import styled from "styled-components";
import { customAlert } from "./Sweet";

// 이미지
import { png } from "../styles/img/index";
import { webp } from "../styles/img/webp/index";
import { isWebpSupported } from "react-image-webp/dist/utils";

const PcSide = (props) => {
  const dispatch = useDispatch();
  const { color, fontSize } = theme;

  //   const path = document.location.href.split("/")[3];
  //   const path = props.history.location.pathname;
  const path = props.match.path;

  const is_login = useSelector((state) => state.user.is_login);

  // props로 받아온 주소정보로 현재위치 탭 color 변경
  React.useEffect(() => {
    logger("side props", props);
  }, [path]);

  const loginCheck = (path) => {
    if (is_login) {
      history.push(`/${path}`);
    } else {
      customAlert.sweetNeedLogin();
    }
  };

  return (
    <SideGrid is_tutorial={path}>
      <Grid shape="container" maxWidth="16rem">
        <SideLogo
          src={isWebpSupported() ? webp.mainLogoWebp : png.mainLogo}
          alt="side-menu-logo"
          onClick={() => {
            history.push("/home");
          }}
        />

        <Grid
          is_flex4="t"
          align_items="center"
          margin="0 auto 1.64rem"
          _onClick={() => {
            history.push("/home");
          }}
        >
          {isWebpSupported() ? (
            <Image
              src={
                path === "/home" || path === "/address" || path === "/post/:id"
                  ? webp.homeBrand100Webp
                  : webp.homeBg100Webp
              }
              size="2.74"
              margin="0 1.6rem 0 0"
            />
          ) : (
            <Image
              src={
                path === "/home" || path === "/address" || path === "/post/:id"
                  ? png.homeBrand100
                  : png.homeBg100
              }
              size="2.74"
              margin="0 1.6rem 0 0"
            />
          )}
          <Text
            text_align="center"
            size={fontSize.small}
            color={
              path === "/home" || path === "/address" || path === "/post/:id"
                ? color.brand100
                : color.bg100
            }
            cursor="t"
            bold2={
              path === "/home" || path === "/address" || path === "/post/:id"
                ? "700"
                : "500"
            }
          >
            홈
          </Text>
        </Grid>

        <Grid
          is_flex4="t"
          align_items="center"
          margin="0 auto 1.64rem"
          _onClick={() => {
            loginCheck("upload");
          }}
        >
          {isWebpSupported() ? (
            <Image
              src={
                path === "/upload" || path === "/upload/:id"
                  ? webp.friendsBrand100Webp
                  : webp.friendsBg100Webp
              }
              size="2.74"
              margin="0 1.6rem 0 0"
            />
          ) : (
            <Image
              src={
                path === "/upload" || path === "/upload/:id"
                  ? png.friendsBrand100
                  : png.friendsBg100
              }
              size="2.74"
              margin="0 1.6rem 0 0"
            />
          )}
          <Text
            text_align="center"
            size={fontSize.small}
            color={
              path === "/upload" || path === "/upload/:id"
                ? color.brand100
                : color.bg100
            }
            cursor="t"
            bold2={path === "/upload" || path === "/upload/:id" ? "700" : "500"}
          >
            모임 만들기
          </Text>
        </Grid>

        <Grid
          is_flex4="t"
          align_items="center"
          margin="0 auto 1.64rem"
          _onClick={() => {
            loginCheck("chatlist");
          }}
        >
          {isWebpSupported() ? (
            <Image
              src={
                path === "/chatlist" ||
                path === "/allowchat" ||
                path === "/chatting"
                  ? webp.chatBrand100Webp
                  : webp.chatback100Webp
              }
              size="2.74"
              margin="0 1.6rem 0 0"
            />
          ) : (
            <Image
              src={
                path === "/chatlist" ||
                path === "/allowchat" ||
                path === "/chatting"
                  ? png.chatBrand100
                  : png.chatback100
              }
              size="2.74"
              margin="0 1.6rem 0 0"
            />
          )}
          <Text
            text_align="center"
            size={fontSize.small}
            color={
              path === "/chatlist" ||
              path === "/allowchat" ||
              path === "/chatting"
                ? color.brand100
                : color.bg100
            }
            cursor="t"
            bold2={
              path === "/chatlist" ||
              path === "/allowchat" ||
              path === "/chatting"
                ? "700"
                : "500"
            }
          >
            채팅
          </Text>
        </Grid>

        <Grid
          is_flex4="t"
          align_items="center"
          margin="0 auto 1.64rem"
          _onClick={() => {
            loginCheck("mypage");
          }}
        >
          {isWebpSupported() ? (
            <Image
              src={
                path === "/mypage" ||
                path === "/settings" ||
                path === "/myreview" ||
                path === "/profile" ||
                path === "/mypost"
                  ? webp.mypageBrand100Webp
                  : webp.mypageback100Webp
              }
              size="2.74"
              margin="0 1.6rem 0 0"
            />
          ) : (
            <Image
              src={
                path === "/mypage" ||
                path === "/settings" ||
                path === "/myreview" ||
                path === "/profile" ||
                path === "/mypost"
                  ? png.mypageBrand100
                  : png.mypageback100
              }
              size="2.74"
              margin="0 1.6rem 0 0"
            />
          )}
          <Text
            text_align="center"
            size={fontSize.small}
            color={
              path === "/mypage" ||
              path === "/settings" ||
              path === "/myreview" ||
              path === "/profile" ||
              path === "/mypost"
                ? color.brand100
                : color.bg100
            }
            cursor="t"
            bold2={
              path === "/mypage" ||
              path === "/settings" ||
              path === "/myreview" ||
              path === "/profile" ||
              path === "/mypost"
                ? "700"
                : "500"
            }
          >
            마이페이지
          </Text>
        </Grid>

        {token && path !== "/settings" && (
          <Grid
            is_flex4="t"
            align_items="center"
            margin="0 auto 1.64rem"
            _onClick={() => {
              dispatch(userActions.logOut());
            }}
          >
            <Image
              src={isWebpSupported() ? webp.exitGrayWebp : png.exitGray}
              size="2.74"
              margin="0 1.6rem 0 0"
            />
            <Text
              text_align="center"
              size={fontSize.small}
              color={color.bg80}
              cursor="t"
              bold2="500"
            >
              로그아웃
            </Text>
          </Grid>
        )}
      </Grid>
    </SideGrid>
  );
};

const SideGrid = styled.div`
  /* width: fit-content; */
  width: intrinsic;
  height: 100%;
  box-sizing: border-box;
  padding: 2.19rem 6.18rem 0 0;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-200%);
  -webkit-transform: translateX(-200%);
  @media (max-width: 1200px) {
    padding: 2.19rem 5rem 0 0;
  }
  @media (max-width: 1190px) {
    padding: 2.19rem 4.9rem 0 0;
  }
  @media (max-width: 1150px) {
    padding: 2.19rem 4.5rem 0 0;
  }
  @media (max-width: 1100px) {
    padding: 2.19rem 4rem 0 0;
  }
  @media (max-width: 1050px) {
    padding: 2.19rem 3.5rem 0 0;
  }

  @media (max-width: 950px) {
    display: none;
  }
`;

const SideLogo = styled.img`
  width: 12.5rem;
  height: 4.034rem;
  margin-bottom: 1.65rem;
  cursor: pointer;
`;

export default PcSide;
