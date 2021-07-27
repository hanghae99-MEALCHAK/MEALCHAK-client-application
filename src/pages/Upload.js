import React from "react";
import styled from "styled-components";

// style
import { Button, Grid, Text, Input } from "../elements";

const Upload = (props) => {
  return (
    <Grid maxWidth="36rem" border="1px solid black" margin="0 auto">
      <Container>
        <Text>Header</Text>
        <Grid is_flex4="t" height="4.4rem">
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
            {" "}
            글쓰기
          </Text>
        </Grid>
        <Grid padding="0 2rem">
          <Container>
            <Grid borderBottom="1px solid #F1F2F4">
              <Input 
              type='text'
              border="none"
              placeholder='제목을 입력해주세요.'
              maxLength='20'
              ></Input>
            </Grid>
            <Grid borderBottom="1px solid #F1F2F4">
              <Input
              border="none"
              placeholder='배달할 음식을 포함한 모집글을 작성해주세요 :)'
              multiLine='t'
              ></Input>
            </Grid>
          </Container>
        </Grid>
      </Container>
    </Grid>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Upload;
