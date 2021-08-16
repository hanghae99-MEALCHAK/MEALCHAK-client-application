import React from "react";
import styled from "styled-components";
import logger from "../shared/Console";
import { history } from "../redux/configureStore";
import { customAlert } from "./Sweet";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as searchActions } from "../redux/modules/search";
import { actionCreators as imageActions } from "../redux/modules/image";

// styles
import { HiOutlineMenu } from "react-icons/hi";
import { Grid, Text } from "../elements";
import theme from "../styles/theme";

const Header = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);

  const loginCheck = (path) => {
    if (is_login) {
      history.push(`/${path}`);
    } else {
      customAlert.sweetNeedLogin();
    }
  };
  const { color, fontSize } = theme;

  React.useEffect(() => {
    // 헤더 props로는 page별 상위컴포넌트에서 내려받는 history, shape이 있음
    logger('헤더 props', props);
  }, []);

  // shape 홈일때, 지도 api 추가 되면
  // 상위 컴포넌트에서 children 으로 주소 보여줄 수 있을 것 같음
  if (props.shape === '홈') {
    return (
      <React.Fragment>
        <Grid
          is_flex2="t"
          height="4.4rem"
          margin="0rem auto 0.8rem"
          bg="#ffffff"
        >
          {/* <Grid width="24px" margin="0 0 0 1.3rem" /> */}
          <Text
            margin="0 1rem 0 0"
            size={fontSize.small}
            bold2="700"
            cursor="t"
            _onClick={() => {
              if (!is_login) {
                return customAlert.sweetNeedLogin();
              }
              history.replace('/address');
            }}
          >
            {is_login ? props.children : '여기를 클릭해서 주소를 설정하세요!'}
          </Text>
          <svg
            style={{ cursor: 'pointer' }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              if (!is_login) {
                customAlert.sweetNeedLogin();
              }
              history.replace('/address');
            }}
          >
            <path
              d="M4 7L10 13L16 7"
              stroke="#36373C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Grid>
      </React.Fragment>
    );
  }

  // 모집글 업로드페이지일때
  if (props.shape === '모임 만들기') {
    return (
      <React.Fragment>
        <Grid
          maxWidth="35.8rem"
          is_fixed_top="t"
          is_flex4="t"
          height="4.4rem"
          margin="0 auto"
          bg="#ffffff"
        >
          <span
            className="material-icons-outlined"
            style={{
              fontSize: '1.9rem',
              position: 'absolute',
              marginLeft: '1.2rem',
              cursor: 'pointer',
            }}
            onClick={() => {
              history.replace('/home');
            }}
          >
            close
          </span>
          <Text margin="auto" size="1.6rem" bold>
            모임 만들기
          </Text>
        </Grid>
      </React.Fragment>
    );
  }

  // 상세페이지일때,
  if (props.shape === '상세페이지') {
    return (
      <React.Fragment>
        <Grid
          maxWidth="35.8rem"
          is_fixed_top="t"
          is_flex4="t"
          height="4.4rem"
          margin="0 auto"
          bg="#ffffff"
        >
          <svg
            style={{
              position: 'absolute',
              marginLeft: '1.6rem',
              cursor: 'pointer',
            }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              // history.replace('/home');
              history.goBack();
            }}
          >
            <path
              d="M15 5L7 12L15 19"
              stroke="#36373C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <Text
            width="29rem"
            margin="auto"
            size="1.6rem"
            bold2="700"
            text_align="center"
            overflow="hidden"
            text_overflow="ellipsis"
            white_space="nowrap"
            display="block"
          >
            {props.children}
          </Text>
        </Grid>
      </React.Fragment>
    );
  }

  // 나의 채팅 리스트,
  if (props.shape === '채팅리스트') {
    return (
      <React.Fragment>
        <Grid
          maxWidth="35.8rem"
          is_fixed_top="t"
          is_flex4="t"
          height="4.4rem"
          margin="0 auto"
          bg="#ffffff"
        >
          <Text margin="auto" size="1.6rem" bold2="700">
            채팅
          </Text>
        </Grid>
      </React.Fragment>
    );
  }

  // 채팅방,
  if (props.shape === '채팅방') {
    return (
      <React.Fragment>
        <Grid
          maxWidth="36rem"
          is_flex4="t"
          height="4.4rem"
          bg="#ffffff"
          is_fixed_top="t"
          text_align="right"
          fix_center="t"
        >
          <Grid width="24px" margin="0 0 0 1.3rem" />
          <svg
            style={{
              fontSize: '1.9rem',
              position: 'absolute',
              marginLeft: '1.2rem',
              cursor: 'pointer',
              zIndex: 1,
            }}
            width="2.4rem"
            height="2.4rem"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              history.replace('/chatlist');
            }}
          >
            <path
              d="M15 5L7 12L15 19"
              stroke="#36373C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Text
            width="29rem"
            margin="auto"
            size="1.6rem"
            bold2="700"
            text_align="center"
            overflow="hidden"
            text_overflow="ellipsis"
            white_space="nowrap"
            display="block"
          >
            {props.children}
          </Text>
          <HiOutlineMenu
            size="2.4rem"
            color={color.bg100}
            style={{
              margin: '0rem 1.2rem 0 0',
              cursor: 'pointer',
              zIndex: '1',
              // opacity: isOpen ? 0 : 1,
            }}
            onClick={props._onClick}
          />
        </Grid>
      </React.Fragment>
    );
  }

  // 마이페이지,
  if (props.shape === '마이페이지') {
    return (
      <React.Fragment>
        <Grid
          maxWidth="35.8rem"
          is_fixed_top="t"
          is_flex4="t"
          height="4.4rem"
          margin="0 auto"
          bg="#ffffff"
        >
          <Grid width="7rem" margin="0 0 0 1.3rem" />
          <Text margin="auto" size="1.6rem" bold2="700">
            마이페이지
          </Text>
          <Text
            width="6.4rem"
            height="2rem"
            size="1.3rem"
            line_height="150%"
            text_align="center"
            color="#FF9425"
            bold2="500"
            margin="0 2rem 0 0"
            cursor="t"
            _onClick={() => {
              history.push('/profile');
            }}
          >
            프로필 수정
          </Text>
        </Grid>
      </React.Fragment>
    );
  }

  // 마이페이지 - 프로필 수정,
  if (props.shape === '프로필수정') {
    return (
      <React.Fragment>
        <Grid
          maxWidth="35.8rem"
          is_header="t"
          is_flex4="t"
          height="4.4rem"
          margin="0 auto"
          bg="#ffffff"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            cursor="pointer"
            onClick={() => {
              dispatch(imageActions.setPreview(null));
              history.replace('/mypage');
            }}
            style={{ margin: '0 0 0 1rem' }}
          >
            <path
              d="M15 5L7 12L15 19"
              stroke="#36373C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Text margin="0 auto" size="1.6rem" bold2="700">
            프로필 수정
          </Text>
          <Grid width="3rem" />
        </Grid>
      </React.Fragment>
    );
  }

  // 타 유저가 보는 내 프로필
  if (props.shape === '프로필') {
    return (
      <React.Fragment>
        <Grid
          maxWidth="35.8rem"
          is_fixed_top="t"
          is_flex4="t"
          height="4.4rem"
          margin="0 auto"
          bg="#ffffff"
          _onClick={() => {
            history.goBack();
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            cursor="pointer"
            style={{ margin: '0 0 0 1rem' }}
          >
            <path
              d="M15 5L7 12L15 19"
              stroke="#36373C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Text margin="0 auto" size="1.6rem" bold2="700">
            프로필
          </Text>
          <Grid width="3rem" />
        </Grid>
      </React.Fragment>
    );
  }

  // 마이페이지 - 앱 설정 - 로그아웃, 탈퇴 페이지
  if (props.shape === '설정') {
    return (
      <React.Fragment>
        <Grid
          maxWidth="35.8rem"
          is_fixed_top="t"
          is_flex4="t"
          height="4.4rem"
          margin="0 auto"
          bg="#ffffff"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            cursor="pointer"
            onClick={() => {
              history.replace('/mypage');
            }}
            style={{ margin: '0 0 0 1rem' }}
          >
            <path
              d="M15 5L7 12L15 19"
              stroke="#36373C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Text margin="0 auto" size="1.6rem" bold2="700">
            설정
          </Text>
          <Grid width="3rem" />
        </Grid>
      </React.Fragment>
    );
  }

  // 마이페이지 - 내가 쓴 글
  if (props.shape === '내가쓴글') {
    return (
      <React.Fragment>
        <Grid
          maxWidth="35.8rem"
          is_fixed_top="t"
          is_flex4="t"
          height="4.4rem"
          margin="0 auto"
          bg="#ffffff"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            cursor="pointer"
            onClick={() => {
              history.replace('/mypage');
            }}
            style={{ margin: '0 0 0 1rem' }}
          >
            <path
              d="M15 5L7 12L15 19"
              stroke="#36373C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Text margin="0 auto" size="1.6rem" bold2="700">
            내가 쓴 글
          </Text>
          <Grid width="3rem" />
        </Grid>
      </React.Fragment>
    );
  }

  // 마이페이지 - 내가 받은 리뷰
  if (props.shape === '내가받은리뷰') {
    return (
      <React.Fragment>
        <Grid
          maxWidth="35.8rem"
          is_fixed_top="t"
          is_flex4="t"
          height="4.4rem"
          margin="0 auto"
          bg="#ffffff"
          z_index="100"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            cursor="pointer"
            onClick={() => {
              history.replace('/mypage');
            }}
            style={{ margin: '0 0 0 1rem' }}
          >
            <path
              d="M15 5L7 12L15 19"
              stroke="#36373C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Text margin="0 auto" size="1.6rem" bold2="700">
            내가 받은 리뷰
          </Text>
          <Grid width="3rem" />
        </Grid>
      </React.Fragment>
    );
  }

  // 유저 프로필 - 리뷰 남기기
  if (props.shape === '리뷰남기기') {
    return (
      <React.Fragment>
        <Grid
          maxWidth="35.8rem"
          is_fixed_top="t"
          is_flex4="t"
          height="4.4rem"
          margin="0 auto"
          bg="#ffffff"
          z_index="100"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            cursor="pointer"
            onClick={() => {
              // history.push('/home');
              history.goBack();
              // dispatch(searchActions.food_check(false));
            }}
            style={{ margin: '0 0 0 1rem' }}
          >
            <path
              d="M15 5L7 12L15 19"
              stroke="#36373C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Text margin="0 auto" size="1.6rem" bold2="700">
            리뷰 남기기
          </Text>
          <Grid width="3rem" />
        </Grid>
      </React.Fragment>
    );
  }

  // 검색페이지일때
  if (props.shape === '검색') {
    return (
      <React.Fragment>
        <Grid
          maxWidth="35.8rem"
          is_fixed_top="t"
          is_flex4="t"
          height="4.4rem"
          margin="0 auto"
          bg="#ffffff"
        >
          <svg
            style={{
              fontSize: "1.9rem",
              position: "absolute",
              marginLeft: "1.2rem",
              cursor: "pointer",
            }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              // history.push('/home');
              history.goBack();
              dispatch(searchActions.food_check(false));
            }}
          >
            <path
              d="M15 5L7 12L15 19"
              stroke="#36373C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Text margin="auto" size="1.6rem" bold2="700">
            {props.children}
          </Text>
        </Grid>
      </React.Fragment>
    );
  }

  // 주소 입력페이지일때
  if (props.shape === '주소입력') {
    return (
      <React.Fragment>
        <Grid
          maxWidth="35.8rem"
          is_fixed_top="t"
          is_flex4="t"
          height="4.4rem"
          margin="0 auto"
          bg="#ffffff"
        >
          <span
            className="material-icons-outlined"
            style={{
              fontSize: '1.9rem',
              position: 'absolute',
              marginLeft: '1.2rem',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (props?.is_home) {
                return history.replace('/home');
              }
              props?.close();
            }}
          >
            close
          </span>
          <Text margin="auto" size="1.6rem" bold>
            {props.children}
          </Text>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Grid is_flex4="t" height="4.4rem" margin="0 auto 0.8rem">
        <span
          className="material-icons-outlined"
          style={{
            fontSize: '1.9rem',
            position: 'absolute',
            marginLeft: '1.2rem',
          }}
        >
          close
        </span>
        <Text margin="auto" size="1.6rem" bold2="700">
          {props.children}
        </Text>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {
  shape: '홈',
  children: null,
  _onClick: () => {},
};

const SideGrid = styled.div`
  position: fixed;
  width: 36rem;
  height: inherit;
  /* z-index: 101; */
  text-align: right;
`;

export default Header;
