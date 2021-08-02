import React from 'react';
import { Grid, Input } from '../elements';
import { useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import logger from '../shared/Console';

const UploadContents = React.memo((props) => {
  const { color, border, fontSize } = theme;

  React.useEffect(() => {
    logger('uploadinput 페이지', props);
  }, []);

  const [post_info, setPostInfo] = useState(
    props.post_info !== {}
      ? {
          title: props.post_info.title,
          contents: props.post_info.contents,
        }
      : {
          title: '',
          contents: '',
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
              length={25}
              size={fontSize.base}
              color={color.bg60}
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
            length="300"
            color={color.bg60}
            value={post_info.contents}
            _onChange={(e) => {
              setPostInfo({ ...post_info, contents: e.target.value });
              props.onChange({ contents: e.target.value });
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
