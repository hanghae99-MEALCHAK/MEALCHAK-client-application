// 마이페이지 - 내가 받은 리뷰
import React from 'react';
import styled from 'styled-components';
import logger from '../shared/Console';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as userActions } from '../redux/modules/user';
import Spinner from '../shared/Spinner';
import { history } from '../redux/configureStore';
import { MyOneReview } from '../components';

// style
import { Button, Grid, Input, Text } from '../elements';
import { Header } from '../components';
import theme from '../styles/theme';

const MyReview = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user?.is_login);
  const my_review = useSelector((state) => state.user?.myReview);
  const { color, border, fontSize } = theme;

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(userActions.loginCheck());
    if (my_review.length === 0) {
      dispatch(userActions.getMyReviewAX());
    }
  }, []);

  if (is_login) {
    return (
      <Grid
        maxWidth="36rem"
        minWidth="36rem"
        minHeight="100vh"
        border={border.line1}
        margin="0 auto"
      >
        <Grid shape="container">
          <Header {...props} shape="내가받은리뷰" />
          <Grid height="4.4rem" />
          <Grid height="1.6rem" />
          {my_review?.length !== 0 ? (
            my_review.map((p, idx) => {
              return <MyOneReview {...p} key={idx} />;
            })
          ) : (
            <Grid>
              <MyReviewImg src="illust/emptyMeal_3x.png"></MyReviewImg>
              <MyReviewText>아직 받은 리뷰가 없어요.</MyReviewText>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  } else {
    return <Spinner />;
  }
};

MyReview.defaultProps = {};

const MyReviewImg = styled.div`
  position: absolute;
  top: 24rem;
  margin: 0 8rem;
  background-image: url('${(props) => props.src}');
  width: 20rem;
  height: 11.7rem;
  background-size: cover;
  background-position: center;
`;

const MyReviewText = styled.div`
  position: absolute;
  top: 37rem;
  margin: 0 10rem;
  font-size: 1.6rem;
  line-height: 150%;
  text-align: center;
  font-weight: 400;
  color: #9a9896;
`;

const Profile = styled.div`
  position: absolute;
  margin: auto;
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  background-color: black;
  ${(props) =>
    props.user_profile
      ? `background-image: url(${props.user_profile});`
      : `background-image: url(http://115.85.182.57:8080/image/profileDefaultImg.jpg)`}
  background-size: cover;
  background-position: center;
`;

export default MyReview;
