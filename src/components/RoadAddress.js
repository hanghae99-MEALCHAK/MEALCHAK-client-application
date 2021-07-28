import React, { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import { useDispatch } from "react-redux";
import { actionCreators as locateActions } from "../redux/modules/loc";

const RoadAddress = ({}) => {
  const dispatch = useDispatch();
  const [address, setAddress] = React.useState("");

  const handleComplete = (data) => {
    console.log(data);
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R" && data.userSelectedType === 'R') {
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
  };
  console.log(address);
  React.useEffect(() => {
    dispatch(locateActions.getMyCoordinateAX(address));
  });
  return <DaumPostCode onComplete={handleComplete} className="post-code" />;
};
export default RoadAddress;
