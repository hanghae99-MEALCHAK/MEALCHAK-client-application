import React from 'react';
import styled from 'styled-components';
import { Grid, Text, Input, Button } from '../elements';
import { useState } from 'react';
import { history } from '../redux/configureStore';
import theme from '../styles/theme';
import logger from '../shared/Console';
import { useSelector } from 'react-redux';

const UploadInput = (props) => {
  const { color, fontSize } = theme;
  const post_address = useSelector((state) => state.loc.post_address);

  React.useEffect(() => {
    logger('uploadinput 페이지', props);
  }, []);

  const [post_info, setPostInfo] = useState(
    props.post_info !== {}
      ? {
          place: props.post_info.place,
          restaurant: props.post_info.restaurant,
          headCount: props.post_info.headCount,
          appointmentTime: props.post_info.appointmentTime,
          foodCategory: props.post_info.foodCategory,
        }
      : {
          place: '',
          restaurant: '',
          headCount: '',
          appointmentTime: '',
          foodCategory: '',
        }
  );

  return (
    <React.Fragment>
      <Grid padding="0 2rem">
        <Container>
          <Grid>
            <FocusWithin>
              <Text
                padding="2.4rem 0 0.8rem"
                color={color.bg80}
                bold="700"
                size={fontSize.base}
              >
                배달 받을 곳
              </Text>
              <Grid
                width="32rem"
                height="5rem"
                radius="1.2rem"
                border="1px solid #C7C8CE"
                padding="1.5rem 1.3rem"
                // size={fontSize.base}
                bg={color.bg0}
                cursor="t"
                flex
                align_items="center"
                // 주소 선택하면 goBack() 후 input 창에 글 넣어주기 addPost에 추가해주고
                _onClick={() => {
                  history.push('/postAddress');
                }}
              >
                <Text size={fontSize.base} color={color.bg60} text_align="left">
                  {post_address ? post_address : '모일 장소를 지정해주세요.'}
                </Text>
              </Grid>
              {/* <Input
                border="1px solid #C7C8CE"
                padding="1.5rem 1.3rem"
                size={fontSize.base}
                color={color.bg60}
                placeholder="모일 장소를 입력해주세요."
                value={post_info.place}
                _onChange={(e) => {
                  setPostInfo({ ...post_info, place: e.target.value });
                  props.onChange({ place: e.target.value });
                }}
              ></Input> */}
            </FocusWithin>
          </Grid>
          <Grid>
            <FocusWithin>
              <Text
                padding="2.4rem 0 0.8rem"
                color="#888E95"
                bold="700"
                size={fontSize.base}
              >
                배달 예정 음식점
              </Text>
              <Input
                border="1px solid #C7C8CE"
                padding="1.5rem 1.3rem"
                size={fontSize.base}
                color={color.bg60}
                placeholder="배달 예정인 음식점을 입력해주세요."
                value={post_info.restaurant}
                _onChange={(e) => {
                  setPostInfo({ ...post_info, restaurant: e.target.value });
                  props.onChange({ restaurant: e.target.value });
                }}
              ></Input>
            </FocusWithin>
          </Grid>

          <FocusWithinSelect>
            <Text
              padding="2.4rem 0 0.8rem"
              color="#888E95"
              bold="700"
              size={fontSize.base}
            >
              모집 인원 수
            </Text>
            <Grid
              border="1px solid #C7C8CE"
              padding="0 1.3rem"
              radius="1.2rem"
              height="auto"
            >
              <Select
                value={`${post_info.headCount}`}
                onChange={(e) => {
                  setPostInfo({
                    ...post_info,
                    headCount: e.target.value,
                  });
                  props.onChange({ headCount: e.target.value });
                }}
              >
                <option value="none" hidden defaultValue>
                  모집인원을 선택해주세요.
                </option>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
              </Select>
            </Grid>
          </FocusWithinSelect>
          <Text color="red" size={fontSize.tiny} padding="0.5rem 1rem 0">
            5인 이상 집합금지로 인원에 제한이 있습니다.
          </Text>

          <Grid>
            <FocusWithin>
              <Text
                padding="2.4rem 0 0.8rem"
                color="#888E95"
                bold="700"
                size={fontSize.base}
              >
                모집 예정 시간
              </Text>
              <Input
                type="time"
                border="1px solid #C7C8CE"
                padding="1.5rem 1.3rem"
                size={fontSize.base}
                color={color.bg60}
                value={post_info.appointmentTime}
                _onChange={(e) => {
                  setPostInfo({
                    ...post_info,
                    appointmentTime: e.target.value,
                  });
                  props.onChange({ appointmentTime: e.target.value });
                }}
              ></Input>
            </FocusWithin>
          </Grid>

          <Grid margin="0 auto 1rem">
            <FocusWithinSelect>
              <Text
                padding="2.4rem 0 0.8rem"
                color="#888E95"
                bold="700"
                size={fontSize.base}
              >
                음식 카테고리
              </Text>
              <Grid
                border="1px solid #C7C8CE"
                padding="0 1.3rem"
                radius="1.2rem"
                height="auto"
              >
                <Select
                  value={post_info.foodCategory}
                  onChange={(e) => {
                    setPostInfo({
                      ...post_info,
                      foodCategory: e.target.value,
                    });
                    props.onChange({ foodCategory: e.target.value });
                  }}
                >
                  <option value="none" defaultValue hidden>
                    음식 카테고리를 선택해주세요.
                  </option>
                  <option value="한식">한식</option>
                  <option value="중식">중식</option>
                  <option value="일식">일식</option>
                  <option value="양식">양식</option>
                  <option value="카페">카페</option>
                  <option value="기타">기타</option>
                </Select>
              </Grid>
            </FocusWithinSelect>
          </Grid>
        </Container>
      </Grid>
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  width: 100%;
  height: 4.7rem;
  border: none;
  padding: 0;
  font-size: 1.4rem;
  &:focus {
    outline: none;
  }
`;

const FocusWithin = styled.div`
  &:focus-within p {
    color: #ff9425;
  }
  &:focus-within input {
    border: 1px solid #ff9425;
    outline: none;
  }
`;

const FocusWithinSelect = styled.div`
  &:focus-within p {
    color: #ff9425;
  }
  &:focus-within div {
    border: 1px solid #ff9425;
    outline: none;
  }
`;

export default UploadInput;
