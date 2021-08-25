// 마이페이지 - 내가 받은 리뷰
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import Spinner from "../shared/Spinner";
import { MyOneReview, PcSide } from "../components";

// style
import { Grid } from "../elements";
import { Header } from "../components";
import logger from "../shared/Console";
import theme from "../styles/theme";

// 이미지
import { png } from "../styles/img/index";
import { webp } from "../styles/img/webp/index";
import { isWebpSupported } from "react-image-webp/dist/utils";

const MyReview = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user?.is_login);
  const my_review = useSelector((state) => state.user?.myReview);

  React.useEffect(() => {
    if (!is_login) {
      dispatch(userActions.loginCheck());
    }
    if (my_review.length === 0) {
      dispatch(userActions.getMyReviewAX());
    }
  }, []);

  if (is_login) {
    return (
      <>
        <PcSide {...props} />
        <Grid
          // maxWidth="36rem"
          minWidth="36rem"
          minHeight="100vh"
          // border={border.line1}
          margin="0 auto"
        >
          <Grid shape="container" minWidth="36rem">
            <Header {...props} shape="내가받은리뷰" />
            <Grid height="4.4rem" />
            <Grid height="1.6rem" />
            {my_review?.length !== 0 ? (
              my_review.map((p, idx) => {
                return <MyOneReview is_me {...p} key={idx} />;
              })
            ) : (
              <Grid>
                <MyReviewImg
                  src={
                    isWebpSupported() ? webp.emptyMeal_3xWebp : png.emptyMeal_3x
                  }
                ></MyReviewImg>
                <MyReviewText>아직 받은 리뷰가 없어요.</MyReviewText>
              </Grid>
            )}
          </Grid>
        </Grid>
      </>
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
  background-image: url("${(props) => props.src}");
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
