import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import moment from 'moment';

import { actionCreators as postAction } from '../redux/modules/post';
import { actionCreators as locateActions } from '../redux/modules/loc';
import { Kakao_auth_url } from '../shared/OAuth';
import logger from '../shared/Console';

// style
import { Button, Grid, Text } from '../elements';
import { UploadInput, UploadContents, Header } from '../components';
import theme from '../styles/theme';

const Upload = React.memo((props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const post_list = useSelector((state) => state.post.list);
  logger('Upload:19: ', props);
  // style
  const { color, border, radius, fontSize } = theme;

  const post_address = useSelector((state) => state.loc.post_address);
  const longitude = post_address?.longitude;
  const latitude = post_address?.latitude;

  // 수정판별
  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  const post_idx = is_edit
    ? post_list.findIndex((p) => p.post_id === parseInt(post_id))
    : null;
  let _post = post_list[post_idx];

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (is_edit && !_post) {
      window.alert('해당게시물을 찾을 수 없습니다.');
      history.goBack();
      return;
    }
    logger('post 수정 전 내용', _post);
    logger('post 수정 전 내용', is_edit);
  }, []);

  // upload 될 내용
  const past_post = {
    title: _post?.title,
    headCount: _post?.headCount,
    foodCategory: _post?.category,
    place: _post?.address,
    appointmentTime: _post?.orderTime,
    appointmentDate: _post?.orderDate,
    contents: _post?.contents,
    restaurant: _post?.shop,
    longitude: longitude,
    latitude: latitude,
  };
  const [post_info, setPostInfo] = useState(_post ? { ...past_post } : {});

  const today = moment().format('YYYY-MM-DD');

  const uploadBtn = () => {
    // 모집글 작성 시 상위, 하위 컴포넌트들에서 올바르지 않은 value있을때 처리하는 과정
    if (!post_info.title || post_info.title === '') {
      window.alert('모집글의 제목을 입력해주세요.');
      return;
    }
    if (!post_info.contents || post_info.contents === '') {
      window.alert('모집글의 내용을 입력해주세요.');
      return;
    }
    if (!post_info?.place || post_info?.place === '') {
      window.alert(
        '안전한 더치페이를 위해 모집원을 만날 장소가 필요합니다.\n 약속 장소를 입력해주세요.'
      );
      return;
    }
    if (!post_info.restaurant || post_info.restaurant === '') {
      window.alert('배달 예정인 식당을 입력해주세요.');
      return;
    }
    if (!post_info.headCount || post_info.headCount === '0') {
      window.alert('모집원의 인원 수를 입력해주세요.');
      return;
    }
    if (!post_info.appointmentTime || post_info.appointmentTime === '') {
      window.alert('모집원을 만날 시간을 입력해주세요.');
      return;
    }
    if (!post_info.foodCategory || post_info.foodCategory === '') {
      window.alert('모집을 희망하는 식품의 카테고리를 입력해주세요.');
      return;
    }

    post_info.appointmentDate = post_info.appointmentDate ?? today;

    dispatch(postAction.addPostAX(post_info));
  };

  const UploadEditBtn = () => {
    logger('수정 버튼, post_info', post_info);

    // 모집글 작성 시 상위, 하위 컴포넌트들에서 올바르지 않은 value있을때 처리하는 과정
    if (!post_info.title || post_info.title === '') {
      window.alert('모집글의 제목을 입력해주세요.');
      return;
    }
    if (!post_info.contents || post_info.contents === '') {
      window.alert('모집글의 내용을 입력해주세요.');
      return;
    }
    if (!post_info.place || post_info.place === '') {
      window.alert(
        '안전한 더치페이를 위해 모집원을 만날 장소가 필요합니다.\n 약속 장소를 입력해주세요.'
      );
      return;
    }
    if (!post_info.restaurant || post_info.restaurant === '') {
      window.alert('배달 예정인 식당을 입력해주세요.');
      return;
    }
    if (!post_info.headCount || post_info.headCount === '0') {
      window.alert('모집원의 인원 수를 입력해주세요.');
      return;
    }
    if (!post_info.appointmentTime || post_info.appointmentTime === '') {
      window.alert('모집원을 만날 시간을 입력해주세요.');
      return;
    }
    if (!post_info.foodCategory || post_info.foodCategory === '') {
      window.alert('모집을 희망하는 식품의 카테고리를 입력해주세요.');
      return;
    }

    dispatch(postAction.editPostAX(post_id, post_info));
  };

  if (is_login) {
    return (
      <Grid
        maxWidth="36rem"
        minHeight="100vh"
        border={border.line1}
        margin="0 auto"
      >
        <Grid shape="container">
          <Header {...props} shape="글쓰기">
            글쓰기
          </Header>
          <UploadContents
            post_info={post_info}
            onChange={(value) => setPostInfo({ ...post_info, ...value })}
          />

          {/* <Grid borderBottom={border.line2}></Grid> */}
          <UploadInput
            post_info={post_info}
            onChange={(value) => setPostInfo({ ...post_info, ...value })}
          />
          <Grid height="10rem" />
          <Grid
            height="auto"
            maxWidth="35.5rem"
            margin="0 auto"
            padding="2.8rem 2rem 2.7rem"
            is_fixed="t"
            bg={color.bg0}
          >
            {is_edit ? (
              <Button
                bg={color.brand100}
                height="5rem"
                border="none"
                radius={radius.button}
                _onClick={UploadEditBtn}
              >
                <Text color={color.bg0} bold2="700" size={fontSize.base}>
                  모집글 수정하기
                </Text>
              </Button>
            ) : (
              <Button
                bg={color.brand100}
                height="5rem"
                border="none"
                radius={radius.button}
                _onClick={uploadBtn}
              >
                <Text color={color.bg0} bold2="700" size={fontSize.base}>
                  밀착할 사람 모집하기
                </Text>
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid
        // height="100vh"
        maxWidth="36rem"
        border={border.line1}
        margin="0 auto"
      >
        <Grid shape="container">
          <Text>로그인 이후 이용가능한 서비스입니다.</Text>
          <Grid
            height="auto"
            maxWidth="35.5rem"
            margin="0 auto"
            padding="2.8rem 2rem 2.7rem"
            is_fixed="t"
            bg={color.bg0}
          >
            <Button
              shape="large"
              color="#FEE500"
              _onClick={() => {
                window.location.href = `${Kakao_auth_url}`;
              }}
            >
              <Grid is_flex4="t" height="4.4rem">
                <svg
                  style={{ position: 'absolute', marginLeft: '1.9rem' }}
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.9"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 0C4.029 0 0 3.13 0 6.989C0.063509 8.21942 0.463823 9.40875 1.15723 10.4272C1.85063 11.4456 2.81048 12.254 3.93201 12.764L2.93201 16.431C2.914 16.5032 2.91832 16.5792 2.9444 16.6489C2.97048 16.7187 3.01708 16.7788 3.07806 16.8215C3.13905 16.8642 3.21157 16.8874 3.28601 16.888C3.36045 16.8886 3.4333 16.8667 3.495 16.825L7.87201 13.925C8.24201 13.961 8.61702 13.982 8.99902 13.982C13.969 13.982 17.999 10.853 17.999 6.993C17.999 3.133 13.969 0.0039978 8.99902 0.0039978"
                    fill="black"
                  />
                </svg>
                <Text margin="auto" size={fontSize.base} bold2="700">
                  카카오 로그인
                </Text>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
});

export default Upload;
