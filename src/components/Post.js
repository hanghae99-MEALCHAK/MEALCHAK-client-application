import React from 'react';
import { Grid, Image, Text, Button } from '../elements';
import { history } from '../redux/configureStore';
import logger from '../shared/Console';

const Post = (props) => {
  console.log('Post:7 : ', props);
  return (
    <React.Fragment>
      <Grid is_float="left" margin="2rem 0">
        <Grid is_flex>
          <Image shape="circle" size="4" margin="1rem 1rem 1rem 0" />
          <Grid>
            <Text>{props.username}</Text>
            <Text>{props.insert_dt}</Text>
          </Grid>
        </Grid>
        <Grid margin="0 0 3rem 0">
          <Text>{props.title}</Text>
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Text>배달 받을 곳</Text>
          <Text>{props.address}</Text>
        </Grid>
        <Grid is_flex>
          <Grid>
            <Text>배달 식당</Text>
            <Text>어딘가</Text>
          </Grid>
          <Grid is_float="right">
            <Grid text_align="left" padding="0 0 0 16rem">
              <Text>주문 예정 시각</Text>
              <Text>{props.orderTime}</Text>
            </Grid>
          </Grid>
        </Grid>
        <Grid is_flex>
          <Button
            shape="smallLight"
            _onClick={() => {
              history.push(`/post/${props.post_id}`);
            }}
          >
            자세히 보기
          </Button>
          <Button shape="smallDark">채팅 시작하기</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {};

export default Post;
