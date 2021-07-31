import React, { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import { AddressGrid } from "../components";

import { useDispatch } from "react-redux";
import { actionCreators as locateActions } from "../redux/modules/loc";
import logger from "../shared/Console";

const PostAddress = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = React.useState("");

  // Header의 주소 입력과 게시글 주소 입력 구분
  const is_post = true;

  // 주소 검색 후 클릭 시 실행되는 함수(fullname은 추후에 활용 예정)
  // 도로명주소를 게시글에 보여줄 예정
  const handleComplete = (data) => {
    logger("RoadAddress:16: ",data)
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R" && data.userSelectedType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
        extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";

      setAddress(data.RoadAddress);
    } else if (data.userSelectedType === "J") {
      setAddress(data.jibunAddress);
    }
  };

  // React.useEffect(() => {
  //   dispatch(locateActions.getMyPostCoordAX(address));
  // },[dispatch, address]);

  return (
    <AddressGrid is_post={is_post}>
      <DaumPostCode onComplete={handleComplete} className="post-code" style={{height:"52.2rem"}} />
    </AddressGrid>
  );
};
export default PostAddress;
