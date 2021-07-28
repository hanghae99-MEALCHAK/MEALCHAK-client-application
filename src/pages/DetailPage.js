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
  logger("PostDetial - 11:", id);
  console.log(props);

  const post_list = useSelector((state) => state.post.list);

  console.log(post_list);
  const post_idx = post_list.findIndex((p) => p.post_id === parseInt(id));
  // console.log(typeof props?.post_id);
  // console.log(typeof id);
  const post = post_list[post_idx];
  console.log(post);

  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostDB(id));
  });

  return (
    <React.Fragment>
      <Grid
        // height="100vh"
        maxWidth="36rem"
        border="1px solid #CFCFCF"
        margin="0 auto"
      >
        <Grid shape="container">
          <Header {...props} shape="상세페이지">{post.title}</Header>
        </Grid>
      </Grid>
      {post && <DetailPost {...post} />}
    </React.Fragment>
  );
};

export default DetailPage;
