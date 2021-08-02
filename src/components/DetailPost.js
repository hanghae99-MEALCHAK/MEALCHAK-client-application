import React from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postAction } from '../redux/modules/post';

import { Grid, Button, Text, Image } from '../elements';

import theme from '../styles/theme';
import logger from '../shared/Console';

const DetailPost = (props) => {
  const {
    post_id,
    title,
    headCount,
    insert_dt,
    address,
    orderTime,
    contents,
    shop,
    createdAt,
    username,
    user_id,
  } = props;

  const { color, border, radius, fontSize } = theme;
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    logger("is_me", props.is_me)
  }, []);

  const deleteBtn = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch(postAction.deletePostAX(post_id));
    } else {
      return;
    }
  };

  const loginCheck = (path) => {
    if (is_login) {
      window.alert('준비중인 서비스입니다.');
      return;
      history.push(`/${path}`);
    } else {
      window.alert('로그인이 필요한 기능입니다.\n로그인을 해주세요.');
      history.push('/');
    }
  };

  return (
    <React.Fragment>
      <Grid
        width="30rem"
        margin="1.6rem auto"
        padding="1.6rem"
        is_border="0.1rem solid #EBE9E8"
        radius={radius.postBox}
      >
        <Grid>
          <Grid is_flex>
            <Grid width="auto">
              <Image shape="circle" size="4" />
            </Grid>
            <Grid>
              <Text bold size="1.3rem" color={color.bg100}>
                {username}
              </Text>
              <Text width="10rem" size="1rem" color={color.bg60}>
                {insert_dt}
              </Text>
            </Grid>
            <Grid
              is_flex4
              width="9.1rem"
              height="2.3rem"
              radius="0.5rem"
              bg={color.bg20}
            >
              <Text
                text_align="center"
                width="9.1rem"
                bold2="700"
                size="1rem"
                color={color.brand100}
              >
                모집 인원 2명/{headCount}명
              </Text>
            </Grid>
          </Grid>
          <Grid>
            <Text
              margin="1.6rem 0 0.8rem 0"
              bold
              size="1.6rem"
              color={color.bg100}
            >
              {title}
            </Text>
            <Text size="1.3rem" color={color.bg100}>
              {contents}
            </Text>
          </Grid>
          <GreyLine />
          <Grid>
            <Text margin="0.8rem 0" size="1.3rem" color={color.bg80}>
              배달 받을 곳
            </Text>
            <Text margin="0 0 1.6rem 0" size="1.3rem" color={color.bg100}>
              {address}
            </Text>
          </Grid>
          <GreyLine />
          <Grid is_flex>
            <Grid>
              <Text margin="0.8rem 0" size="1.3rem" color={color.bg80}>
                배달 식당
              </Text>
              <Text size="1.3rem" color={color.bg100}>
                {props.shop}
              </Text>
            </Grid>
            <Grid is_flex>
              <Grid>
                <Text margin="0.8rem 0" size="1.3rem" color={color.bg80}>
                  주문 예정 시각
                </Text>
                <Text size="1.3rem" color={color.bg100}>
                  {orderTime}
                </Text>
              </Grid>
            </Grid>
          </Grid>
          <Grid is_flex></Grid>
        </Grid>
      </Grid>
      {props.is_me ? (
        <Grid text_align="center" is_flex width="29rem" margin="0 auto 1rem">
          <Button
            width="14rem"
            height="4.4rem"
            radius="1.2rem"
            bg="#FFF0E1"
            border="none"
            color={color.brand100}
            size={fontSize.small}
            bold={fontSize.bold}
            _onClick={() => {
              history.push(`/upload/${post_id}`);
            }}
          >
            <Text bold size="1.6rem" color={color.brand100}>
              수정하기
            </Text>
          </Button>
          <Button
            width="14rem"
            height="4.4rem"
            radius="1.2rem"
            bg="#FF9425"
            border="none"
            color={color.bg0}
            size={fontSize.small}
            bold={fontSize.bold}
            _onClick={deleteBtn}
          >
            <Text bold size="1.6rem" color={color.bg0}>
              삭제하기
            </Text>
          </Button>
        </Grid>
      ) : (
        <Grid maxWidth="32rem" margin="0 auto">
          <Button
            shape="large"
            color={color.brand100}
            size={fontSize.small}
            _onClick={() => {
              loginCheck('chat');
            }}
          >
            <Text bold size="1.6rem" color={color.bg0}>
              채팅 시작하기
            </Text>
          </Button>
        </Grid>
      )}
    </React.Fragment>
  );
};

DetailPost.defaultProps = {};

const GreyLine = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 1px;
  margin: 1rem auto;
  background-color: #f1f2f4;
`;

export default DetailPost;
