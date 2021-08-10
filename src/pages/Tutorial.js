import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useSelector } from 'react-redux';
// kakao login
import { Kakao_auth_url } from '../shared/OAuth';

// style
import { Button, Grid, Text } from '../elements';
import theme from '../styles/theme';

import { TutorialSwiper } from '../components';
import { customAlert } from '../components/Sweet';

const Tutorial = (props) => {
  const { color, border, fontSize, radius } = theme;
  const is_login = useSelector((state) => state.user.is_login);
  // splash screen
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // 로그인 한 사용자가 로딩 시간때문인지 일정시간이 지나야 아래 부분실행됨
    if (is_login) {
      customAlert.sweetConfirmReload(
        '로그인 한 사용자입니다.',
        '홈으로 돌아갑니다.',
        'history'
      );
    }
  }, [is_login]);

  return (
    <React.Fragment>
      {loading ? (
        <Grid is_flex4 height="100vh">
          <LogoImg src="/illust/logo_3x.png"></LogoImg>
        </Grid>
      ) : (
        <Grid
          maxWidth="36rem"
          border={border.line1}
          margin="0 auto"
          padding="2rem"
          minHeight="100vh"
          text_align="center"
        >
          <Grid shape="container">
            <Grid margin="2rem auto">
              <TutorialSwiper></TutorialSwiper>
            </Grid>
            <Grid height="6rem"></Grid>
            <Grid
              is_flex4="t"
              justify_content="center"
              maxWidth="35.8rem"
              height="auto"
              margin="auto"
              is_fixed="t"
              fix_center
              bottom="0rem"
              padding="1rem 0"
              gap="1.6rem"
            >
              <Grid width="40%">
                <Button
                  // margin="1.6rem auto"
                  height="5rem"
                  border="none"
                  radius={radius.button}
                  _onClick={() => {
                    history.push('/home');
                  }}
                  bg={color.brand20}
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
              </Grid>
              <Grid width="40%">
                <Button
                  bg="#FEE500"
                  height="5rem"
                  border="none"
                  radius={radius.button}
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

const LogoImg = styled.div`
  margin: auto;
  background-image: url('${(props) => props.src}');
  width: 240px;
  height: 80px;
  background-size: cover;
  background-position: center;
`;

export default Tutorial;
