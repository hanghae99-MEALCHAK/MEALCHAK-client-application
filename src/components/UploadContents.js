// 모임 만들기 상단 텍스트 인풋 모음 컨포넌트
import React from "react";
import { useState } from "react";
import logger from "../shared/Console";

// style
import { Grid, Input } from "../elements";
import styled from "styled-components";
import theme from "../styles/theme";
import { customAlert } from "./Sweet";

// props로 받은 onChange로 현재 컴포넌트의 변경 state를 상위 컴포넌트로 올려줌
const UploadContents = React.memo((props) => {
  const { color, border, fontSize } = theme;

  // 상위 업로드 페이지에서 post 정보가 있는 경우는 수정 상황이므로 초기값 설정
  // disabled 목적은 제한 글자수가 넘어가면 버튼 활성화 막기입니다.
  const [post_info, setPostInfo] = useState(
    props.post_info.title !== {}
      ? {
          title: props.post_info.title,
          contents: props.post_info.contents,
          disabled: false,
        }
      : {
          title: "",
          contents: "",
          disabled: false,
        }
  );

  return (
    <React.Fragment>
      <Container>
        <FocusWithinTitle>
          <Grid borderBottom={border.line2}>
            <Input
              padding="1.6rem 2rem"
              type="text"
              border="none"
              placeholder="메뉴를 포함해서 제목을 작성해보세요!"
              length={20}
              size={fontSize.base}
              color={color.bg80}
              bold="400"
              value={post_info.title}
              _onChange={(e) => {
                setPostInfo({ ...post_info, title: e.target.value });
                // 하위 컴포넌트에서 바뀐 현재 정보를 상위 컴포넌트로 올려줌
                props.onChange({ title: e.target.value });
              }}
              radius=""
            ></Input>
          </Grid>
        </FocusWithinTitle>
        <Grid padding="0 2rem">
          <Input
            rows="11"
            bold="400"
            border="none"
            size={fontSize.base}
            placeholder="어떤 음식을 함께 즐기고 싶으신가요?"
            multiLine="t"
            length="256"
            color={color.bg80}
            value={post_info.contents}
            _onChange={(e) => {
              if (e.target.value.length >= 256) {
                logger("초과!!");
                return customAlert
                  .sweetOK(
                    "입력 가능한 글자수를 초과했어요",
                    "모집글 작성 시 255자 이내로 작성해주세요."
                  )
                  .then(() => {
                    setPostInfo({
                      ...post_info,
                      disabled: true,
                    });
                    return props.onChange({ disabled: true });
                  });
              }
              logger("안전 :)");
              setPostInfo({
                ...post_info,
                contents: e.target.value,
                disabled: false,
              });
              props.onChange({ contents: e.target.value, disabled: false });
            }}
          ></Input>
        </Grid>
      </Container>
    </React.Fragment>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 0.1rem solid ${theme.color.bg40};
`;

const FocusWithinTitle = styled.div`
  &:focus-within div {
    border-bottom: 1px solid #ff9425;
    outline: none;
  }
`;

export default UploadContents;
