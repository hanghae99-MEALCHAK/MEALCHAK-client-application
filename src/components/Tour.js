// 첫 회원가입 이후 주소 설정 가이드 컴포넌트
import React from "react";
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";

// style
import styled from "styled-components";
import { Grid, Text } from "../elements";
import theme from "../styles/theme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Tour = (props) => {
  const { color, fontSize } = theme;
  // inline css 미디어쿼리
  const media = useMediaQuery("(min-width: 415px)"); 
  // 가이드 필요 여부 판단
  // 가입 이후 주소 설정을 하지 않은 사용자의 경우 is_mask로 가이드 기능 제공
  const is_mask = useSelector((state) => state.image.is_mask);

  return (
    <Mask is_mask={is_mask}>
      <Grid
        is_flex2="t"
        height="4.4rem"
        maxWidth={media ? "36rem" : "100%"}
        margin="0 auto"
        bg="#ffffff"
      >
        <Text
          margin="0 1rem 0 0"
          size={fontSize.small}
          bold2="700"
          cursor="t"
          _onClick={() => {
            history.replace("/address");
          }}
        >
          여기를 클릭해서 주소를 설정하세요!
        </Text>
        <svg
          style={{ cursor: "pointer" }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            history.replace("/address");
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
      <GuideBubble />
      <Grid
        is_flex4="t"
        justify_content="center"
        height="fit-content"
        margin="0"
      >
        <Grid
          bg={color.brand100}
          width="fit-content"
          height="fit-content"
          padding="0.5rem 1rem"
          radius="0.8rem"
        >
          <Text color={color.bg0} size={fontSize.small} bold2="500">
            주소 설정 시 주변 모집글이 나타나요.
          </Text>
        </Grid>
      </Grid>
    </Mask>
  );
};

const Mask = styled.div`
  display: ${(props) => (props.is_mask ? "" : "none")};
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 101;
`;

// 가이드 말풍선
const GuideBubble = styled.div`
  display: flex;
  justify-content: center;
  height: fit-content;

  &::after {
    top: 0rem;
    border: solid transparent;
    content: "";
    width: 0;
    height: 0;
    position: relative;
    pointer-events: none;
    border-color: transparent transparent ${theme.color.brand100} transparent;
    border-width: 1rem 0.8rem;
    margin-left: 0rem;
  }
`;

export default Tour;
