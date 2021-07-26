import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

import { Grid, Button, Text, Image } from '../elements';

const GwPost = (props) => {
  const { postId, title, headCount, address, orderTime, contents, createdAt } =
    props;

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" />
            <Text bold>유저이름</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{createdAt}</Text>
          </Grid>
        </Grid>
        <Grid padding="16px">
          <Text>{title}</Text>
          <Text>{contents}</Text>
        </Grid>
        <GreyLine></GreyLine>
        <Grid>
          <Text>배달 받을 곳</Text>
          <Text>{address}</Text>
        </Grid>
        <GreyLine></GreyLine>
        <Grid padding="16px">
          <Text margin="0px" bold>
            <Text>배달식당</Text>
            <Text>신전떡볶이</Text>
            <Text>치즈떡볶이</Text>
          </Text>
        </Grid>
        <Button
          _onClick={() => {
            history.push(`/post/${postId}`);
          }}
        >
          자세히보기
        </Button>
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

export default GwPost;
