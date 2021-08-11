import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import logger from '../shared/Console';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postAction } from '../redux/modules/post';
import { actionCreators as userAction } from '../redux/modules/user';
import { Kakao_auth_url } from '../shared/OAuth';
import Spinner from '../shared/Spinner';
import { history } from '../redux/configureStore';
import { useLocation } from 'react-router';
import { MyOneReview } from '../components';

// style
import { Button, Grid, Input, Text } from '../elements';
import { Header, Footer } from '../components';
import theme from '../styles/theme';

const UserProfile = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const is_login = useSelector((state) => state.user?.is_login);
  const other_user = useSelector((state) => state.user?.anotherUser);
  const user_id = location.state?.user_id;
  const { color, border, fontSize, radius } = theme;
  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(userAction.loginCheck());
    dispatch(userAction.findUserProfileAX(user_id));
    logger('Mypage props: ', location.state);
    logger('another_user_info: ', other_user);
  }, []);

  // React.useEffect(() => {
  //   dispatch(userAction.loginCheck());
  // }, [
  //   user_info ? user_info?.user_nickname : null,
  //   user_info ? user_info?.user_comment : null,
  // ]);

  if (is_login) {
    return (
      <React.Fragment>
        <Grid
          maxWidth="36rem"
          minHeight="100vh"
          border={border.line1}
          margin="0 auto"
        >
          <Grid shape="container">
            <Header {...props} shape="프로필" />
            <Grid height="4.4rem" />

            <Grid margin="1.6rem auto 2rem">
              <Profile user_profile={other_user?.user_profile}></Profile>
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
                {other_user?.user_nickname}
              </Text>
              <Grid width="auto" text_align="center">
                <Text size={fontSize.small} color="#9A9896" line_height="150%">
                  {other_user?.user_comment ? other_user?.user_comment : ''}
                </Text>
              </Grid>
            </Grid>
            <Grid
              bg={color.bg0}
              margin="0rem auto 0.5rem"
              padding="0rem 0.5rem 0.5rem 0.5rem"
              justify_content="center"
            >
              <Text
                height="6.8rem"
                bold
                text_align="center"
                size="4.5rem"
                line_height="150%"
                color={color.brand100}
              >
                {other_user?.user_manner.toFixed(1)}
              </Text>
              <Text
                height="2rem"
                size="1.3rem"
                line_height="150%"
                text_align="center"
                color={color.bg80}
                padding="0"
              >
                매너 점수
              </Text>
            </Grid>

            <Grid width="32rem" height="5rem" margin="0 auto">
              <Button
                width="32rem"
                height="5rem"
                radius={radius.button}
                border="0.1rem solid #EBE9E8"
                bg={color.bg0}
                margin="0 0 6.4rem 0"
                cursor="t"
                _onClick={() => {
                  history.push({
                    pathname: '/write',
                    state: {
                      user_id: other_user?.user_id,
                      profile: other_user?.user_profile,
                      nickname: other_user?.user_nickname,
                    },
                  });
                }}
              >
                <Text
                  width="30.4rem"
                  height="2.4rem"
                  bold
                  size={fontSize.base}
                  line_height="150%"
                  text_align="center"
                  color={color.brand100}
                >
                  리뷰 남기기
                </Text>
              </Button>
            </Grid>
            <Grid height="1.6rem" />
            {other_user?.user_review.length !== 0 ? (
              other_user?.user_review.map((p, idx) => {
                return <MyOneReview other_user {...p} key={idx} />;
              })
            ) : (
              <Grid width="36rem" margin="0 auto">
                <MyReviewImg src="illust/emptyMeal_3x.png"></MyReviewImg>
                <MyReviewText>아직 받은 리뷰가 없어요.</MyReviewText>
              </Grid>
            )}
            <Grid height="6rem" />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else {
    return <Spinner />;
  }
};

UserProfile.defaultProps = {};

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

const MyReviewImg = styled.div`
  margin: 4.7rem auto 0 auto;
  background-image: url('${(props) => props.src}');
  width: 20rem;
  height: 11.7rem;
  background-size: cover;
  background-position: center;
`;

const MyReviewText = styled.div`
  width: 36rem;
  margin: 1rem auto 0 auto;
  font-size: 1.6rem;
  line-height: 150%;
  text-align: center;
  font-weight: 400;
  color: #9a9896;
`;
export default UserProfile;
