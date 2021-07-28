import React from "react";
import { Grid, Text, Input } from "../elements";
import { useState } from "react";
import styled from "styled-components";
import logger from "../shared/Console";

const UploadContents = (props) => {
  const [post_info, setPostInfo] = useState({
    title: "",
    contents: "",
  });

  return (
    <React.Fragment>
      <Container>
        <Grid padding="0 2rem">
          <Input
            type="text"
            border="none"
            placeholder="메뉴를 포함해서 제목을 작성해보세요!"
            length={20}
            size="1.6rem"
            color="#B7B7B7"
            bold="400"
            value={post_info.title}
            _onChange={(e) => {
              setPostInfo({ ...post_info, title: e.target.value });
              props.onChange({ title: e.target.value });
            }}
          ></Input>
        </Grid>
        <Grid borderBottom="1px solid #CFCFCF"></Grid>
        <Grid padding="0 2rem">
          <Input
            bold="400"
            border="none"
            size="1.6rem"
            placeholder="어떤 음식을 함께 즐기고 싶으신가요?"
            multiLine="t"
            length="300"
            color="#B7B7B7"
            value={post_info.contents}
            _onChange={(e) => {
              setPostInfo({ ...post_info, contents: e.target.value });
              props.onChange({ contents: e.target.value });
            }}
          ></Input>
          <Text text_align="right" color="#C7C8CE" margin="0 auto 2rem">
            0/300
          </Text>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default UploadContents;
