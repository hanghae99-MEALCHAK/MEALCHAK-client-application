import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';

import { Grid, Button, Text, Image } from '../elements';
import theme from '../styles/theme';

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

  const { color } = theme;

  return (
    <React.Fragment>
      <Grid width="60rem" minHeight="50rem" margin="0 auto">
        <Grid margin="2rem 0rem">
          <Grid is_flex>
            <Grid width="auto">
              <Image shape="circle" size="7.15" margin="1rem" />
            </Grid>
            <Grid>
              <Text bold size="16px" color={color.bg100}>
                {username}
              </Text>
              <Text color={color.bg60}>{insert_dt}</Text>
            </Grid>
            <Grid text_align="right" margin="0px 2rem 0px 0px">
              <Text>2명 남았어요!</Text>
            </Grid>
          </Grid>
          <Grid margin="0 0 3rem 0">
            <Text bold size="16px" color={color.bg100}>
              {title}
            </Text>
            <TextBold>{contents}</TextBold>
          </Grid>
          <GreyLine />
          <Grid>
            <Text size="16px" color={color.bg80}>
              배달 받을 곳
            </Text>
            <Text size="13px" color={color.bg100}>
              {address}
            </Text>
          </Grid>
          <GreyLine />
          <Grid is_flex>
            <Grid>
              <Text size="16px" color={color.bg80}>
                배달 식당
              </Text>
              <Text size="13px" color={color.bg100}>
                어딘가
              </Text>
            </Grid>
            <Grid is_float="right">
              <Grid text_align="left" padding="0 0 0 16rem">
                <Text size="16px" color={color.bg80}>
                  주문 예정 시각
                </Text>
                <Text size="13px" color={color.bg100}>
                  {orderTime}
                </Text>
              </Grid>
            </Grid>
          </Grid>
          <Grid is_flex>
            <Button shape="large">채팅 시작하기</Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

DetailPost.defaultProps = {};

const GreyLine = styled.div`
  box-sizing: border-box;
  width: 90%;
  height: 1px;
  margin: 1rem auto;
  background-color: #f1f2f4;
`;

const TextBold = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 19px */

  letter-spacing: -0.01em;

  /* bg100 */

  color: ${(props) => props.theme.color.bg100};
`;
export default DetailPost;
