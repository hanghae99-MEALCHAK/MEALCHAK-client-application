import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "../elements";
import { Header, DetailPost } from "../components";
import { actionCreators as postActions } from "../redux/modules/post";

// 개발환경 console.log() 관리용
import logger from "../shared/Console";

const DetailPage = (props) => {
  const dispatch = useDispatch();

  const id = props.match.params.id;

  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);

  const post_idx = post_list.findIndex((p) => p.post_id === parseInt(id));
  const post = post_list[post_idx];

  const is_me = post?.user_id === user_info?.user_id ? true : false;

  React.useEffect(() => {
    if (post) {
      return;
    } 
    dispatch(postActions.getPostAX());
    logger("is_me", is_me);
  },[]);

  return (
    <React.Fragment>
      <Grid
        // height="100vh"
        maxWidth="36rem"
        border="1px solid #CFCFCF"
        margin="0 auto"
      >
        <Grid shape="container">
          <Header {...props} shape="상세페이지">
            {post?.title}
          </Header>
        </Grid>

        {post && <DetailPost {...post} is_me={is_me} />}
      </Grid>
    </React.Fragment>
  );
};

export default DetailPage;
