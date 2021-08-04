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
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);

  const { color, border, fontSize } = theme;

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(userActions.loginCheck());
    // if (post_list.length === 0) {
    //   dispatch(postActions.getPostAX());
    // }
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
          {post_list.length > 0 ? (
            post_list.map((p, idx) => {
              if (p.user_id === user_info.user_id) {
                return <Post {...p} is_profile={true} key={p.post_id} />;
              }
            })
          ) : (
            <Grid width="36rem" margin="18rem auto 0 auto">
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
