import React from 'react';
import styled from 'styled-components';
import { actionCreators as postActions } from '../redux/modules/post';

import { useDispatch, useSelector } from 'react-redux';
import { customAlert } from './Sweet';

import { Grid, Text, Button } from '../elements';
import { history } from '../redux/configureStore';
import logger from '../shared/Console';
import theme from '../styles/theme';

const Post = (props) => {
  const { color, fontSize } = theme;

  // 연, 월
  const ym = props?.insert_dt.split('-');
  // 일
  const day = ym[2].split(' ');
  // 시, 분
  const hm = day[1].split(':');

  const is_login = useSelector((state) => state.user.is_login);
  const user_info = useSelector((state) => state.user.user);
  const [disabled, setDisabled] = React.useState(false);

  const dispatch = useDispatch();
  // 내 위치에서부터 얼마나 떨어져있는지 보여주는 변수(소수점이므로 1000을 곱해 m로 나타냄)
  const distance = props.distance * 1000;
  // logger("Post.js props: ", props);

  const requestJoin = () => {
    if (is_login) {
      customAlert.SweetChatRequest(
        user_info?.user_id,
        props.user_id,
        props.post_id
      );
      return;
    } else {
      customAlert.sweetNeedLogin();
    }
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
        <Grid is_float="left" margin="0.5rem 1.5rem 1.5rem 1.5rem">
          <Grid is_flex>
            <UserProfile
              src={props.userImg}
              onClick={() => {
                if (is_login) {
                  if (user_info.user_id === props.user_id) {
                    return history.push('/mypage');
                  }
                  history.push({
                    pathname: '/userprofile',
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
                  width={props.valid === false || disabled ? '5rem' : ''}
                  minWidth="5.5rem"
                  maxWidth="9.1rem"
                  height="2.3rem"
                  bg={color.bg20}
                  radius="0.5rem"
                  padding="0.4rem 0.8rem"
                  margin="0 3.3rem 0 0"
                >
                  <Text
                    size="1rem"
                    text_align="center"
                    margin="0"
                    color={
                      props.valid === false || disabled
                        ? '#9A9896'
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
          <Grid>
            <Text
              size={fontSize.postBox}
              line_height="150%"
              color={color.bg100}
              bold
              margin="0 0 1rem 0"
            >
              {props.title}
            </Text>
            <Text
              width="28.8rem"
              height="4rem"
              margin="0 0 1rem 0"
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
                margin="1rem 0"
              >
                배달 받을 곳
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
              margin="0 0 1rem 0"
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
                margin="1rem 0"
              >
                배달 식당
              </Text>
              <Text
                width="13.6rem"
                size="1.3rem"
                bold2="500"
                line_height="150%"
                color="#36373C"
                margin="0 0 1rem 0"
                overflow="hidden"
                text_overflow="ellipsis"
                white_space="nowrap"
                display="block"
              >
                {props.shop}
              </Text>
            </Grid>
            <Grid is_float="right">
              <Grid text_align="left" padding="0 0 0 1rem">
                <Text
                  size={fontSize.small}
                  bold2="400"
                  line_height="150%"
                  color={color.bg80}
                  margin="1rem 0"
                >
                  주문 예정 시각
                </Text>
                <Text
                  width="13.6rem"
                  size="1.3rem"
                  bold2="500"
                  line_height="150%"
                  color="#36373C"
                  margin="0 0 1rem 0"
                >
                  {props.orderTime}
                </Text>
              </Grid>
            </Grid>
          </Grid>
          {props.valid === false || disabled ? (
            ''
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
                  history.push(`/post/${props.post_id}`);
                  dispatch(postActions.getDetailPostUserListAX(props.post_id));
                }}
              >
                자세히 보기
              </Button>
              <Button
                width="14rem"
                height="4.4rem"
                radius="1.2rem"
                bg={disabled ? '#EBE9E8' : color.brand100}
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
                  color={disabled ? '#CECAC7' : color.bg0}
                >
                  {/* {disabled ? "모집 마감됐어요" : "채팅 시작하기"} */}
                  채팅 시작하기
                </Text>
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {};

const UserProfile = styled.div`
  width: 4.3rem;
  height: 3.8rem;
  border-radius: 2rem;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-position: center;
  margin: 1rem 1rem 1rem 0;
  cursor: pointer;
`;

const Hr = styled.hr`
  width: 29rem;
  background-color: #f4f4f3;
  border: 0.1rem solid #f4f4f3;
  margin: 0;
`;
export default Post;
