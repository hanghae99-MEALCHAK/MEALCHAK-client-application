import React from "react";
import logger from "../shared/Console";
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";

import { Grid, Text, Image } from "../elements";
import theme from "../styles/theme";
import styled from "styled-components";

// 이미지
import { png } from "../styles/img/index";
import { webp } from "../styles/img/webp/index";
import { isWebpSupported } from "react-image-webp/dist/utils";

import { customAlert } from "./Sweet";

const Footer = (props) => {
  const { color, fontSize } = theme;

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
      customAlert.sweetNeedLogin("replace");
    }
  };

  return (
    <GridTop>
      <Div>
        <Grid
          shape="container"
          text_align="center"
          maxWidth="9rem"
          _onClick={() => {
            history.push("/home");
          }}
        >
          <Grid is_flex4="t" justify_content="center">
            {isWebpSupported() ? (
              <Image
                cursor="t"
                src={
                  path === "/home" ? webp.homeBrand100Webp : webp.homeback60Webp
                }
                size="3"
                margin="0"
              />
            ) : (
              <Image
                cursor="t"
                src={path === "/home" ? png.homeBrand100 : png.homeback60}
                size="3"
                margin="0"
              />
            )}
          </Grid>
          <Grid is_flex4="t" justify_content="center">
            <Text
              text_align="center"
              size={fontSize.tiny}
              color={path === "/home" ? color.brand100 : color.bg80}
              cursor="t"
              bold2={path === "/home" ? "700" : "400"}
            >
              홈
            </Text>
          </Grid>
        </Grid>

        <Grid
          shape="container"
          text_align="center"
          maxWidth="9rem"
          _onClick={() => {
            loginCheck("upload");
          }}
        >
          <Grid is_flex4="t" justify_content="center">
            {isWebpSupported() ? (
              <Image
                cursor="t"
                src={
                  path === "/upload"
                    ? webp.friendsBrand100Webp
                    : webp.friendsWebp
                }
                size="3"
                margin="0"
              />
            ) : (
              <Image
                cursor="t"
                src={path === "/upload" ? png.friendsBrand100 : png.friends}
                size="3"
                margin="0"
              />
            )}
          </Grid>
          <Grid is_flex4="t" justify_content="center">
            <Text
              text_align="center"
              size={fontSize.tiny}
              color={path === "/upload" ? color.brand100 : color.bg80}
              cursor="t"
              bold2={path === "/upload" ? "700" : "400"}
            >
              모임 만들기
            </Text>
          </Grid>
        </Grid>
        <Grid
          shape="container"
          text_align="center"
          maxWidth="9rem"
          _onClick={() => {
            loginCheck("chatlist");
          }}
        >
          <Grid is_flex4="t" justify_content="center">
            {isWebpSupported() ? (
              <Image
                cursor="t"
                src={
                  path === "/chatlist" || path === "/allowchat"
                    ? webp.chatBrand100Webp
                    : webp.chatback60Webp
                }
                size="3"
                margin="0"
              />
            ) : (
              <Image
                cursor="t"
                src={
                  path === "/chatlist" || path === "/allowchat"
                    ? png.chatBrand100
                    : png.chatback60
                }
                size="3"
                margin="0"
              />
            )}
          </Grid>
          <Grid is_flex4="t" justify_content="center">
            <Text
              text_align="center"
              size={fontSize.tiny}
              color={
                path === "/chatlist" || path === "/allowchat"
                  ? color.brand100
                  : color.bg80
              }
              cursor="t"
              bold2={
                path === "/chatlist" || path === "/allowchat" ? "700" : "400"
              }
            >
              채팅
            </Text>
          </Grid>
        </Grid>

        <Grid
          shape="container"
          text_align="center"
          maxWidth="9rem"
          _onClick={() => {
            loginCheck("mypage");
          }}
        >
          <Grid is_flex4="t" justify_content="center">
            {isWebpSupported() ? (
              <Image
                cursor="t"
                src={
                  path === "/mypage"
                    ? webp.mypageBrand100Webp
                    : webp.mypageback60Webp
                }
                size="3"
                margin="0"
              />
            ) : (
              <Image
                cursor="t"
                src={path === "/mypage" ? png.mypageBrand100 : png.mypageback60}
                size="3"
                margin="0"
              />
            )}
          </Grid>
          <Grid is_flex4="t" justify_content="center">
            <Text
              text_align="center"
              size={fontSize.tiny}
              color={path === "/mypage" ? color.brand100 : color.bg80}
              cursor="t"
              bold2={path === "/mypage" ? "700" : "400"}
            >
              마이페이지
            </Text>
          </Grid>
        </Grid>
      </Div>
    </GridTop>
  );
};

const GridTop = styled.div`
  @media (min-width: 415px) {
    max-width: 35.8rem;
  }

  @media (min-width: 950px) {
    display: none;
  }

  height: 5.2rem;
  width: 100%;
  margin: 0 auto;
  padding: 0.5rem 0;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.06);
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default Footer;
