import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { history } from "../redux/configureStore";
import { actionCreators as userAction } from "../redux/modules/user";

import { MyOneReview } from "../components";
import Spinner from "../shared/Spinner";

// style
import { Button, Grid, Text } from "../elements";
import { Header, ProfileTab } from "../components";
import styled from "styled-components";
import theme from "../styles/theme";
import logger from "../shared/Console";

const UserProfile = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const is_login = useSelector((state) => state.user?.is_login);
  const other_user = useSelector((state) => state.user?.anotherUser);
  const user_id = location.state?.user_id
    ? location.state.user_id
    : location.state.userId;
  const id = props.match.params.id;
  const { color, border, fontSize, radius } = theme;

  React.useEffect(() => {
    document
      .querySelector("body")
      .scrollTo({ top: 0, left: 0, behavior: "instant" });

    dispatch(userAction.loginCheck());
    dispatch(userAction.findUserProfileAX(user_id));
    logger("UserProfile props state: ", location.state);
    logger("UserProfile props: ", props);
    logger("another_user_info: ", other_user);
    logger("id : ", typeof id);
  }, []);

  React.useEffect(() => {
    dispatch(userAction.findUserProfileAX(id));
  },[dispatch, props.match.params.id])

  if (is_login) {
    return (
      <React.Fragment>
        <Grid
          maxWidth="36rem"
          minHeight="100vh"
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
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {other_user?.user_comment ? other_user?.user_comment : ""}
                  </span>
                </Text>
              </Grid>
            </Grid>
            {/* 매너점수, 성별, 연령 */}
            <ProfileTab user_info={other_user} />

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
                    pathname: "/write",
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
  background-image: url("${(props) => props.src}");
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
