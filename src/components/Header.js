import React from 'react';
import styled from 'styled-components';
import logger from '../shared/Console';
import { history } from '../redux/configureStore';
import { socketFuntion as sf } from '../shared/SocketFn';

import { useSelector } from 'react-redux';

import { Grid, Text, Image } from '../elements';

const Header = (props) => {
  const is_login = useSelector((state) => state.user.is_login);

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
            size="1.6rem"
            bold2="700"
            cursor="t"
            _onClick={() => {
              if (!is_login) {
                window.alert('로그인이 필요한 기능입니다.\n로그인을 해주세요.');
                return history.push('/');
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
                window.alert('로그인이 필요한 기능입니다.\n로그인을 해주세요.');
                return history.push('/');
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
  if (props.shape === '글쓰기') {
    return (
      <React.Fragment>
        <Grid is_flex4="t" height="4.4rem" margin="0 auto" bg="#ffffff">
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
          <Text margin="auto" size="1.6rem" bold2="700">
            {props.children}
          </Text>
        </Grid>
      </React.Fragment>
    );
  }

  // 상세페이지일때,
  if (props.shape === '상세페이지') {
    return (
      <React.Fragment>
        <Grid is_flex4="t" height="4.4rem" margin="0 auto" bg="#ffffff">
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
        <Grid is_flex4="t" height="4.4rem" margin="0 auto" bg="#ffffff">
          <Grid width="24px" margin="0 0 0 1.3rem" />
          <Text margin="auto" size="1.6rem" bold2="700">
            채팅
          </Text>
          <svg
            style={{ marginRight: '1.3rem', cursor: 'pointer' }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.9225 4.22528V4.22529L13.9225 4.22532C13.9802 4.80199 14.009 5.09032 14.1015 5.26424C14.3262 5.68698 14.8191 5.89111 15.2769 5.75111C15.4653 5.69351 15.6895 5.51001 16.1381 5.14302C16.3754 4.94889 16.494 4.85183 16.6158 4.79737C16.9074 4.667 17.2437 4.68377 17.5209 4.84251C17.6367 4.90882 17.7451 5.01721 17.9619 5.23397L17.9619 5.23398L18.766 6.0381C18.9828 6.25488 19.0911 6.36327 19.1575 6.47906C19.3162 6.75624 19.333 7.09257 19.2026 7.38416C19.1481 7.50598 19.0511 7.62462 18.8569 7.86189C18.4899 8.31046 18.3064 8.53474 18.2488 8.72311C18.1088 9.18093 18.313 9.67375 18.7357 9.89849C18.9096 9.99096 19.198 10.0198 19.7747 10.0775C20.0798 10.108 20.2323 10.1232 20.3569 10.1709C20.6553 10.2849 20.8813 10.5345 20.965 10.8428C21 10.9715 21 11.1248 21 11.4314V12.5687C21 12.8752 21 13.0284 20.965 13.1571C20.8813 13.4654 20.6553 13.7152 20.3569 13.8292C20.2322 13.8768 20.0797 13.892 19.7748 13.9225C19.1983 13.9802 18.9101 14.009 18.7362 14.1014C18.3133 14.3261 18.1091 14.8191 18.2492 15.277C18.3068 15.4653 18.4902 15.6895 18.8571 16.1378C19.0511 16.375 19.1481 16.4936 19.2026 16.6153C19.333 16.907 19.3163 17.2434 19.1574 17.5206C19.0911 17.6364 18.9828 17.7447 18.7661 17.9614L18.7661 17.9614L17.9619 18.7656C17.7451 18.9824 17.6367 19.0908 17.521 19.1571C17.2438 19.3158 16.9074 19.3326 16.6158 19.2022C16.494 19.1478 16.3754 19.0507 16.1381 18.8566L16.1381 18.8566C15.6896 18.4896 15.4653 18.3061 15.2769 18.2485C14.8191 18.1085 14.3263 18.3126 14.1015 18.7354C14.0091 18.9093 13.9802 19.1977 13.9226 19.7745C13.892 20.0797 13.8768 20.2323 13.8291 20.357C13.7151 20.6553 13.4655 20.8812 13.1573 20.965C13.0285 21 12.8752 21 12.5685 21H11.4314C11.1248 21 10.9715 21 10.8428 20.965C10.5345 20.8813 10.2849 20.6553 10.1709 20.3569C10.1232 20.2323 10.108 20.0798 10.0775 19.7747C10.0198 19.198 9.99096 18.9096 9.89849 18.7357C9.67375 18.313 9.18094 18.1088 8.72312 18.2488C8.53475 18.3064 8.31046 18.4899 7.86188 18.857L7.86187 18.857L7.86186 18.857C7.62458 19.0511 7.50593 19.1482 7.38411 19.2027C7.09252 19.333 6.75621 19.3162 6.47903 19.1575C6.36323 19.0912 6.25484 18.9828 6.03805 18.766L5.23395 17.9619C5.01717 17.7451 4.90878 17.6367 4.84246 17.5209C4.68373 17.2438 4.66696 16.9074 4.79732 16.6159C4.85178 16.494 4.94885 16.3754 5.14299 16.1381L5.14299 16.1381C5.51 15.6895 5.69351 15.4653 5.75111 15.2769C5.89111 14.8191 5.68697 14.3262 5.26424 14.1015C5.09032 14.009 4.80198 13.9802 4.22529 13.9225C3.92024 13.892 3.76772 13.8768 3.64308 13.8291C3.3447 13.7151 3.11874 13.4655 3.03499 13.1572C3 13.0284 3 12.8752 3 12.5686V11.4315C3 11.1248 3 10.9715 3.03501 10.8427C3.11877 10.5345 3.34469 10.2849 3.64299 10.1709C3.76768 10.1232 3.92025 10.108 4.2254 10.0775H4.2254C4.80228 10.0198 5.09072 9.99093 5.2647 9.89841C5.68731 9.67366 5.89139 9.18095 5.75148 8.7232C5.69389 8.53476 5.51031 8.31039 5.14315 7.86164C4.94891 7.62423 4.85178 7.50552 4.79731 7.38364C4.66702 7.09211 4.68379 6.75589 4.84244 6.47877C4.90877 6.36291 5.01722 6.25446 5.2341 6.03758L6.03809 5.23359L6.03809 5.23359C6.25488 5.0168 6.36327 4.90841 6.47907 4.84209C6.75625 4.68337 7.09256 4.66659 7.38415 4.79695C7.50598 4.85141 7.62464 4.9485 7.86198 5.14269L7.86199 5.14269C8.31048 5.50964 8.53472 5.69312 8.72301 5.75072C9.18092 5.89081 9.67387 5.68662 9.8986 5.26377C9.99101 5.0899 10.0198 4.80166 10.0775 4.22518C10.108 3.92024 10.1232 3.76777 10.1708 3.64316C10.2848 3.34472 10.5346 3.1187 10.8429 3.03496C10.9716 3 11.1248 3 11.4313 3H12.5686C12.8752 3 13.0284 3 13.1572 3.03499C13.4655 3.11874 13.7151 3.3447 13.8291 3.64307C13.8768 3.76772 13.892 3.92024 13.9225 4.22528ZM12 15.6C13.9882 15.6 15.6 13.9882 15.6 12C15.6 10.0118 13.9882 8.4 12 8.4C10.0118 8.4 8.4 10.0118 8.4 12C8.4 13.9882 10.0118 15.6 12 15.6Z"
              fill="#36373C"
            />
          </svg>
        </Grid>
      </React.Fragment>
    );
  }

  // 채팅방,
  if (props.shape === '채팅방') {
    return (
      <React.Fragment>
        <Grid
        maxWidth="35.8rem"
          is_flex4="t"
          height="4.4rem"
          bg="#ffffff"
          is_fixed_top="t"
        >
          <Grid width="24px" margin="0 0 0 1.3rem" />
          <span
            className="material-icons-outlined"
            style={{
              fontSize: '1.9rem',
              position: 'absolute',
              marginLeft: '1.2rem',
              cursor: 'pointer',
            }}
            onClick={() => {
              history.replace("/home");
            }}
          >
            close
          </span>
          <Text margin="auto" size="1.6rem" bold2="700">
            {props.children}
          </Text>
          <svg
            style={{ marginRight: '1.3rem', cursor: 'pointer' }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.9225 4.22528V4.22529L13.9225 4.22532C13.9802 4.80199 14.009 5.09032 14.1015 5.26424C14.3262 5.68698 14.8191 5.89111 15.2769 5.75111C15.4653 5.69351 15.6895 5.51001 16.1381 5.14302C16.3754 4.94889 16.494 4.85183 16.6158 4.79737C16.9074 4.667 17.2437 4.68377 17.5209 4.84251C17.6367 4.90882 17.7451 5.01721 17.9619 5.23397L17.9619 5.23398L18.766 6.0381C18.9828 6.25488 19.0911 6.36327 19.1575 6.47906C19.3162 6.75624 19.333 7.09257 19.2026 7.38416C19.1481 7.50598 19.0511 7.62462 18.8569 7.86189C18.4899 8.31046 18.3064 8.53474 18.2488 8.72311C18.1088 9.18093 18.313 9.67375 18.7357 9.89849C18.9096 9.99096 19.198 10.0198 19.7747 10.0775C20.0798 10.108 20.2323 10.1232 20.3569 10.1709C20.6553 10.2849 20.8813 10.5345 20.965 10.8428C21 10.9715 21 11.1248 21 11.4314V12.5687C21 12.8752 21 13.0284 20.965 13.1571C20.8813 13.4654 20.6553 13.7152 20.3569 13.8292C20.2322 13.8768 20.0797 13.892 19.7748 13.9225C19.1983 13.9802 18.9101 14.009 18.7362 14.1014C18.3133 14.3261 18.1091 14.8191 18.2492 15.277C18.3068 15.4653 18.4902 15.6895 18.8571 16.1378C19.0511 16.375 19.1481 16.4936 19.2026 16.6153C19.333 16.907 19.3163 17.2434 19.1574 17.5206C19.0911 17.6364 18.9828 17.7447 18.7661 17.9614L18.7661 17.9614L17.9619 18.7656C17.7451 18.9824 17.6367 19.0908 17.521 19.1571C17.2438 19.3158 16.9074 19.3326 16.6158 19.2022C16.494 19.1478 16.3754 19.0507 16.1381 18.8566L16.1381 18.8566C15.6896 18.4896 15.4653 18.3061 15.2769 18.2485C14.8191 18.1085 14.3263 18.3126 14.1015 18.7354C14.0091 18.9093 13.9802 19.1977 13.9226 19.7745C13.892 20.0797 13.8768 20.2323 13.8291 20.357C13.7151 20.6553 13.4655 20.8812 13.1573 20.965C13.0285 21 12.8752 21 12.5685 21H11.4314C11.1248 21 10.9715 21 10.8428 20.965C10.5345 20.8813 10.2849 20.6553 10.1709 20.3569C10.1232 20.2323 10.108 20.0798 10.0775 19.7747C10.0198 19.198 9.99096 18.9096 9.89849 18.7357C9.67375 18.313 9.18094 18.1088 8.72312 18.2488C8.53475 18.3064 8.31046 18.4899 7.86188 18.857L7.86187 18.857L7.86186 18.857C7.62458 19.0511 7.50593 19.1482 7.38411 19.2027C7.09252 19.333 6.75621 19.3162 6.47903 19.1575C6.36323 19.0912 6.25484 18.9828 6.03805 18.766L5.23395 17.9619C5.01717 17.7451 4.90878 17.6367 4.84246 17.5209C4.68373 17.2438 4.66696 16.9074 4.79732 16.6159C4.85178 16.494 4.94885 16.3754 5.14299 16.1381L5.14299 16.1381C5.51 15.6895 5.69351 15.4653 5.75111 15.2769C5.89111 14.8191 5.68697 14.3262 5.26424 14.1015C5.09032 14.009 4.80198 13.9802 4.22529 13.9225C3.92024 13.892 3.76772 13.8768 3.64308 13.8291C3.3447 13.7151 3.11874 13.4655 3.03499 13.1572C3 13.0284 3 12.8752 3 12.5686V11.4315C3 11.1248 3 10.9715 3.03501 10.8427C3.11877 10.5345 3.34469 10.2849 3.64299 10.1709C3.76768 10.1232 3.92025 10.108 4.2254 10.0775H4.2254C4.80228 10.0198 5.09072 9.99093 5.2647 9.89841C5.68731 9.67366 5.89139 9.18095 5.75148 8.7232C5.69389 8.53476 5.51031 8.31039 5.14315 7.86164C4.94891 7.62423 4.85178 7.50552 4.79731 7.38364C4.66702 7.09211 4.68379 6.75589 4.84244 6.47877C4.90877 6.36291 5.01722 6.25446 5.2341 6.03758L6.03809 5.23359L6.03809 5.23359C6.25488 5.0168 6.36327 4.90841 6.47907 4.84209C6.75625 4.68337 7.09256 4.66659 7.38415 4.79695C7.50598 4.85141 7.62464 4.9485 7.86198 5.14269L7.86199 5.14269C8.31048 5.50964 8.53472 5.69312 8.72301 5.75072C9.18092 5.89081 9.67387 5.68662 9.8986 5.26377C9.99101 5.0899 10.0198 4.80166 10.0775 4.22518C10.108 3.92024 10.1232 3.76777 10.1708 3.64316C10.2848 3.34472 10.5346 3.1187 10.8429 3.03496C10.9716 3 11.1248 3 11.4313 3H12.5686C12.8752 3 13.0284 3 13.1572 3.03499C13.4655 3.11874 13.7151 3.3447 13.8291 3.64307C13.8768 3.76772 13.892 3.92024 13.9225 4.22528ZM12 15.6C13.9882 15.6 15.6 13.9882 15.6 12C15.6 10.0118 13.9882 8.4 12 8.4C10.0118 8.4 8.4 10.0118 8.4 12C8.4 13.9882 10.0118 15.6 12 15.6Z"
              fill="#36373C"
            />
          </svg>
        </Grid>
      </React.Fragment>
    );
  }

  // 마이페이지,
  if (props.shape === '마이페이지') {
    return (
      <React.Fragment>
        <Grid is_flex4="t" height="4.4rem" margin="0 auto" bg="#ffffff">
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
        <Grid is_flex4="t" height="4.4rem" margin="0 auto" bg="#ffffff">
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
        <Grid is_flex4="t" height="4.4rem" margin="0 auto" bg="#ffffff">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            cursor="pointer"
            onClick={() => {
              history.replace('/home');
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
        <Grid is_flex4="t" height="4.4rem" margin="0 auto" bg="#ffffff">
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
        <Grid is_flex4="t" height="4.4rem" margin="0 auto" bg="#ffffff">
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
        <Grid is_flex4="t" height="4.4rem" margin="0 auto" bg="#ffffff">
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
  // 검색페이지일때
  if (props.shape === '검색') {
    return (
      <React.Fragment>
        <Grid is_flex4="t" height="4.4rem" margin="0 auto" bg="#ffffff">
          <svg
            style={{
              fontSize: '1.9rem',
              position: 'absolute',
              marginLeft: '1.2rem',
              cursor: 'pointer',
            }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              // history.replace("/home");
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
        <Grid is_flex4="t" height="4.4rem" margin="0 auto" bg="#ffffff">
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
          <Text margin="auto" size="1.6rem" bold2="700">
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

export default Header;
