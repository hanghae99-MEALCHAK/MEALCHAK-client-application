import React from 'react';
import styled from 'styled-components';

import { Grid, Button, Text } from '../elements';
import { Header } from '../components';
import theme from '../styles/theme';

import Select from '../components/ReactSelect';

const { color, border, fontSize } = theme;

// select options
const options = [
  { value: 'chocolate', label: '최고예요!' },
  { value: 'strawberry', label: '좋아요~' },
  { value: 'vanilla', label: '별로예요:(' },
];

const ReviewWrite = (props) => {
  const [manner, setManner] = React.useState({});
  // const user_info = useSelector((state) => state.user.user);
  console.log(typeof manner.label);
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

        <Grid margin="2rem auto 1rem">
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
            color={manner.label ? color.bg100 : color.bg80}
            bold2="500"
            line_height="150%"
          >
            해당 사용자와의 밀착은 어땠나요?
          </Text>
          <Grid margin="0 0 2rem 0">
            <Select
              value={manner}
              options={options}
              onChange={setManner}
            ></Select>
          </Grid>
          {/* <Grid
            border="1px solid #C7C8CE"
            margin="0 0 2rem 0"
            padding="0 1rem"
            radius="1.2rem"
            height="auto"
          >
            <SelectTag
              value={manner}
              onChange={(e) => {
                // console.log(e.target.value);
                setManner(e.target.value);
              }}
              onMouseOver={(e) => {
                e.target[1].style.color = 'orange';
                console.log('div에서 mouseover', e);
              }}
            >
              <option value="none" defaultValue hidden>
                리뷰를 선택해주세요.
              </option>
              <option
                value="최고"
                onClick={(e) => {
                  console.log('onclick', e);
                }}
                onMouseOver={() => {
                  console.log('mouseover');
                  // optionTagBgChange(e);
                }}
              >
                최고예요!
              </option>
              <option value="좋아">좋아요~</option>
              <option value="별로">별로예요:(</option>
            </SelectTag>
          </Grid> */}
        </Grid>
        <GreyLine />

        <Grid margin="1.5rem 0" padding="0 2rem">
          <Text
            width="auto"
            size={fontSize.small}
            color={manner.label ? color.bg100 : color.bg80}
            bold2="400"
            line_height="150%"
            text_align="left"
          >
            {manner.label
              ? '너무 즐거웠어요! 다음에 또 같이 식사해요~'
              : '해당 사용자와의 밀착이 만족스러우셨다면 따뜻한 리뷰를 전해보세요!'}
          </Text>
        </Grid>
      </Grid>
      <Grid
        maxWidth="35.5rem"
        width="100%"
        height="auto"
        margin="0 auto"
        padding="1.5rem 2rem"
        is_fixed="t"
      >
        <Button
          shape="large"
          color={manner.label ? color.brand100 : color.bg40}
          size={fontSize.small}
        >
          <Text
            bold
            size="1.6rem"
            color={manner.label ? color.bg0 : color.bg60}
          >
            보내기
          </Text>
        </Button>
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
  &:hover {
    background-color: red;
  }
`;

const SelectTag = styled.select`
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
  /* &:focus-within option {
    color: ${(props) => props.theme.color.brand100};
    background-color: ${(props) => props.theme.color.brand20};
    &:focus {
      color: red;
    }
    &:hover {
      color: pink;
    }
  } */
`;

const Option = styled.option`
  color: pink;
  &:hover {
    background: #ff9500 -webkit-linear-gradient(bottom, #ff9500 0%, #ff9500 100%);
    color: red;
    background-color: ${(props) => props.theme.color.brand20};
  }
  /* &:focus-within option {
    color: ${(props) => props.theme.color.brand100};
    background-color: ${(props) => props.theme.color.brand20};
  } */
`;

export default ReviewWrite;
