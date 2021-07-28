import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DetailPost from '../components/DetailPost';
import { actionCreators as postActions } from '../redux/modules/post';

// 개발환경 console.log() 관리용
import logger from '../shared/Console';

const DetailPage = (props) => {
  const dispatch = useDispatch();

  const id = props.match.params.id;
  logger('PostDetial - 11:', id);

  const post_list = useSelector((state) => state.post.list);

  const post_idx = post_list.findIndex((p) => p.post_id === parseInt(id));
  const post = post_list[post_idx];

  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostDB(id));
  });

  return <React.Fragment>{post && <DetailPost {...post} />}</React.Fragment>;
};

export default DetailPage;
