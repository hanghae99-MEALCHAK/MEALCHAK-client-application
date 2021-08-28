/*global kakao */
import React from "react";
import DaumPostCode from "react-daum-postcode";
import { customAlert } from "./Sweet";
import { AddressGrid, MapContainer } from ".";

import { Grid, Input, Button, Image, Text } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as locateActions } from "../redux/modules/loc";
import logger from "../shared/Console";

import theme from "../styles/theme";
// 이미지
import { png } from "../styles/img/index";
import { webp } from "../styles/img/webp/index";
import { isWebpSupported } from "react-image-webp/dist/utils";

const ShopAddress = (props) => {
  const { border, fontSize, btn_border, color } = theme;

  const [inputText, setInputText] = React.useState("");
  const [place, setPlace] = React.useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
  };

  const placeNull = () => {
    setInputText("");
    setPlace("");
  };

  return (
    <React.Fragment>
      <AddressGrid is_shop close={props?.close}>
        <Grid
          is_flex2
          bg="#fff"
          padding="1.8rem 2rem 1.6rem 2rem"
          margin="0 0 0 0.1rem"
        >
          <Grid
            width="48.8rem"
            height="5rem"
            radius="1.2rem"
            border="0.1rem solid #EBE9E9"
            padding="1rem"
            bg="#FFFFFF"
            is_flex2
          >
            <input
              type="text"
              id="keyword"
              placeholder="식당 + 지역으로 검색 돼요."
              value={inputText}
              onChange={onChange}
              onKeyPress={onKeyPress}
              style={{
                border: "none",
                fontSize: "1.6rem",
                width: "27rem",
                height: "5rem",
                background: "none",
                outline: "none",
              }}
            />
            <Image
              size="2.4"
              src={isWebpSupported() ? webp.searchWebp : png.search}
              margin="0 0 0.4rem"
              _onClick={handleSubmit}
            />
          </Grid>
        </Grid>
        <MapContainer
          searchPlace={place}
          close={props?.close}
          placeNull={placeNull}
        />
      </AddressGrid>
    </React.Fragment>
  );
};

export default ShopAddress;
