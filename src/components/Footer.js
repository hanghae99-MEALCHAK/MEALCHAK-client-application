import React from 'react';

import { Grid, Text, Image } from '../elements';

const Footer = () => {
  return (
    <React.Fragment>
      <Grid is_flex shadow height="9.3rem">
        <Grid is_flex_column margin="0.9rem 0px 0px 0px">
          <Image shape="circleBtn" size="5.358" cursor></Image>
          <Text>피드</Text>
        </Grid>
        <Grid is_flex_column margin="0.9rem 0px 0px 0px">
          <Image shape="circleBtn" size="5.358" cursor></Image>
          <Text>글쓰기</Text>
        </Grid>
        <Grid is_flex_column margin="0.9rem 0px 0px 0px">
          <Image shape="circleBtn" size="5.358" cursor></Image>
          <Text>채팅</Text>
        </Grid>
        <Grid is_flex_column margin="0.9rem 0px 0px 0px">
          <Image shape="circleBtn" size="5.358" cursor></Image>
          <Text>마이페이지</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Footer.defaultProps = {};

export default Footer;
