/*global kakao */
import React from "react";
import DaumPostCode from "react-daum-postcode";
import { customAlert } from "./Sweet";
import { AddressGrid } from ".";

import { Grid, Input } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as locateActions } from "../redux/modules/loc";
import logger from "../shared/Console";

const ShopAddress = (props) => {
  
  return (
    <React.Fragment>
      <AddressGrid is_shop close={props?.close}>
        <Grid className="map_wrap">
          <Grid id="map" absolute="relative" overflow="hidden" />
          <Grid id="menu_wrap" className="bg_white">
            <Grid className="option">
              <Grid>
                <input type="text" value="이태원 맛집" id="keyword" size="15" />
                <button type="submit">검색하기</button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AddressGrid>
    </React.Fragment>
  );
};

export default ShopAddress;
