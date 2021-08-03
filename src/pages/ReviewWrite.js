import React from 'react';
import styled from 'styled-components';

import { Grid, Button, Text } from '../elements';
import { Header } from '../components';
import theme from '../styles/theme';

const ReviewWrite = (props) => {
  const { color, border, radius, fontSize } = theme;

  // const user_info = useSelector((state) => state.user.user);

  return (
    <Grid
      maxWidth="36rem"
      minHeight="100vh"
      border={border.line1}
      margin="0 auto"
    >
      <Grid shape="container">
        <Header {...props} shape="검색">
          리뷰 남기기
        </Header>

        <Grid margin="2.5rem auto 1rem">
          <Profile></Profile>
        </Grid>
        <Grid margin="0 auto 2rem">
          <Text
            width="auto"
            size={fontSize.large}
            color={color.bg100}
            bold2="500"
            line_height="150%"
            text_align="center"
          >
            유저이름
          </Text>
        </Grid>
        <GreyLine />
        <Grid padding="0 2rem">
          <Text
            width="auto"
            margin="2rem 0 1rem 0"
            size={fontSize.small}
            color={color.bg80}
            bold2="500"
            line_height="150%"
          >
            해당 사용자와의 밀착은 어땠나요?
          </Text>
          <Grid
            border="1px solid #C7C8CE"
            padding="0 1rem"
            radius="1.2rem"
            height="auto"
          >
            <Select>
              <option value="최고">최고예요!</option>
              <option value="좋아">좋아요~</option>
              <option value="별로">별로예요:(</option>
            </Select>
          </Grid>
        </Grid>

        <GreyLine />
        <Grid width="85%" margin="0 auto">
          <Button
            shape="large"
            color={color.bg40}
            size={fontSize.small}
            // width="10rem"
          >
            <Text bold size="1.6rem" color={color.bg60}>
              채팅 시작하기
            </Text>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

ReviewWrite.defaultProps = {};

const Profile = styled.div`
  margin: auto;
  width: 5rem;
  height: 5rem;
  border-radius: 2.5rem;
  background-image: url('http://115.85.182.57:8080/image/profileDefaultImg.jpg');
  background-size: cover;
  background-position: center;
`;

const GreyLine = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 1px;
  margin: 1rem auto;
  background-color: #f1f2f4;
`;

const Select = styled.select`
  width: 100%;
  height: 4.7rem;
  border: none;
  padding: 0;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: 400;
  color: ${(props) => props.theme.color.bg80};
  &:focus {
    outline: none;
  }
`;

export default ReviewWrite;
