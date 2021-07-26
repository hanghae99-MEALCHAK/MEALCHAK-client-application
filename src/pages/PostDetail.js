import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GwPost from '../components/GwPost';

const PostDetail = (props) => {
  const id = props.match.params.id;
  console.log(id);
  console.log(props);

  const post_list = useSelector((state) => state.post.list);

  const post_idx = post_list.findIndex((p) => p.postId === id);
  const post = post_list[post_idx];

  // React.useEffect(() => {});

  return (
    <React.Fragment>
      <GwPost {...post} />
    </React.Fragment>
  );
};

export default PostDetail;
