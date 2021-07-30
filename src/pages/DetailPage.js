import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid } from '../elements';
import { Header, DetailPost, Footer } from '../components';
import { actionCreators as postActions } from '../redux/modules/post';

import theme from '../styles/theme';

// 개발환경 console.log() 관리용
import logger from '../shared/Console';

const DetailPage = (props) => {
  const { border } = theme;

  const dispatch = useDispatch();
  const id = props.match.params.id;
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const post_idx = post_list.findIndex((p) => p.post_id === parseInt(id));
  const post = post_list[post_idx];
  logger('디테일페이지 -', post);
  const is_me = post?.user_id === user_info?.user_id ? true : false;

  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getPostAX());
  }, []);

  return (
    <React.Fragment>
      <Grid
        minHeight="100vh"
        maxWidth="36rem"
        border={border.line1}
        margin="0 auto"
      >
        <Grid shape="container">
          <Header {...props} shape="상세페이지">
            {post?.title}
          </Header>
          <Footer {...props} />
        </Grid>
        {post && <DetailPost {...post} is_me={is_me} />}
      </Grid>
    </React.Fragment>
  );
};

export default DetailPage;
