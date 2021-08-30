// post 자세히 보기(post 상세, 채팅에 참여 중인 사용자 목록, 배달 식당 지도 표시)
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "../elements";
import { Header, DetailPost, PcSide } from "../components";
import { actionCreators as postActions } from "../redux/modules/post";

// 개발환경 console.log() 관리용
import logger from "../shared/Console";

const DetailPage = React.memo((props) => {
  const dispatch = useDispatch();

  // 전체 post list에서 선택한 post찾기
  const id = props.match.params.id;  
  const post_list = useSelector((state) => state.post.list);
  const post_idx = post_list.findIndex((p) => p.post_id === parseInt(id));
  const post = post_list[post_idx];
  
  React.useEffect(() => {
    dispatch(postActions.getOnePostAX(id));
  }, [])

  // 채팅방 참여 중인 사용자들
  const chat_user_list = useSelector((state) => state.post.chat_user_list);

  logger("디테일페이지 -", chat_user_list);
  
  // 내가 쓴 글인지 확인
  const user_info = useSelector((state) => state.user.user);
  const is_me = post?.user_id === user_info?.user_id ? true : false;

  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getPostAX("전체"));
    dispatch(postActions.getDetailPostUserListAX(parseInt(id)));
  }, []);

  return (
    <React.Fragment>
      <PcSide {...props}/>
      <Grid
        minHeight="100vh"
        margin="0 auto"
      >
        <Grid shape="container">
          <Header {...props} shape="상세페이지">
            {post?.title}
          </Header>
          <Grid height="4.4rem" />
        </Grid>

        {post && (
          <DetailPost {...post} chat_user_list={chat_user_list} is_me={is_me} />
        )}
      </Grid>
    </React.Fragment>
  );
});

export default DetailPage;
