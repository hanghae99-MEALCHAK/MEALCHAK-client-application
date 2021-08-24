import React from "react";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

// style
import { Grid, Text, Button } from "../elements";
import { customAlert } from "./Sweet";
import theme from "../styles/theme";
import logger from "../shared/Console";

import moment from "moment";

const Post = React.memo((props) => {
  logger("포스트 리렌더링이 되었습니다.");
  const { color, fontSize } = theme;

  // 글 생성 시간
  // 연, 월
  const ym = props?.insert_dt.split("-");
  // 일
  const day = ym[2].split(" ");
  // 시, 분
  const hm = day[1].split(":");

  // 예상 만남 시간
  const ordDate = props?.orderDate.split("-");
  const ordTime = props?.orderTime.split(":");

  // 오늘 표시
  const today = moment().format("YYYY-MM-DD");
  const now = moment().format("HH:mm");
  const tomorrow = moment().add(1, "d").format("YYYY-MM-DD");
  const is_today = today === props.orderDate ? true : false;
  const is_tomorrow = tomorrow === props.orderDate ? true : false;

  const is_login = useSelector((state) => state.user.is_login);
  const user_info = useSelector((state) => state.user.user);
  const [disabled, setDisabled] = React.useState(false);

  // 마감여부
  const now_time_int = parseInt(
    today.split("-").join("") + now.split(":").join("")
  );
  const post_time_int = parseInt(ordDate.join("") + ordTime.join(""));
  const is_over = now_time_int > post_time_int ? true : false;

  const dispatch = useDispatch();
  // 내 위치에서부터 얼마나 떨어져있는지 보여주는 변수(소수점이므로 1000을 곱해 m로 나타냄)
  const distance = props.distance * 1000;
  // logger("Post.js props: ", props);

  const requestJoin = () => {
    if (is_login) {
      dispatch(
        postActions.requestChatPostAX(
          user_info?.user_id,
          props.user_id,
          props.post_id
        )
      );
      return;
    } else {
      customAlert.sweetNeedLogin();
    }
  };

  // 날짜에 따라서 오늘 내일 변겨 함수
  const date_time = () => {
    if (is_today) {
      return `오늘 ${ordTime[0]}:${ordTime[1]}`;
    }
    if (is_tomorrow) {
      return `내일 ${ordTime[0]}:${ordTime[1]}`;
    }

    return `${ordDate[1]}월 ${ordDate[2]}일 ${ordTime[0]}:${ordTime[1]}`;
  };

  React.useEffect(() => {
    if (props.valid === false) {
      return setDisabled(true);
    }
    if (props.headCount === props.nowHeadCount) {
      return setDisabled(true);
    } else if (props.headCount > props.nowHeadCount) {
      return setDisabled(false);
    }
  }, [disabled ? disabled : null]);

  return (
    <React.Fragment>
      <Grid
        maxWidth="32rem"
        margin="0 auto 2rem auto"
        bg={color.bg0}
        border="0.1rem solid #EBE9E8"
        radius={fontSize.base}
      >
        <Grid
          is_float="left"
          // margin="0.5rem 1.5rem 0 1.5rem"
          margin="0.5rem 1.5rem 0.8rem 1.5rem"
        >
          <Grid is_flex>
            <UserProfile
              src={props.userImg}
              onClick={() => {
                if (is_login) {
                  if (user_info.user_id === props.user_id) {
                    return history.push({
                      pathname: "/myprofile",
                      state: { ...props },
                    });
                  }
                  history.push({
                    pathname: `/userprofile/${props.user_id}`,
                    state: { ...props },
                  });
                } else {
                  customAlert.sweetNeedLogin();
                }
              }}
            />
            <Grid>
              <Grid is_flex>
                <Text size={fontSize.small} color={color.bg100} bold2="500">
                  {props.username}
                </Text>
                <Grid
                  // minWidth="5.5rem"
                  // maxWidth="9.1rem"
                  width="fit-content"
                  height="fit-content"
                  white_space="nowrap"
                  bg={
                    props.valid === false || disabled
                      ? `${color.bg20}`
                      : "rgba(84, 189, 88, 0.1)"
                  }
                  radius="0.5rem"
                  padding="0.4rem 0.8rem"
                  margin="0 3.3rem 0 0"
                  opacity="0.9"
                >
                  <Text
                    size="1rem"
                    text_align="center"
                    margin="0"
                    width="fit-content"
                    white_space="nowrap"
                    color={
                      props.valid === false || disabled
                        ? `${color.bg80}`
                        : color.success100
                    }
                    bold
                  >
                    {props.valid === false || disabled
                      ? `모집마감`
                      : `모집 인원 ${props.nowHeadCount}/${props.headCount}명`}
                  </Text>
                </Grid>
              </Grid>
              <Text size="1rem" color={color.bg80} bold2="400">
                {ym[0]}년 {ym[1]}월 {day[0]}일 {hm[0]}:{hm[1]}
              </Text>
            </Grid>
          </Grid>
        </Grid>
        <Grid maxWidth="29rem" margin="0 1.5rem">
          <Grid display="inline-block" margin="0">
            <Text
              display="inline-block"
              size={fontSize.postBox}
              line_height="150%"
              color={color.bg100}
              bold
              // margin="0"
              margin="0 0 0.8rem 0"
            >
              {props.title}
            </Text>
            <Text
              width="28.8rem"
              // margin="0 0 0.6rem 0"
              margin="0 0 0.8rem 0"
              size={fontSize.small}
              line_height="150%"
              color={color.bg100}
              bold2="400"
              overflow="hidden"
              display="-webkit-box"
              webkit_line="2"
              webkit_box_orient="vertical"
            >
              {props.contents}
            </Text>
          </Grid>
          <Hr />
          <Grid>
            <Grid is_flex4>
              <Text
                size={fontSize.small}
                bold2="400"
                line_height="150%"
                color={color.bg80}
                margin="0.8rem 0.8rem 0.8rem 0"
              >
                만날 장소
              </Text>
              {!props.is_profile && (
                <Text
                  height="1.5rem"
                  size="1rem"
                  bold2="500"
                  color={color.success100}
                  line_height="150%"
                  margin="0 0.1rem"
                >
                  {distance > 999
                    ? `내 위치로부터 ${(distance / 1000).toFixed(2)}km`
                    : `내 위치로부터 ${distance}m`}
                </Text>
              )}
            </Grid>
            <Text
              width="29rem"
              height="2rem"
              size="1.3rem"
              bold2="500"
              line_height="150%"
              color="#36373C"
              margin="0 0 1.2rem 0"
              overflow="hidden"
              text_overflow="ellipsis"
              white_space="nowrap"
              display="block"
            >
              {props.address}
            </Text>
          </Grid>
          <Hr />
          <Grid is_flex align_items="center">
            <Grid>
              <Text
                size={fontSize.small}
                bold2="400"
                line_height="150%"
                color={color.bg80}
                margin="0.8rem 0"
              >
                배달 식당
              </Text>
              <Text
                width="13.6rem"
                size="1.3rem"
                bold2="500"
                line_height="150%"
                color="#36373C"
                margin="0 0 1.6rem 0"
                overflow="hidden"
                text_overflow="ellipsis"
                white_space="nowrap"
                display="block"
              >
                {props.shop}
              </Text>
            </Grid>
            <Grid>
              <Grid text_align="left" padding="0.1rem 0 0.8rem 1rem">
                <Text
                  size={fontSize.small}
                  bold2="400"
                  line_height="150%"
                  color={color.bg80}
                  margin="0.7rem 0"
                >
                  예상 만남 시간
                </Text>
                <Text
                  width="13.6rem"
                  size="1.3rem"
                  bold2="500"
                  line_height="150%"
                  color="#36373C"
                  margin="0.8rem 0"
                >
                  {date_time()}
                </Text>
              </Grid>
            </Grid>
          </Grid>
          {props.valid === false || disabled ? (
            ""
          ) : (
            <Grid is_flex maxWidth="29rem" margin="0 0 1.5rem 0">
              <Button
                width="14rem"
                height="4.4rem"
                radius="1.2rem"
                bg={color.brand20}
                border="none"
                color={color.brand100}
                size={fontSize.small}
                bold={fontSize.bold}
                cursor="pointer"
                _onClick={() => {
                  dispatch(postActions.getDetailPostUserListAX(props.post_id));
                  history.push(`/post/${props.post_id}`);
                }}
              >
                자세히 보기
              </Button>
              <Button
                width="14rem"
                height="4.4rem"
                radius="1.2rem"
                bg={disabled ? "#EBE9E8" : color.brand100}
                border="none"
                size={fontSize.small}
                bold={fontSize.bold}
                cursor="pointer"
                disabled={disabled}
                _onClick={(e) => {
                  requestJoin();
                  if (props.headCount === props.nowHeadCount) {
                    return setDisabled(true);
                  }
                }}
              >
                <Text
                  bold
                  size={fontSize.small}
                  color={disabled ? "#CECAC7" : color.bg0}
                >
                  채팅 시작하기
                </Text>
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

Post.defaultProps = {};

const UserProfile = styled.div`
  width: 4.3rem;
  height: 3.8rem;
  border-radius: 2rem;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  margin: 1rem 1rem 1rem 0;
  cursor: pointer;
`;

const Hr = styled.hr`
  width: 29rem;
  height: 0.05rem;
  background-color: #f4f4f3;
  border: none;
  margin: 0;
`;
export default Post;
