import React from "react";

// style
import styled from "styled-components";
import { Grid, Input, Button } from "../elements";
import theme from "../styles/theme";

const MessageWrite = (props) => {
  const { color, border } = theme;
  return (
    <React.Fragment>
      <Grid
        height="auto"
        maxWidth="36rem"
        // margin="0 auto 0 -0.1rem"
        padding="1rem"
        is_fixed="t"
        bg={color.bg0}
        shadow="t"
      >
        <Grid is_flex4="t" border={border.bg20}>
            <Input></Input>
            <Button></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default MessageWrite;
