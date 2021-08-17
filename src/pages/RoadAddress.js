import React, { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import { AddressGrid, PcSide } from "../components";

import { useDispatch } from "react-redux";
import { actionCreators as locateActions } from "../redux/modules/loc";
import logger from "../shared/Console";

const RoadAddress = (props) => {
  const dispatch = useDispatch();
  const [address, setAddress] = React.useState("");
  const is_home = true;
  // 주소 검색 후 클릭 시 실행되는 함수(fullname은 추후에 활용 예정)
  // 고객의 선택에 따라 도로명주소, 지번 주소를 메인 화면 최상단 헤더에서 보여줄 예정
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

      setAddress(data.roadAddress);
    } else if (data.userSelectedType === "J") {
      setAddress(data.jibunAddress);
    }
    logger("RoadAddress:32: ",address)
  };
  logger("RoadAddress:34: ",address)

  React.useEffect(() => {
    if(address === ""){
      return null;
    }
    dispatch(locateActions.getMyCoordinateAX(address));
  },[dispatch, address]);

  return (
    <AddressGrid is_home={is_home}>
       <PcSide {...props}/>
      <DaumPostCode onComplete={handleComplete} className="post-code" style={{height:"90vh"}} />
    </AddressGrid>
  );
};
export default RoadAddress;
