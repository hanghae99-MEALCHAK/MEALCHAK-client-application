// 게시글 작성 및 수정 시 지도에서 키워드로 식당 찾기
import React from "react";

import { AddressGrid, MapContainer } from ".";
import { Grid, Image } from "../elements";

// 이미지
import { png } from "../styles/img/index";
import { webp } from "../styles/img/webp/index";
import { isWebpSupported } from "react-image-webp/dist/utils";

const ShopAddress = (props) => {

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

  // setPlace로 place값 지정하고 MapContainer 컴포넌트로 넘겨줌
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
  };

  // 검색 - 식당 설정 후 지도 초기화
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
            width="fit-content"
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
