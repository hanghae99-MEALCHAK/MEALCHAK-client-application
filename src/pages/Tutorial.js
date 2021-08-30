// mealchak서비스 첫 페이지(splash screen, 간단 소개, 카카오 로그인)
import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";
// kakao login
import { Kakao_auth_url } from "../shared/OAuth";

// style
import { Button, Grid, Text } from "../elements";
import theme from "../styles/theme";
import { TutorialSwiper } from "../components";
import { customAlert } from "../components/Sweet";

// 이미지
import { png } from "../styles/img/index";
import { webp } from '../styles/img/webp/index';
import {isWebpSupported} from 'react-image-webp/dist/utils';

const Tutorial = (props) => {
  const { color, fontSize, radius } = theme;
  const is_login = useSelector((state) => state.user.is_login);
  // splash screen
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // splash screen 시간 설정
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // 로그인 한 사용자가 로딩 시간때문인지 일정시간이 지나야 아래 부분실행됨
    if (is_login) {
      customAlert.sweetConfirmReload(
        "앗 이미 로그인 중이에요",
        ["홈 화면으로 이동할게요."],
        "history"
      );
    }
  }, [is_login]);

  return (
    <React.Fragment>
      {loading ? (
        <Grid is_flex4 height="100vh">
          <LogoImg src={isWebpSupported() ? webp.mainLogoWebp : png.mainLogo}/>
        </Grid>
      ) : (
        <Grid
          maxWidth="36rem"
          margin="0 auto"
          minHeight="100vh"
          text_align="center"
        >
          <GridMedia>
            <Grid margin="2rem auto">
              <TutorialSwiper></TutorialSwiper>
            </Grid>
            <DisplayGrid>
              <Button
                height="5rem"
                border="none"
                radius={radius.button}
                bg={color.brand20}
                cursor="t"
                _onClick={() => {
                  history.push("/home");
                }}
              >
                <Text
                  margin="auto"
                  size={fontSize.small}
                  bold2="700"
                  color={color.brand100}
                >
                  밀착 둘러보기
                </Text>
              </Button>
              <Button
                bg="#FEE500"
                height="5rem"
                border="none"
                radius={radius.button}
                cursor="t"
                _onClick={() => {
                  window.location.href = `${Kakao_auth_url}`;
                }}
              >
                <Grid is_flex4="t">
                  <Grid width="4rem" is_flex4="t" justify_content="center">
                    <svg
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
                  </Grid>
                  <Text size={fontSize.small} bold2="700">
                    카카오 로그인
                  </Text>
                </Grid>
              </Button>
            </DisplayGrid>
          </GridMedia>
        </Grid>
      )}
    </React.Fragment>
  );
};

const LogoImg = styled.div`
  margin: auto;
  background-image: url("${(props) => props.src}");
  width: 240px;
  height: 80px;
  background-size: cover;
  background-position: center;
`;

const DisplayGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.6rem;
  padding: 0 2rem 1.6rem;
  width: 36rem;
  height: auto;
  position: fixed;
  bottom: 0;
  z-index: 1;
`;

const GridMedia = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-aspect-ratio: 3/4) {
    margin-top: 0rem;
  }
  @media (max-aspect-ratio: 3/4) and (min-height: 1000px) {
    margin-top: 10rem;
  }
  @media (max-aspect-ratio: 3/4) and (min-height: 1300px) {
    margin-top: 20rem;
  }
  @media (max-aspect-ratio: 5/8) and (min-height: 1200px) {
    margin-top: 20rem;
  }
  @media (max-aspect-ratio: 3/5) and (max-height: 900px) {
    margin-top: 5rem;
  }
  @media (max-aspect-ratio: 3/5) and (min-height: 900px) {
    margin-top: 5rem;
  }
  @media (max-aspect-ratio: 1/2) and (max-height: 900px) {
    margin-top: 10rem;
  }
  @media (max-aspect-ratio: 28/65) {
    margin-top: 15rem;
  }
`;

export default Tutorial;
