import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postAction } from "../redux/modules/post";
import Map from "../components/Map";

import { Grid, Button, Text, Image } from "../elements";

import theme from "../styles/theme";
import logger from "../shared/Console";
import { customAlert } from "./Sweet";
import { emptyHome_3x } from "../styles/img/index";

import moment from "moment";

const DetailPost = React.memo((props) => {
  logger("상세포스트 프롭스", props);
  const {
    address,
    detail_address,
    contents,
    distance,
    headCount,
    nowHeadCount,
    orderDate,
    orderTime,
    post_id,
    shop,
    title,
    userImg,
    user_id,
    username,
    valid,
    chat_user_list,
  } = props;

  const { color, radius, fontSize } = theme;

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const user_info = useSelector((state) => state.user.user);

  const [disabled, setDisabled] = React.useState(false);

  // 지도 표시 위도, 경도
  const latitude = useSelector((state) => state.post.post_lat_lng?.latitude);
  const longitude = useSelector((state) => state.post.post_lat_lng?.longitude);

  // 연, 월
  const ym = props?.insert_dt.split("-");
  // 일
  const day = ym[2].split(" ");
  // 시, 분
  const hm = day[1].split(":");

  // 예상 만남 시간
  const ordDate = orderDate.split("-");
  const ordTime = orderTime.split(":");

  // 오늘 표시
  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "d").format("YYYY-MM-DD");
  const is_today = today === orderDate ? true : false;
  const is_tomorrow = tomorrow === orderDate ? true : false;

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
    if (valid === false) {
      return setDisabled(true);
    }
    if (props.headCount === props.nowHeadCount) {
      return setDisabled(true);
    } else if (props.headCount > props.nowHeadCount) {
      return setDisabled(false);
    }
  }, [disabled ? disabled : null]);

  const deleteBtn = () => {
    dispatch(
      postAction.deletePostAX(
        props?.post_id,
        props?.is_profile ? "is_profile" : null
      )
    );
  };

  const requestJoin = () => {
    if (is_login) {
      // customAlert.SweetChatRequest(user_info?.user_id, user_id, post_id);
      dispatch(
        postAction.requestChatPostAX(
          user_info?.user_id,
          user_id,
          post_id,
          "post"
        )
      );
      return;
    } else {
      customAlert.sweetNeedLogin();
    }
  };

  return (
    <React.Fragment>
      <Grid
        width="32rem"
        margin="1.6rem auto 0"
        padding="1.6rem"
        is_border="0.1rem solid #EBE9E8"
        radius={radius.postBox}
      >
        <Grid>
          <Grid is_flex>
            <UserProfile
              src={userImg}
              onClick={() => {
                if (is_login) {
                  if (user_info.user_id === props.user_id) {
                    return history.push({
                      pathname: "/myprofile",
                      state: { ...props },
                    });
                  }
                  history.push({
                    pathname: "/userprofile",
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
                  {username}
                </Text>
                <Grid
                  width={valid === false ? "5.5rem" : ""}
                  maxWidth="9.1rem"
                  height="2.3rem"
                  bg={
                    props.valid === false || disabled
                      ? color.bg20
                      : "rgba(84, 189, 88, 0.1)"
                  }
                  radius="0.5rem"
                  padding="0.4rem 0.8rem"
                >
                  <Text
                    size="1rem"
                    text_align="center"
                    color={
                      props.valid === false || disabled
                        ? color.bg80
                        : color.success100
                    }
                    bold
                  >
                    {valid === false || disabled
                      ? `모집마감`
                      : `모집 인원 ${nowHeadCount}/${headCount}명`}
                  </Text>
                </Grid>
              </Grid>
              <Text size="1rem" color={color.bg80} bold2="400">
                {ym[0]}년 {ym[1]}월 {day[0]}일 {hm[0]}:{hm[1]}
              </Text>
            </Grid>
          </Grid>
          <Grid>
            <Text
              margin="1.6rem 0 0.8rem 0"
              bold
              size={fontSize.postBox}
              color={color.bg100}
            >
              {title}
            </Text>
            <Text
              margin="0 0 1.6rem 0"
              size={fontSize.small}
              line_height="150%"
              color={color.bg100}
              bold2="400"
            >
              {contents}
            </Text>
          </Grid>
          <GreyLine />
          <Grid is_flex4>
            <Text
              margin="0.8rem 0.8rem 0.8rem 0"
              bold2="400"
              line_height="150%"
              size={fontSize.small}
              color={color.bg80}
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
                margin="0 0 0 1rem"
              >
                {distance > 999
                  ? `내 위치로부터 ${(distance / 1000).toFixed(2) * 1000}km`
                  : `내 위치로부터 ${distance * 1000}m`}
              </Text>
            )}
          </Grid>
          <Text
            line_height="150%"
            margin="0 0 1.2rem 0"
            size="1.3rem"
            bold2="500"
            color={color.bg100}
          >
            {address} {detail_address}
          </Text>
          <GreyLine />
          <GridGap>
            <Text
              width="15rem"
              margin="0.8rem 0"
              size="1.3rem"
              color={color.bg80}
            >
              배달 식당
            </Text>
            <Text
              width="15rem"
              margin="0.8rem 0"
              size="1.3rem"
              color={color.bg80}
            >
              예상 만남 시간
            </Text>
          </GridGap>
          <GridGap>
            <Text
              width="15rem"
              size="1.3rem"
              color={color.bg100}
              margin="0 0 1.6rem 0"
            >
              {shop}
            </Text>
            <Text
              width="15rem"
              size="1.3rem"
              color={color.bg100}
              margin="0 0 1.6rem 0"
            >
              {date_time()}
            </Text>
          </GridGap>

          {props.is_profile && (
            <>
              {props.valid === false ? (
                <Grid maxWidth="32rem" margin="1.6rem 0 0 0">
                  <Button
                    height="4.4rem"
                    radius="1.2rem"
                    bg="#FFF0E1"
                    border="none"
                    color={color.brand100}
                    size={fontSize.small}
                    bold={fontSize.bold}
                    cursor="t"
                    _onClick={deleteBtn}
                  >
                    삭제하기
                  </Button>
                </Grid>
              ) : (
                <>
                  <Grid
                    is_flex
                    maxWidth="29rem"
                    margin="1.6rem 0 0 0"
                    gap="1rem"
                  >
                    <Button
                      width="14rem"
                      height="4.4rem"
                      radius="1.2rem"
                      bg={color.brand20}
                      border="none"
                      color={color.brand100}
                      size={fontSize.small}
                      bold={fontSize.bold}
                      cursor="t"
                      _onClick={deleteBtn}
                    >
                      삭제하기
                    </Button>
                    <Button
                      width="14rem"
                      height="4.4rem"
                      radius="1.2rem"
                      bg={color.brand100}
                      border="none"
                      color={color.bg0}
                      size={fontSize.small}
                      bold={fontSize.bold}
                      cursor="t"
                      _onClick={() => {
                        history.replace({
                          pathname: `/upload/${post_id}`,
                          state: { ...props },
                        });
                      }}
                    >
                      수정하기
                    </Button>
                  </Grid>
                </>
              )}
            </>
          )}
        </Grid>
      </Grid>
      {!props.is_profile && (
        <>
          <Grid
            width="32rem"
            margin="1.6rem auto"
            padding="1.6rem 1.6rem 0.8rem 1.6rem"
            is_border="0.1rem solid #EBE9E8"
            radius={radius.postBox}
          >
            <Text color={color.bg80} size={fontSize.small}>
              참여 중인 사용자
            </Text>
            {chat_user_list.map((p, idx) => {
              return (
                <Grid key={idx} is_flex4 margin="0.8rem 0">
                  <Image
                    shape="circle"
                    src={p.user_img}
                    size="3"
                    margin="0 0.8rem 0 0"
                    cursor="t"
                    _onClick={() => {
                      if (is_login) {
                        if (user_info?.user_id === p.user_id) {
                          return history.push({
                            pathname: "/myprofile",
                            state: { ...p },
                          });
                        }
                        history.push({
                          pathname: "/userprofile",
                          state: { ...p },
                        });
                      } else {
                        customAlert.sweetNeedLogin();
                      }
                    }}
                  ></Image>
                  <Text size={fontSize.small}>{p.user_name}</Text>
                  {user_id === p.user_id ? (
                    <Text
                      width="2.7rem"
                      height="1.5rem"
                      margin="0 0 0 0.4rem"
                      size={fontSize.tiny}
                      bg={color.brand20}
                      color={color.brand100}
                      radius="0.4rem"
                      bold2="700"
                      text_align="center"
                    >
                      방장
                    </Text>
                  ) : (
                    <></>
                  )}
                </Grid>
              );
            })}
          </Grid>
          {/* 자세히 보기 - 지도 */}
          {!latitude && !longitude ? (
            <Grid
              width="32rem"
              height="25rem"
              bg="white"
              margin="1.6rem auto"
              padding="0.5rem 1.6rem 0.8rem 1.6rem"
              is_border="0.1rem solid #EBE9E8"
              radius={radius.postBox}
            >
              <LogoImg src={emptyHome_3x} />
              <Text size={fontSize.small} color={color.bg80} text_align="center">
                주소를 불러올 수 없습니다
              </Text>
              <Text size={fontSize.base} color={color.bg80} text_align="center">
                잠시 후 다시 시도해주세요.
              </Text>
            </Grid>
          ) : (
            <Map {...props} />
          )}

          <Grid
            maxWidth="32rem"
            margin="0 auto"
            height="auto"
            // is_fixed="t"
            // bottom="1rem"
          >
            {props.is_me ? (
              <Grid text_align="center" is_flex3 maxWidth="32rem" gap="0.8rem">
                <Button
                  width="15.2rem"
                  height="4.6rem"
                  radius="1.2rem"
                  bg="#FFF0E1"
                  border="none"
                  color={color.brand100}
                  size={fontSize.small}
                  bold={fontSize.bold}
                  cursor="t"
                  _onClick={deleteBtn}
                >
                  삭제하기
                </Button>
                <Button
                  width="15.2rem"
                  height="4.6rem"
                  radius="1.2rem"
                  bg="#FF9425"
                  border="none"
                  color={color.bg0}
                  size={fontSize.small}
                  bold={fontSize.bold}
                  cursor="t"
                  _onClick={() => {
                    history.replace({
                      pathname: `/upload/${post_id}`,
                      state: { ...props },
                    });
                  }}
                >
                  수정하기
                </Button>
              </Grid>
            ) : (
              <Grid maxWidth="32rem" height="5rem">
                <Button
                  shape="large"
                  color={disabled ? "#EBE9E8" : color.brand100}
                  size={fontSize.small}
                  disabled={disabled}
                  cursor="pointer"
                  _onClick={(e) => {
                    if (props.headCount === props.nowHeadCount) {
                      return setDisabled(true);
                    }
                    requestJoin();
                  }}
                >
                  <Text
                    bold
                    size="1.6rem"
                    color={disabled ? "#CECAC7" : color.bg0}
                  >
                    {disabled ? "모집 마감됐어요" : "채팅 시작하기"}
                  </Text>
                </Button>
              </Grid>
            )}
          </Grid>
          <Grid height="1.6rem" />
        </>
      )}
    </React.Fragment>
  );
});

DetailPost.defaultProps = {};

const UserProfile = styled.div`
  width: 4.925rem;
  height: 4rem;
  border-radius: 2rem;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  margin: 1rem 1rem 1rem 0;
`;

const GreyLine = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 1px;
  background-color: #f1f2f4;
`;

const GridGap = styled.div`
  display: flex;
  gap: 0 2rem;
`;

const LogoImg = styled.div`
  margin: 1rem auto 1rem auto;
  background-image: url("${(props) => props.src}");
  width: 18.4rem;
  height: 16.7rem;
  background-size: cover;
  background-position: center;
`;
export default DetailPost;
