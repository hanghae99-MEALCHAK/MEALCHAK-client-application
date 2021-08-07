// 마이페이지 - 내가 쓴 글
import React from "react";
import styled from "styled-components";
import logger from "../shared/Console";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import Spinner from "../shared/Spinner";
import { history } from "../redux/configureStore";
import { Post } from "../components";

// style
import { Button, Grid, Input, Text } from "../elements";
import { Header } from "../components";
import theme from "../styles/theme";

const MyPost = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const my_post = useSelector((state) => state.user?.myPost);
  const user_info = useSelector((state) => state.user.user);

  const { color, border, fontSize } = theme;

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(userActions.loginCheck());
    if (my_post.length === 0) {
      dispatch(userActions.getMyPostAX());
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
          <Header {...props} shape="내가쓴글" />
          <Grid height="1.6rem" />
          {my_post?.length > 0 ? (
            my_post.map((p, idx) => {
              return <Post {...p} is_profile key={idx} />;
            })
          ) : (
            <Grid width="36rem" margin="18rem auto 0 auto">
              <MyReviewImg src="illust/emptyMeal_3x.png"></MyReviewImg>
              <MyReviewText>아직 내가 쓴 글이 없어요.</MyReviewText>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  } else {
    return <Spinner />;
  }
};

MyPost.defaultProps = {};

const MyReviewImg = styled.div`
  margin: auto;
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

export default MyPost;
