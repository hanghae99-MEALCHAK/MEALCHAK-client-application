import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

import { Grid, Button, Text, Image } from '../elements';

const DetailPost = (props) => {
  const {
    postId,
    title,
    headCount,
    insert_dt,
    address,
    orderTime,
    contents,
    createdAt,
    username,
  } = props;

  return (
    <React.Fragment>
      <Grid is_float="left" margin="2rem 0">
        <Grid is_flex>
          <Image shape="circle" size="4" margin="1rem 1rem 1rem 0" />
          <Grid>
            <Text>{username}</Text>
            <Text>{insert_dt}</Text>
          </Grid>
        </Grid>
        <Grid margin="0 0 3rem 0">
          <Text>{title}</Text>
          <Text>{contents}</Text>
        </Grid>
        <Grid>
          <Text>배달 받을 곳</Text>
          <Text>{address}</Text>
        </Grid>
        <Grid is_flex>
          <Grid>
            <Text>배달 식당</Text>
            <Text>어딘가</Text>
          </Grid>
          <Grid is_float="right">
            <Grid text_align="left" padding="0 0 0 16rem">
              <Text>주문 예정 시각</Text>
              <Text>{orderTime}</Text>
            </Grid>
          </Grid>
        </Grid>
        <Grid is_flex>
          <Button>채팅 시작하기</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

// GwPost.defaultProps = {
//   postId,
//   title,
//   headCount,
//   category,
//   address,
//   orderTime,
//   menu,
//   contents,
// };

const GreyLine = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 1px;
  margin: 8px 0px;
  background-color: #ced0d4;
`;

export default DetailPost;
