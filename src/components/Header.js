// 헤더 컴포넌트
import React from "react";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as searchActions } from "../redux/modules/search";
import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as locateActions } from "../redux/modules/loc";

// styles
import styled from "styled-components";
import { HiOutlineMenu } from "react-icons/hi";
import { Grid, Text, Image } from "../elements";
import theme from "../styles/theme";
import { customAlert } from "./Sweet";

// 이미지, 아이콘의 경우 webp 사용
// webp 사용 불가 환경일 경우만 png
import { png } from "../styles/img/index";
import { webp } from "../styles/img/webp/index";
import { isWebpSupported } from "react-image-webp/dist/utils";

// 헤더 props로는 page별 상위컴포넌트에서 내려받는 history, shape이 있음
const Header = (props) => {
  const { color, fontSize } = theme;
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  // shape 홈일때, 지도 api 추가 되면
  // 상위 컴포넌트에서 children 으로 주소 보여줄 수 있을 것 같음
  if (props.shape === "홈") {
    return (
      <Grid is_flex2="t" height="4.4rem" margin="0rem auto 0.8rem" bg="#ffffff">
        <Text
          margin="0 1rem 0 0"
          size={fontSize.small}
          bold2="700"
          cursor="t"
          _onClick={() => {
            if (!is_login) {
              return customAlert.sweetNeedLogin();
            }
            history.replace("/address");  // 주소 설정
          }}
        >
          {is_login ? props.children : "게스트 로그인"}
        </Text>
        <svg
          style={{ cursor: "pointer" }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            if (!is_login) {
              customAlert.sweetNeedLogin();
            }
            history.replace("/address");  // 주소 설정
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
    );
  }

  // 모집글 업로드페이지일때
  if (props.shape === "모임 만들기") {
    return (
      <GridTop>
        <Image
          size="2.4"
          margin="0 0 0 1.6rem"
          src={isWebpSupported() ? webp.deleteLogoWebp : png.deleteLogo}
          cursor="pointer"
          _onClick={() => {
            history.goBack();
          }}
        />
        <Text margin="auto" size="1.6rem" bold>
          모임 만들기
        </Text>
        <Grid width="2.4rem" margin="0 1.6rem 0 0"></Grid>
      </GridTop>
    );
  }

  // 상세페이지일때,
  if (props.shape === "상세페이지") {
    return (
      <GridTop>
        <Image
          size="2.4"
          margin="0 0 0 1.6rem"
          src={isWebpSupported() ? webp.arrowLeftWebp : png.arrowLeft}
          cursor="pointer"
          _onClick={() => {
            history.goBack();
          }}
        />
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
        <Grid width="2.4rem" margin="0 1.6rem 0 0"></Grid>
      </GridTop>
    );
  }

  // 나의 채팅 리스트,
  if (props.shape === "채팅리스트") {
    return (
      <GridTop>
        <Text margin="auto" size="1.6rem" bold2="700">
          채팅
        </Text>
      </GridTop>
    );
  }

  // 채팅방,
  if (props.shape === "채팅방") {
    return (
      <ChatGridTop>
        <Grid width="24px" margin="0 0 0 1.3rem" />
        <svg
          style={{
            fontSize: "1.9rem",
            position: "absolute",
            marginLeft: "1.2rem",
            cursor: "pointer",
            zIndex: 1,
          }}
          width="2.4rem"
          height="2.4rem"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            window.location.replace("/chatlist");
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
        <HiOutlineMenu  //채팅 사이드 바 아이콘
          size="2.4rem"
          color={color.bg100}
          style={{
            margin: "0rem 1.2rem 0 0",
            cursor: "pointer",
            zIndex: "1",
          }}
          onClick={props._onClick}
        />
      </ChatGridTop>
    );
  }

  // 마이페이지,
  if (props.shape === "마이페이지") {
    return (
      <GridTop>
        <Grid width="7rem" margin="0 0 0 1.3rem" />
        <Text margin="auto" size="1.6rem" bold2="700">
          마이페이지
        </Text>
        <Text
          width="fit-content"
          height="2rem"
          size="1.3rem"
          line_height="150%"
          text_align="center"
          color="#FF9425"
          bold2="500"
          margin="0 2rem 0 0"
          cursor="t"
          white_space="nowrap"
          _onClick={() => {
            history.push("/profile");
          }}
        >
          프로필 수정
        </Text>
      </GridTop>
    );
  }

  // 마이페이지 - 프로필 수정,
  if (props.shape === "프로필수정") {
    return (
      <GridTop>
        <Image
          size="2.4"
          margin="0 0 0 1.6rem"
          src={isWebpSupported() ? webp.arrowLeftWebp : png.arrowLeft}
          cursor="pointer"
          _onClick={() => {
            dispatch(imageActions.setPreview(null));
            history.replace("/mypage");
          }}
        />
        <Text margin="0 auto" size="1.6rem" bold2="700">
          프로필 수정
        </Text>
        <Grid width="2.4rem" margin="0 1.6rem 0 0"></Grid>
      </GridTop>
    );
  }

  // 타 유저가 보는 내 프로필
  if (props.shape === "프로필") {
    return (
      <GridTop>
        <Image
          size="2.4"
          margin="0 0 0 1.6rem"
          src={isWebpSupported() ? webp.arrowLeftWebp : png.arrowLeft}
          cursor="pointer"
          _onClick={() => {
            history.goBack();
          }}
        />
        <Text margin="0 auto" size="1.6rem" bold2="700">
          프로필
        </Text>
        <Grid width="2.4rem" margin="0 1.6rem 0 0"></Grid>
      </GridTop>
    );
  }

  // 마이페이지 - 앱 설정 - 로그아웃, 탈퇴 페이지
  if (props.shape === "설정") {
    return (
      <GridTop>
        <Image
          size="2.4"
          margin="0 0 0 1.6rem"
          src={isWebpSupported() ? webp.arrowLeftWebp : png.arrowLeft}
          cursor="pointer"
          _onClick={() => {
            history.replace("/mypage");
          }}
        />
        <Text margin="0 auto" size="1.6rem" bold2="700">
          설정
        </Text>
        <Grid width="2.4rem" margin="0 1.6rem 0 0"></Grid>
      </GridTop>
    );
  }

  // 마이페이지 - 내가 쓴 글
  if (props.shape === "내가쓴글") {
    return (
      <GridTop>
        <Image
          size="2.4"
          margin="0 0 0 1.6rem"
          src={isWebpSupported() ? webp.arrowLeftWebp : png.arrowLeft}
          cursor="pointer"
          _onClick={() => {
            history.replace("/mypage");
          }}
        />
        <Text margin="0 auto" size="1.6rem" bold2="700">
          내가 쓴 글
        </Text>
        <Grid width="2.4rem" margin="0 1.6rem 0 0"></Grid>
      </GridTop>
    );
  }

  // 마이페이지 - 내가 받은 리뷰
  if (props.shape === "내가받은리뷰") {
    return (
      <GridTop>
        <Image
          size="2.4"
          margin="0 0 0 1.6rem"
          src={isWebpSupported() ? webp.arrowLeftWebp : png.arrowLeft}
          cursor="pointer"
          _onClick={() => {
            history.replace("/mypage");
          }}
        />
        <Text margin="0 auto" size="1.6rem" bold2="700">
          내가 받은 리뷰
        </Text>
        <Grid width="2.4rem" margin="0 1.6rem 0 0"></Grid>
      </GridTop>
    );
  }

  // 유저 프로필 - 리뷰 남기기
  if (props.shape === "리뷰남기기") {
    return (
      <GridTop>
        <Image
          size="2.4"
          margin="0 0 0 1.6rem"
          src={isWebpSupported() ? webp.arrowLeftWebp : png.arrowLeft}
          cursor="pointer"
          _onClick={() => {
            history.goBack();
          }}
        />
        <Text margin="0 auto" size="1.6rem" bold2="700">
          리뷰 남기기
        </Text>
        <Grid width="2.4rem" margin="0 1.6rem 0 0"></Grid>
      </GridTop>
    );
  }

  // 검색페이지일때
  if (props.shape === "검색") {
    return (
      <GridTop>
        <Image
          size="2.4"
          margin="0 0 0 1.6rem"
          src={isWebpSupported() ? webp.arrowLeftWebp : png.arrowLeft}
          cursor="pointer"
          _onClick={() => {
            history.push("/home");
            dispatch(searchActions.food_check(false));
          }}
        />

        <Text margin="auto" size="1.6rem" bold2="700">
          {props.children}
        </Text>
        <Grid width="2.4rem" margin="0 1.6rem 0 0"></Grid>
      </GridTop>
    );
  }

  // 주소 입력페이지일때
  if (props.shape === "주소입력") {
    return (
      <GridTop>
        <Grid width="2.4rem" margin="0 1.6rem 0 0"></Grid>
        <Text margin="auto" size="1.6rem" bold>
          {props.children}
        </Text>
        <Image
          size="2.4"
          margin="0 1rem 0 0"
          src={isWebpSupported() ? webp.deleteLogoWebp : png.deleteLogo}
          cursor="pointer"
          _onClick={() => {
            if (props?.is_home) {
              return history.replace("/home");
            }
            props?.close();
          }}
        />
      </GridTop>
    );
  }
  return (
    <React.Fragment>
      <Grid is_flex4="t" height="4.4rem" margin="0 auto 0.8rem">
        <span
          className="material-icons-outlined"
          style={{
            fontSize: "1.9rem",
            position: "absolute",
            marginLeft: "1.2rem",
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
  shape: "홈",
  children: null,
  _onClick: () => {},
};

const GridTop = styled.div`
  // pc 환경 뷰
  @media (min-width: 415px) {
    max-width: 35.6rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
  // 모바일 환경 뷰
  width: 100%;
  display: flex;
  align-items: center;
  height: 4.4rem;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  text-align: right;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;

const ChatGridTop = styled.div`
  // 채팅방 안 pc 환경 뷰
  @media (min-width: 415px) {
    border-style: solid;
    border-width: 0 1px;
    border-color: #cfcfcf;
    max-width: 36rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
  // 모바일 환경 뷰
  width: 100%;
  display: flex;
  align-items: center;
  height: 4.4rem;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  text-align: right;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;

export default Header;
