import React from "react";
import logger from "../shared/Console";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import { Grid, Text, Image } from "../elements";
import theme from "../styles/theme";
import styled from "styled-components";
import {
  homeBrand100,
  homeback60,
  friendsBrand100,
  friends,
  chatBrand100,
  chatback60,
  mypageBrand100,
  mypageback60,
} from "../styles/img/index";
import { customAlert } from "./Sweet";

const Footer = (props) => {
  const dispatch = useDispatch();
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
            // dispatch(postActions.getPostAX("전체"));
            // dispatch(postActions.clearPost());
            history.push("/home");
          }}
        >
          <Grid is_flex4="t" justify_content="center">
            <Image
              src={
                path === "/home"
                  ? homeBrand100
                  : homeback60
              }
              size="3"
              margin="0"
            />
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
            <Image
              src={
                path === "/upload"
                  ? friendsBrand100
                  : friends
              }
              size="3"
              margin="0"
            />
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
            <Image
              src={
                path === "/chatlist" || path === "/allowchat"
                  ? chatBrand100
                  : chatback60
              }
              size="3"
              margin="0"
            />
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
            <Image
              src={
                path === "/mypage"
                  ? mypageBrand100
                  : mypageback60
              }
              size="3"
              margin="0"
            />
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
