// pages - RoadAddress.js의 DaumPostCode 컴포넌트를 감싸줄 컴포넌트
import React from "react";
import { Header } from "../components";

// style
import styled from "styled-components";
import { Grid } from "../elements";

const AddressGrid = (props) => {
  return (
    <GridTop is_home={props.is_home} is_post={props.is_post}>
      <Grid>
        <Grid shape="container">
          {props.is_post ? (
            <Header {...props} shape="주소입력" close={props?.close}>
              만날 장소
            </Header>
          ) : props.is_shop ? (
            <Header {...props} shape="주소입력" close={props?.close}>
              배달 예정 식당
            </Header>
          ) : (
            <Header {...props} shape="주소입력" close={props?.close}>
              주소 입력
            </Header>
          )}
          <Grid height="4.4rem" />
          <Grid width="99.5%">{props.children}</Grid>
        </Grid>
      </Grid>
    </GridTop>
  );
};

const GridTop = styled.div`
  // pc 환경 뷰
  @media (min-width: 415px) {
    min-height: ${(props) => (props.is_home ? "100vh" : "")};
    max-width: "36rem";
    width: ${(props) => (props.is_home ? "36rem" : "")};
    ${(props) => (props.is_post ? `transform: translateX(0.1rem)` : "")};
  }
  // 모바일 환경 뷰
  width: 100%;
`;

export default AddressGrid;
