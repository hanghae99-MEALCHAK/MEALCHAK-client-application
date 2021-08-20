import React from "react";
import styled from "styled-components";
import { Button, Grid, Text } from "../elements";
import { history } from "../redux/configureStore";
import theme from "../styles/theme";

import { frontError } from "../styles/img";

const NotFound = (props) => {
  const { color, fontSize, radius } = theme;

  return (
    <React.Fragment>
      <Grid margin="12.9rem auto">
        <NotFoundImg />
        <Text
          width="100%"
          height="2.4rem"
          margin="1.6rem 0"
          bold2="400"
          size={fontSize.base}
          line_height="150%"
          text_align="center"
          color={color.bg80}
        >
          앗! 에러가 발생했어요.
        </Text>
        <Button
          display="block"
          width="15.2rem"
          height="5rem"
          radius={radius.button}
          bg={color.brand100}
          border="none"
          margin="0 auto"
          cursor="t"
          _onClick={() => {
            history.replace("/home");
          }}
        >
          <Text
            bold
            size={fontSize.base}
            line_height="150%"
            text_align="center"
            color={color.bg0}
          >
            밀착 홈으로 이동
          </Text>
        </Button>
      </Grid>
    </React.Fragment>
  );
};

const NotFoundImg = styled.div`
  width: 21.8rem;
  height: 27.7rem;
  background-image: url(${frontError});
  background-position: center;
  background-size: cover;
  margin: 0 auto;
`;
export default NotFound;
