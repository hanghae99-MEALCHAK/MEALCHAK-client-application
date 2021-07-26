import React from "react";

// kakao login
import { Kakao_auth_url } from "../shared/OAuth";

// style
import { Button, Grid, Text } from "../elements";

const Tutorial = (props) => {

  return (
    <React.Fragment>
      <Grid width="12rem">
        <Button
          _onClick={() => {
            window.location.href = `${Kakao_auth_url}`;
          }}
        >
          <Text margin="0" size="1.6rem">
            kakao 로그인
          </Text>
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Tutorial;
