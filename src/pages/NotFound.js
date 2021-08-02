import React from "react";
import { Button, Grid, Text } from "../elements";
import { history } from "../redux/configureStore";

const NotFound = (props) => {
  return (
    <React.Fragment>
      <Grid minWidth="36rem" maxWidth="36rem" height="10rem" margin="0 auto">
        <Text margin="0 1rem 0 0" size="1.6rem" bold2="700" cursor="t">
          주소가 올바르지 않습니다. 다시 한 번 확인해주세요.
        </Text>
        <Button
          _onClick={() => {
            history.replace("/home");
          }}
        >
          홈으로 이동
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default NotFound;
