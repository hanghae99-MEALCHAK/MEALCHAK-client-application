import React from 'react';
import styled from 'styled-components';

import { Grid, Text, Image } from '../elements';

const Header = () => {
  return (
    <React.Fragment>
      <Grid bg="#E1E6E8">
        <Grid is_flex_column margin="0.9rem 0px 0px 0px">
          <Search>
            <SearchInnerTxt>피드</SearchInnerTxt>
            <SearchInner></SearchInner>
          </Search>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

const Search = styled.a`
  border-bottom: 1px solid #c4d2e7;
  height: 24px;
  position: relative;
  width: 100%;
  display: inline-block;
`;

const SearchInner = styled.span`
  background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/vrr3rrLnK-r.png');
  background-size: 31px 1096px;
  background-repeat: no-repeat;
  background-position: 0 -485px;
  display: inline-block;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const SearchInnerTxt = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 2.86rem;
  font-weight: 700;
  transform: translate(-50%, -50%);
`;

export default Header;
