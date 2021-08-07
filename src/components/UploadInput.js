import React from "react";
import styled from "styled-components";
import { Grid, Text, Input } from "../elements";
import { useState } from "react";
import theme from "../styles/theme";
import logger from "../shared/Console";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "./DropDown";
import moment from "moment";

import { actionCreators as locateActions } from "../redux/modules/loc";

const UploadInput = React.memo((props) => {
  const { color, fontSize } = theme;

  const dispatch = useDispatch();

  const today = moment().format("YYYY-MM-DD");
  const now_time = moment().format("HH:mm");
  const post_address = useSelector((state) => state.loc.post_address?.address);
  const coords = useSelector((state) => state.loc.post_address);
  const longitude = coords.longitude;
  const latitude = coords.latitude;

  const [post_info, setPostInfo] = useState(
    // post_info 자체는 항상 내려오는데 값이 수정전에는 undefined라서 그중에 하나 정해서 있는지 확인해본 코드
    props.post_info.place
      ? {
          place: props.post_info.place,
          restaurant: props.post_info.restaurant,
          headCount: props.post_info.headCount,
          appointmentTime: props.post_info.appointmentTime,
          appointmentDate: props.post_info.appointmentDate,
          foodCategory: props.post_info.foodCategory,
          longitude: props.post_info.longitude,
          latitude: props.post_info.latitude,
        }
      : {
          place: "",
          restaurant: "",
          headCount: "",
          appointmentTime: now_time,
          appointmentDate: today,
          foodCategory: "",
          longitude: longitude,
          latitude: latitude,
        }
  );

  React.useEffect(() => {
    if (!post_address && props.find_address) {
      dispatch(locateActions.getMyPostCoordAX(props.find_address));
      setPostInfo({ ...post_info, place: post_address });
      props?.onChange({ place: post_address });
    }
    logger("uploadinput 페이지", props);
    logger("uploadinput 페이지2", post_info);
  }, []);

  React.useEffect(() => {
    setPostInfo({ ...post_info, place: post_address });
    props?.onChange({ place: post_address });
  }, [post_address ? post_address : null]);

  return (
    <React.Fragment>
      <Grid padding="0 2rem">
        <Container>
          <Grid>
            <FocusWithin>
              <Grid flex justify_content="flex-start" align_items="center">
                <Text
                  padding="2.4rem 0 0.8rem"
                  color={color.bg80}
                  bold="700"
                  size={fontSize.base}
                >
                  배달 받을 곳
                </Text>
                <DropDown />
              </Grid>
              <Grid
                radius="1.2rem"
                border="1px solid #C7C8CE"
                padding="1.5rem 1.3rem"
              >
                <Text color={color.bg60} size={fontSize.base}>
                  {post_address
                    ? post_address
                    : props?.find_address
                    ? props.find_address
                    : "배달 받을 곳을 선택해주세요"}
                </Text>
              </Grid>
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

          <Grid is_flex4="t" justify_content="space-between">
            <Grid width="56%" margin="0">
              <FocusWithin>
                <Text
                  padding="2.4rem 0 0.8rem"
                  color="#888E95"
                  bold="700"
                  size={fontSize.base}
                >
                  모집 예정 날짜
                </Text>
                <Input
                  type="date"
                  border="1px solid #C7C8CE"
                  padding="1.5rem 1rem"
                  size="1.4rem"
                  color={color.bg60}
                  value={post_info.appointmentDate}
                  _onChange={(e) => {
                    setPostInfo({
                      ...post_info,
                      appointmentDate: e.target.value,
                    });
                    logger("약속 날짜", e.target.value);
                    logger("오늘", today);

                    props.onChange({ appointmentDate: e.target.value });
                  }}
                ></Input>
              </FocusWithin>
            </Grid>
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
                size="1.4rem"
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
});

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
