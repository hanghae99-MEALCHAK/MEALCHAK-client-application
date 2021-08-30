// 마이페이지 - 내가 쓴 글
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { DetailPost, PcSide } from "../components";
import Spinner from "../shared/Spinner";

// style
import { Grid } from "../elements";
import { Header } from "../components";
import logger from "../shared/Console";

// 이미지
import { png } from "../styles/img/index";
import { webp } from "../styles/img/webp/index";
import { isWebpSupported } from "react-image-webp/dist/utils";

const MyPost = (props) => {
  const dispatch = useDispatch();

  const is_loaded = useSelector((state) => state.user?.is_loaded);
  const is_login = useSelector((state) => state.user.is_login);
  const my_post = useSelector((state) => state.user?.myPost);

  React.useEffect(() => {
    document.querySelector("body").scrollTo(0, 0);
    dispatch(userActions.loaded(false));
    if (my_post.length !== 0) {
      dispatch(userActions.loaded(true));
    }
    dispatch(userActions.loginCheck());
    dispatch(userActions.getMyPostAX());
  }, []);

  if (is_login) {
    return (
      <>
        {!is_loaded && !my_post ? <Spinner /> : ""}
        <PcSide {...props} />
        <Grid minHeight="100vh" margin="0 auto">
          <Grid shape="container" minWidth="36rem">
            <Header {...props} shape="내가쓴글" />
            <Grid height="4.4rem" />
            {my_post?.length !== 0 ? (
              my_post?.map((p, idx) => {
                return <DetailPost {...p} is_profile key={idx} />;
              })
            ) : (
              <Grid width="36rem" margin="18rem auto 0 auto">
                <MyReviewImg
                  src={
                    isWebpSupported() ? webp.emptyMeal_3xWebp : png.emptyMeal_3x
                  }
                ></MyReviewImg>
                <MyReviewText>아직 내가 쓴 글이 없어요.</MyReviewText>
              </Grid>
            )}
            <Grid height="1.6rem" />
          </Grid>
        </Grid>
      </>
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
