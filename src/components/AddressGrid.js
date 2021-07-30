// RoadAddress.js의 DaumPostCode 컴포넌트를 감싸줄 컴포넌트
import React from "react";

import { Header } from "../components";

// style
import { Grid } from "../elements";
import theme from "../styles/theme";

const AddressGrid = (props) => {
  const { border } = theme;

  return (
    <React.Fragment>
      <Grid
        minWidth="36rem"
        maxWidth="36rem"
        margin="0 auto"
        border={border.line1}
      >
        <Grid shape="container">
          <Header {...props} shape="주소입력">주소 입력</Header>
        </Grid>
        {props.children}
      </Grid>
    </React.Fragment>
  );
};

export default AddressGrid;
