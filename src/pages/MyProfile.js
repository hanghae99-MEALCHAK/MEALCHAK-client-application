import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { actionCreators as userAction } from '../redux/modules/user';

// style
import { Button, Grid, Text } from '../elements';
import { Header } from '../components';
import theme from '../styles/theme';
import { MyOneReview } from '../components';
import Spinner from '../shared/Spinner';
import logger from '../shared/Console';

const MyProfile = (props) => {
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
    logger('props from MyPage : ', location.state);
    logger('MyProfile another_user_info: ', other_user);
  }, []);

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
            {/* <Grid
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
            </Grid> */}
            <Grid
              is_flex
              width="32rem"
              height="7.9rem"
              margin="1.5rem auto 2rem auto"
            >
              <Grid
                is_flex_column
                width="10.1rem"
                height="7.9rem"
                bg={color.bg0}
                border={border.bg40}
                margin="0rem auto 0.5rem"
                padding="0rem 0.5rem 0.5rem 0.5rem"
                justify_content="center"
                radius={radius.button}
              >
                <Text
                  width="3.1rem"
                  height="3.2rem"
                  size={fontSize.display4}
                  bold
                  text_align="center"
                  line_height="150%"
                  color={color.brand100}
                >
                  {other_user?.user_manner.toFixed(1)}
                </Text>
                <Text
                  width="4rem"
                  height="1.5rem"
                  size={fontSize.tiny}
                  bold2="500"
                  line_height="150%"
                  text_align="center"
                  color={color.bg80}
                  padding="0"
                >
                  매너 점수
                </Text>
              </Grid>
              <Grid
                is_flex_column
                width="10.1rem"
                height="7.9rem"
                bg={color.bg0}
                border={border.bg40}
                margin="0rem auto 0.5rem"
                padding="0rem 0.5rem 0.5rem 0.5rem"
                justify_content="center"
                radius={radius.button}
              >
                <Text
                  width={!other_user?.user_gender ? "4.5rem" : "3.1rem"}
                  height={!other_user?.user_gender ? "2.4rem" : "2.7rem"}
                  size={
                    !other_user?.user_gender ? fontSize.base : fontSize.display4
                  }
                  bold
                  text_align="center"
                  line_height="150%"
                  margin={
                    !other_user?.user_gender ? "0.5rem 0 0 0" : "0.1rem 0 0 0"
                  }
                  padding={!other_user?.user_gender ? "0 0 2.6rem 0" : ""}
                  color={color.brand100}
                >
                  {other_user?.user_gender ? (
                    other_user?.user_gender === "male" ? (
                      <svg
                        width="2.4rem"
                        height="2.4rem"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="8"
                          cy="12"
                          r="4"
                          stroke="#FF9425"
                          strokeWidth="2"
                        />
                        <line
                          x1="16"
                          y1="4"
                          x2="16"
                          y2="9"
                          stroke="#FF9425"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="16"
                          y1="4"
                          x2="11"
                          y2="4"
                          stroke="#FF9425"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="15.6569"
                          y1="4.41421"
                          x2="11.4142"
                          y2="8.65685"
                          stroke="#FF9425"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="2.4rem"
                        height="2.4rem"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="8.3999"
                          r="4.8"
                          stroke="#FF9425"
                          strokeWidth="2.4"
                        />
                        <line
                          x1="11.9998"
                          y1="14.4"
                          x2="11.9998"
                          y2="20.4"
                          stroke="#FF9425"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                        <line
                          x1="15.5998"
                          y1="16.8001"
                          x2="8.3998"
                          y2="16.8001"
                          stroke="#FF9425"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    )
                  ) : (
                    "미입력"
                  )}
                </Text>
                <Text
                  width="4rem"
                  height="1.5rem"
                  size={fontSize.tiny}
                  bold2="500"
                  line_height="150%"
                  text_align="center"
                  color={color.bg80}
                  padding="0"
                >
                  성별
                </Text>
              </Grid>
              <Grid
                is_flex_column
                width="10.1rem"
                height="7.9rem"
                bg={color.bg0}
                border={border.bg40}
                margin="0rem auto 0.5rem"
                padding="0rem 0.5rem 0.5rem 0.5rem"
                justify_content="center"
                radius={radius.button}
              >
                <Text
                  width="3.4rem"
                  height="2.4rem"
                  size={fontSize.base}
                  bold
                  text_align="center"
                  line_height="150%"
                  color={color.brand100}
                  padding="0 0 2.6rem 0"
                  margin="0.5rem 0 0 0"
                >
                  {other_user.user_age?.includes("1")
                    ? "10대"
                    : other_user.user_age?.includes("2")
                    ? "20대"
                    : other_user.user_age?.includes("3")
                    ? "30대"
                    : other_user.user_age?.includes("4")
                    ? "40대"
                    : other_user.user_age?.includes("5")
                    ? "50대"
                    : "미입력"}
                </Text>
                <Text
                  width="4rem"
                  height="1.5rem"
                  size={fontSize.tiny}
                  bold2="500"
                  line_height="150%"
                  text_align="center"
                  color={color.bg80}
                  padding="0"
                >
                  연령
                </Text>
              </Grid>
            </Grid>

            <Grid width="32rem" height="5rem" margin="0 auto">
              <Button
                width="32rem"
                height="5rem"
                radius={radius.button}
                border="0.1rem solid #EBE9E8"
                bg={color.bg0}
                margin="0 0 6.4rem 0"
              >
                <Text
                  width="30.4rem"
                  height="2.4rem"
                  bold
                  size={fontSize.base}
                  line_height="150%"
                  text_align="center"
                  color={color.bg60}
                >
                  나에겐 리뷰를 남길 수 없어요
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

MyProfile.defaultProps = {};

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
export default MyProfile;
