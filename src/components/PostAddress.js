// 게시글 작성 및 수정 시 주소 설정
import React from "react";
import DaumPostCode from "react-daum-postcode";
import { customAlert } from "./Sweet";
import { AddressGrid } from ".";

import { useDispatch } from "react-redux";
import { actionCreators as locateActions } from "../redux/modules/loc";
import logger from "../shared/Console";

import "./style.css";

const PostAddress = React.memo((props) => {
  const dispatch = useDispatch();
  const [address, setAddress] = React.useState("");

  // 주소 검색 후 클릭 시 실행되는 함수
  // 도로명주소를 게시글에 보여줄 예정
  const handleComplete = (data) => {
    logger("PostAddress:20 : ", data);

    if (data.addressType === "R" && data.userSelectedType === "R") {
      setAddress(data.address);
    } else if (data.userSelectedType === "J") {
      setAddress(data.address);
    }
    props?.close();
  };

  React.useEffect(() => {
    if (address === "") return;
    dispatch(locateActions.getMyPostCoordAX(address));
    customAlert.sweetConfirmReload(
      "주소 설정 완료",
      ["입력한 주소로 설정이 완료되었어요."],
      ""
    );
  }, [address]);

  return (
    <AddressGrid is_post close={props?.close}>
      <DaumPostCode
        onComplete={handleComplete}
        className="post-code"
        style={{ height: "100vh" }}
      />
    </AddressGrid>
  );
});
export default PostAddress;
