import React from "react";
import styled from "styled-components";
import logger from "../shared/Console";
import { history } from "../redux/configureStore";

import { Grid, Text, Image } from "../elements";

const Header = (props) => {

  React.useEffect(() => {
    // 헤더 props로는 page별 상위컴포넌트에서 내려받는 history, shape이 있음
    logger("헤더 props", props);
  }, []);

  // shape 홈일때, 지도 api 추가 되면
  // 상위 컴포넌트에서 children 으로 주소 보여줄 수 있을 것 같음
  if (props.shape === "홈") {
    return (
      <React.Fragment>
        <Grid is_flex4="t" height="4.4rem" margin="0 auto 0.8rem" bg="#ffffff">
          <Grid width="24px" margin="0 0 0 1.3rem" />
          <Text margin="auto" size="1.6rem" bold2="700">
            {props.children}
          </Text>
          <svg
            style={{ marginRight: "1.3rem", cursor: "pointer" }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              window.alert("검색으로 이동");
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
          </svg>
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
          style={{ position: "absolute", marginLeft: "1.6rem", cursor: "pointer" }}
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
