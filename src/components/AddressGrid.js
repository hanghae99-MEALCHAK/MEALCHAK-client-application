// RoadAddress.js의 DaumPostCode 컴포넌트를 감싸줄 컴포넌트
import React from 'react';

import { Header } from '../components';

// style
import { Grid } from '../elements';
import theme from '../styles/theme';

const AddressGrid = (props) => {
  const { border } = theme;
  console.log(props);
  return (
    <React.Fragment>
      <Grid
        minHeight={props.is_home ? '100vh' : ''}
        minHeight={props.is_home ? "100vh" : ""}
        minWidth={props.is_post ? '32rem' : '36rem'}
        maxWidth={props.is_post ? '32rem' : '36rem'}
        width={props.is_home ? '36rem' : ''}
        margin="0 auto"
        border={border.line1}
      >
        <Grid shape="container">
          {props.is_post ? (
            <Header {...props} shape="주소입력" close={props?.close}>
              배달 주소 입력
            </Header>
          ) : (
            <Header {...props} shape="주소입력" close={props?.close}>
              주소 입력
            </Header>
          )}
        </Grid>
        {props.children}
      </Grid>
    </React.Fragment>
  );
};

export default AddressGrid;
