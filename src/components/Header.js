import React from "react";
import styled from "styled-components";
import logger from "../shared/Console";
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";

import { Grid, Text, Image } from "../elements";

const Header = (props) => {
  const is_login = useSelector((state) => state.user.is_login);

  React.useEffect(() => {
    // 헤더 props로는 page별 상위컴포넌트에서 내려받는 history, shape이 있음
    logger("헤더 props", props);
  }, []);

  // shape 홈일때, 지도 api 추가 되면
  // 상위 컴포넌트에서 children 으로 주소 보여줄 수 있을 것 같음
  if (props.shape === "홈") {
    return (
      <React.Fragment>
        <Grid
          is_flex2="t"
          height="4.4rem"
          margin="0.8rem auto 0.8rem"
          bg="#ffffff"
        >
          {/* <Grid width="24px" margin="0 0 0 1.3rem" /> */}
          <Text
            margin="0 1rem 0 0"
            size="1.6rem"
            bold2="700"
            _onClick={() => {
              if (!is_login) {
                window.alert("로그인이 필요한 기능입니다.\n로그인을 해주세요.");
                return history.push("/");
              }
              history.replace("/address");
            }}
          >
            {is_login ? props.children : "주소 default값"}
          </Text>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7L10 13L16 7"
              stroke="#36373C"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          {/* <svg
            style={{ marginRight: "1.3rem", cursor: "pointer" }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              history.push("/search");
            }}
          >
            <circle cx="11" cy="11" r="6" stroke="#36373C" strokeWidth="2" />
            <path
              d="M16 16C17.1716 17.1716 19 19 19 19"
              stroke="#36373C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg> */}
        </Grid>
      </React.Fragment>
    );
  }

  // 모집글 업로드페이지일때
  if (props.shape === "글쓰기") {
    return (
      <React.Fragment>
        <Grid is_flex4="t" height="4.4rem" margin="0 auto 0.8rem" bg="#ffffff">
          <span
            className="material-icons-outlined"
            style={{
              fontSize: "1.9rem",
              position: "absolute",
              marginLeft: "1.2rem",
              cursor: "pointer",
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
        </Grid>
      </React.Fragment>
    );
  }

  // 상세페이지일때,
  if (props.shape === "상세페이지") {
    return (
      <React.Fragment>
        <Grid is_flex4="t" height="4.4rem" margin="0 auto 0.8rem" bg="#ffffff">
          <svg
            style={{
              position: "absolute",
              marginLeft: "1.6rem",
              cursor: "pointer",
            }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              history.replace("/home");
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

  // 마이페이지,
  if (props.shape === "마이페이지") {
    return (
      <React.Fragment>
        <Grid width="36rem" margin="0 auto">
          <Text margin="auto" size="1.6rem" bold2="700">
            {props.children}
          </Text>
          <svg
            width="36rem"
            height="44"
            viewBox="0 0 360 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="360" height="44" fill="white" margin="0 auto" />
            <path
              d="M155.747 21.936H157.891V20.192H155.747V14.656H153.635V29.376H155.747V21.936ZM151.699 16.032H144.659V25.792H151.699V16.032ZM149.619 24.128H146.739V17.696H149.619V24.128ZM170.978 29.408V14.624H168.866V29.408H170.978ZM163.058 15.664C162.503 15.664 161.986 15.7867 161.506 16.032C161.037 16.2773 160.631 16.6293 160.29 17.088C159.949 17.536 159.677 18.0853 159.474 18.736C159.282 19.376 159.186 20.1013 159.186 20.912C159.186 21.7227 159.282 22.4533 159.474 23.104C159.677 23.7547 159.949 24.3093 160.29 24.768C160.631 25.2267 161.037 25.5787 161.506 25.824C161.986 26.0693 162.503 26.192 163.058 26.192C163.613 26.192 164.125 26.0693 164.594 25.824C165.074 25.5787 165.485 25.2267 165.826 24.768C166.167 24.3093 166.434 23.7547 166.626 23.104C166.829 22.4533 166.93 21.7227 166.93 20.912C166.93 20.1013 166.829 19.376 166.626 18.736C166.434 18.0853 166.167 17.536 165.826 17.088C165.485 16.6293 165.074 16.2773 164.594 16.032C164.125 15.7867 163.613 15.664 163.058 15.664ZM163.058 17.568C163.602 17.568 164.045 17.8507 164.386 18.416C164.727 18.9813 164.898 19.8133 164.898 20.912C164.898 22.0107 164.727 22.848 164.386 23.424C164.045 23.9893 163.602 24.272 163.058 24.272C162.514 24.272 162.071 23.9893 161.73 23.424C161.389 22.848 161.218 22.0107 161.218 20.912C161.218 19.8133 161.389 18.9813 161.73 18.416C162.071 17.8507 162.514 17.568 163.058 17.568ZM186.113 29.392V14.64H184.113V29.392H186.113ZM183.153 14.944H181.185V20.016H179.777V21.856H181.185V28.704H183.153V14.944ZM179.201 24.096V17.984H180.145V16.304H173.441V17.984H174.337V24.32H173.185L173.409 26.032C173.867 26.032 174.385 26.0267 174.961 26.016C175.547 26.0053 176.155 25.984 176.785 25.952C177.414 25.92 178.043 25.8667 178.673 25.792C179.313 25.7173 179.921 25.616 180.497 25.488L180.353 23.968C180.171 23.9893 179.985 24.0107 179.793 24.032C179.601 24.0533 179.403 24.0747 179.201 24.096ZM176.225 24.272V17.984H177.313V24.224C176.961 24.256 176.598 24.272 176.225 24.272ZM200.095 29.408V14.624H197.983V29.408H200.095ZM192.175 15.664C191.621 15.664 191.103 15.7867 190.623 16.032C190.154 16.2773 189.749 16.6293 189.407 17.088C189.066 17.536 188.794 18.0853 188.591 18.736C188.399 19.376 188.303 20.1013 188.303 20.912C188.303 21.7227 188.399 22.4533 188.591 23.104C188.794 23.7547 189.066 24.3093 189.407 24.768C189.749 25.2267 190.154 25.5787 190.623 25.824C191.103 26.0693 191.621 26.192 192.175 26.192C192.73 26.192 193.242 26.0693 193.711 25.824C194.191 25.5787 194.602 25.2267 194.943 24.768C195.285 24.3093 195.551 23.7547 195.743 23.104C195.946 22.4533 196.047 21.7227 196.047 20.912C196.047 20.1013 195.946 19.376 195.743 18.736C195.551 18.0853 195.285 17.536 194.943 17.088C194.602 16.6293 194.191 16.2773 193.711 16.032C193.242 15.7867 192.73 15.664 192.175 15.664ZM192.175 17.568C192.719 17.568 193.162 17.8507 193.503 18.416C193.845 18.9813 194.015 19.8133 194.015 20.912C194.015 22.0107 193.845 22.848 193.503 23.424C193.162 23.9893 192.719 24.272 192.175 24.272C191.631 24.272 191.189 23.9893 190.847 23.424C190.506 22.848 190.335 22.0107 190.335 20.912C190.335 19.8133 190.506 18.9813 190.847 18.416C191.189 17.8507 191.631 17.568 192.175 17.568ZM214.654 29.376V14.64H212.542V29.376H214.654ZM208.142 18.608V17.792H211.182V16.048H202.926V17.792H205.998V18.608C205.998 19.2373 205.923 19.872 205.774 20.512C205.625 21.1413 205.395 21.7387 205.086 22.304C204.787 22.8587 204.409 23.3653 203.95 23.824C203.491 24.2827 202.953 24.6507 202.334 24.928L203.534 26.608C204.398 26.2133 205.123 25.6373 205.71 24.88C206.307 24.1227 206.771 23.2587 207.102 22.288C207.433 23.1947 207.886 23.9893 208.462 24.672C209.049 25.344 209.774 25.8667 210.638 26.24L211.79 24.576C211.171 24.32 210.633 23.9787 210.174 23.552C209.726 23.1253 209.347 22.6453 209.038 22.112C208.739 21.5787 208.515 21.0133 208.366 20.416C208.217 19.808 208.142 19.2053 208.142 18.608Z"
              fill="#36373C"
            />
          </svg>
        </Grid>
      </React.Fragment>
    );
  }

  // 검색페이지일때
  if (props.shape === "검색") {
    return (
      <React.Fragment>
        <Grid is_flex4="t" height="4.4rem" margin="0 auto 0.8rem" bg="#ffffff">
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
              history.replace("/home");
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
  if (props.shape === "주소입력") {
    return (
      <React.Fragment>
        <Grid is_flex4="t" height="4.4rem" margin="0.8rem auto 0.8rem" bg="#ffffff">
          <span
            className="material-icons-outlined"
            style={{
              fontSize: "1.9rem",
              position: "absolute",
              marginLeft: "1.2rem",
              cursor: "pointer",
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

export default Header;
