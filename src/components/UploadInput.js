import React from "react";
import styled from "styled-components";
import { Grid, Text, Input, Button } from "../elements";
import { useState } from "react";
import theme from "../styles/theme";
import logger from "../shared/Console";
import { useDispatch, useSelector } from "react-redux";

// 날짜
import moment from "moment";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

// select
import { HeadSelect, CTGSelect } from "./ReactSelect";

import "./style.css";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import PostAddress from "./PostAddress";
import { actionCreators as locateActions } from "../redux/modules/loc";

const UploadInput = React.memo((props) => {
  const { color, fontSize, radius, border } = theme;

  // select options
  const head_options = [
    { value: "2", label: "2명" },
    { value: "3", label: "3명" },
    { value: "4", label: "4명" },
  ];

  const food_options = [
    { value: "한식", label: "한식" },
    { value: "중식", label: "중식" },
    { value: "일식", label: "일식" },
    { value: "양식", label: "양식" },
    { value: "카페", label: "카페" },
    { value: "기타", label: "기타" },
  ];

  const dispatch = useDispatch();

  const today = moment().toDate();
  const modi_time = `${props.post_info.appointmentDate} ${props.post_info.appointmentTime}`;
  // const today = moment().format("YYYY-MM-DD");

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
          detail_place: props.post_info.detail_place,
          restaurant: props.post_info.restaurant,
          headCount: props.post_info.headCount,
          appointmentTime: moment(modi_time).toDate(),
          appointmentDate: moment(modi_time).toDate(),
          foodCategory: props.post_info.foodCategory,
          longitude: props.post_info.longitude,
          latitude: props.post_info.latitude,
        }
      : {
          place: "",
          detail_place: "",
          restaurant: "",
          headCount: "",
          appointmentTime: today,
          appointmentDate: today,
          foodCategory: "",
          longitude: longitude,
          latitude: latitude,
        }
  );

  const dropdownRef = React.useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => {
    window.scrollTo(0, 0);
    setIsActive(!isActive);
  };
  React.useEffect(() => {
    if (!post_address && props?.find_address) {
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
            <Grid flex justify_content="flex-start" align_items="center">
              <Text
                padding="2.4rem 0 0.8rem"
                color={color.bg80}
                bold="700"
                size={fontSize.base}
              >
                배달 받을 곳
              </Text>
            </Grid>
            <div className="container">
              <div className="menu-container">
                <nav
                  ref={dropdownRef}
                  className={`menu ${isActive ? "active" : "inactive"}`}
                  style={{
                    minWidth: "36rem",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    zIndex: "1",
                    top: 0,
                    // margin: "0 35rem 0 auto",
                    position: "fixed",
                  }}
                >
                  <PostAddress close={onClick} />
                </nav>
              </div>
            </div>
            <Grid
              height="5rem"
              radius="1.2rem"
              border={border.bg40}
              padding="1.4rem 1.6rem"
              bg={color.bg20}
              margin="0 0 0.8rem"
            >
              <Text color={color.bg80} size={fontSize.base}>
                {post_address
                  ? post_address
                  : props?.find_address
                  ? props.find_address
                  : "주소를 찾으면 자동으로 입력돼요."}
              </Text>
            </Grid>
            <FocusWithin>
              <Input
                border={border.bg40}
                padding="1.5rem 1.3rem"
                size={fontSize.base}
                color={color.bg60}
                placeholder="상세 주소 입력란"
                value={post_info.detail_place}
                _onChange={(e) => {
                  setPostInfo({ ...post_info, detail_place: e.target.value });
                  props.onChange({ detail_place: e.target.value });
                }}
              ></Input>
              <Button
                height="5rem"
                border={border.bg40}
                padding="0.3rem 0 0.3rem 0"
                margin="0.8rem 0 0"
                radius={radius.button}
                size="1.3rem"
                bg={color.bg0}
                _onClick={onClick}
                className="menu-trigger"
                cursor="t"
              >
                <Text color={color.brand100} size={fontSize.base} bold2="700">
                  주소 찾기
                </Text>
              </Button>
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
                배달 예정 식당
              </Text>
              <Input
                border={border.bg40}
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

          {/* <FocusWithinSelect> */}
          <Text
            padding="2.4rem 0 0.8rem"
            color="#888E95"
            bold="700"
            size={fontSize.base}
          >
            모집 인원 수
          </Text>
          <Grid border={border.bg40} radius="1.2rem" height="auto">
            <HeadSelect
              options={head_options}
              value={post_info.headCount}
              setPostInfo={setPostInfo}
              post_info={post_info}
              onChange={props.onChange}
              headCount={post_info.headCount}
            />
            {/* <Select
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
              </Select> */}
          </Grid>
          {/* </FocusWithinSelect> */}
          <Grid text_align="left">
            <Text color="#F35959" size={fontSize.small} line_height="150%" padding="0.8rem 1rem 0 0rem">
              5인 이상 집합금지로 인원에 제한이 있습니다.
            </Text>
          </Grid>

          <Grid width="31.8rem" margin="0">
            <FocusWithin>
              <Text
                padding="2.4rem 0 0.8rem"
                color="#888E95"
                bold="700"
                size={fontSize.base}
              >
                배달 주문 예정 시간
              </Text>

              <Grid
                width="31.8rem"
                is_flex4="t"
                flex_direction="row"
                justify_content="space-between"
              >
                <SDatePicker
                  theme={theme}
                  minDate={new Date()}
                  locale={ko}
                  dateFormat="yyyy년 MM월 dd일"
                  selected={post_info.appointmentDate}
                  onChange={(date) => {
                    setPostInfo({
                      ...post_info,
                      appointmentDate: date,
                    });
                    logger("현재시간", moment(date).format("YYYY-MM-DD"));

                    props.onChange({
                      appointmentDate: moment(date).format("YYYY-MM-DD"),
                    });
                  }}
                  withPortal={true}
                  popperModifiers={{
                    preventOverflow: {
                      enable: true,
                    },
                  }}
                  popperPlacement="auto"
                />

                <TDatePicker
                  timeCaption="Time"
                  dateFormat="p"
                  timeIntervals={15}
                  showTimeSelectOnly
                  showTimeSelect
                  theme={theme}
                  locale={ko}
                  timeFormat="HH:mm"
                  selected={post_info.appointmentTime}
                  onChange={(date) => {
                    setPostInfo({
                      ...post_info,
                      appointmentTime: date,
                    });
                    logger("현재시간", moment(date).format("HH:mm"));
                    props.onChange({
                      appointmentTime: moment(date).format("HH:mm"),
                    });
                  }}
                  withPortal={true}
                  popperModifiers={{
                    preventOverflow: {
                      enable: true,
                    },
                  }}
                  popperPlacement="auto"
                />
              </Grid>
            </FocusWithin>
          </Grid>

          <Grid margin="0 auto 1rem">
            <Text
              padding="2.4rem 0 0.8rem"
              color="#888E95"
              bold="700"
              size={fontSize.base}
            >
              음식 카테고리
            </Text>
            <Grid border={border.bg40} radius="1.2rem" height="auto">
              <CTGSelect
                options={food_options}
                value={post_info.foodCategory}
                setPostInfo={setPostInfo}
                post_info={post_info}
                onChange={props.onChange}
                foodCategory={post_info.foodCategory}
              />
              {/* <Select
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
                </Select> */}
            </Grid>
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

const SDatePicker = styled(DatePicker)`
  width: 18rem;
  height: 5rem;
  padding: 1.4rem 1.6rem;
  font-size: 1.4rem;
  text-align: left;
  border: ${(props) => props.theme.border.bg40};
  border-radius: ${(props) => props.theme.radius.button};
  cursor: pointer;

  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("https://image.flaticon.com/icons/png/512/32/32195.png")
    no-repeat 92% 50% #fff;
  background-size: 1rem;
`;

const TDatePicker = styled(DatePicker)`
  width: 12rem;
  height: 5rem;
  padding: 1.4rem 1.6rem;
  font-size: 1.4rem;
  text-align: left;
  border: ${(props) => props.theme.border.bg40};
  border-radius: ${(props) => props.theme.radius.button};
  cursor: pointer;

  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("https://image.flaticon.com/icons/png/512/992/992700.png")
    no-repeat 88% 50% #fff;
  background-size: 1.5rem;
`;

const STimePicker = styled(TimePicker)`
  width: fit-content;
  height: 5rem;
  padding: 1.4rem 1.6rem;
  font-size: 1.4rem;
  text-align: left;
  border: ${(props) => props.theme.border.bg40};
  border-radius: ${(props) => props.theme.radius.button};
  cursor: pointer;

  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;

  & div {
    border: none;
    display: flex;
  }

  & .react-time-picker__wrapper {
    align-items: center;
  }

  & .react-time-picker__inputGroup {
    height: 2rem;
  }

  & .react-time-picker__clock {
    background-color: none;
  }

  & .react-time-picker__button {
    height: fit-content;
    padding: 0 0 0 1rem;
  }
`;
export default UploadInput;
