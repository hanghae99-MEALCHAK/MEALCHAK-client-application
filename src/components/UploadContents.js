import React from "react";
import { Grid, Input } from "../elements";
import { useState } from "react";
import styled from "styled-components";
import theme from "../styles/theme";
import logger from "../shared/Console";
import { customAlert } from "./Sweet";

const UploadContents = React.memo((props) => {
  const { color, border, fontSize } = theme;

  React.useEffect(() => {
    logger("uploadinput 페이지", props);
  }, []);

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
                props.onChange({ title: e.target.value });
              }}
              radius=""
            ></Input>
          </Grid>
        </FocusWithinTitle>
        <Grid padding="0 2rem">
          <Input
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
`;

const FocusWithinTitle = styled.div`
  /* &:focus-within p {
    color: #ff9425;
  } */
  &:focus-within div {
    border-bottom: 1px solid #ff9425;
    outline: none;
  }
`;

export default UploadContents;
