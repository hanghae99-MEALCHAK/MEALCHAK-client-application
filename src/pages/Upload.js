import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import moment from "moment";

import { actionCreators as postAction } from "../redux/modules/post";
import { actionCreators as userAction } from "../redux/modules/user";
import { Kakao_auth_url } from "../shared/OAuth";
import logger from "../shared/Console";

// style
import { Button, Grid, Text } from "../elements";
import { UploadInput, UploadContents, Header } from "../components";
import theme from "../styles/theme";
import { customAlert } from "../components/Sweet";
import Spinner from "../shared/Spinner";

const Upload = React.memo((props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const post_list = useSelector((state) => state.post.list);
  logger("Upload:19: ", props);
  // style
  const { color, border, radius, fontSize } = theme;

  const post_address = useSelector((state) => state.loc.post_address);
  const longitude = post_address?.longitude;
  const latitude = post_address?.latitude;

  // 수정판별
  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  const post_idx = is_edit
    ? post_list.findIndex((p) => p.post_id === parseInt(post_id))
    : null;
  let _post = post_list[post_idx];

  React.useEffect(() => {
    document
      .querySelector("body")
      .scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (is_edit && !_post) {
      customAlert.sweetConfirmReload(
        "해당게시물을 찾을 수 없습니다.",
        null,
        "goBack"
      );
      return;
    }
    logger("post 수정 전 내용", _post);
    logger("post 수정 전 내용", is_edit);
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(userAction.loginCheck("/upload"));
  }, []);

  // upload 될 내용
  const past_post = {
    title: _post?.title,
    headCount: _post?.headCount,
    foodCategory: _post?.category,
    place: _post?.address,
    detail_place: _post?.detail_address,
    appointmentTime: _post?.orderTime,
    appointmentDate: _post?.orderDate,
    contents: _post?.contents,
    restaurant: _post?.shop,
    longitude: longitude,
    latitude: latitude,
  };
  const [post_info, setPostInfo] = useState(_post ? { ...past_post } : {});

  const today = moment().format("YYYY-MM-DD");
  const now_time = moment().format("HH:mm");

  const uploadBtn = () => {
    // 모집글 작성 시 상위, 하위 컴포넌트들에서 올바르지 않은 value있을때 처리하는 과정
    if (!post_info.title || post_info.title === "") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "모집글의 제목을 입력해주세요.",
        ""
      );
      return;
    }
    if (!post_info.contents || post_info.contents === "") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "모집글의 내용을 입력해주세요.",
        ""
      );
      return;
    }
    if (!post_info?.place || post_info?.place === "") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "안전한 더치페이를 위해 모집원을 만날 장소가 필요합니다.\n 약속 장소를 입력해주세요.",
        ""
      );
      return;
    }
    if (!post_info?.detail_place || post_info?.detail_place === "") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "안전한 더치페이를 위해 모집원을 만날 장소가 필요합니다.\n 상세주소를 입력해주세요.",
        ""
      );
      return;
    }
    if (!post_info.restaurant || post_info.restaurant === "") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "배달 예정인 식당을 입력해주세요.",
        ""
      );
      return;
    }
    if (!post_info.headCount || post_info.headCount === "0") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "모집원의 인원 수를 입력해주세요.",
        ""
      );
      return;
    }

    // 모집 날짜, 시간의 경우 디폴트 값으로 현재 시간, 날짜 넣음
    post_info.appointmentDate = post_info.appointmentDate ?? today;
    post_info.appointmentTime = post_info.appointmentTime ?? now_time;

    // 시간의 경우 날짜가 내일 이후면 어떤 시간도 상관없지만 오늘일 경우 현재시간 이전일 수 없어서 조건 줌
    if (post_info.appointmentDate === today) {
      const select_time = parseInt(
        post_info.appointmentTime.split(":").join("")
      );
      const time_now = parseInt(now_time.split(":").join(""));

      // 선택시간이 과거인 경우
      if (time_now > select_time) {
        return customAlert.sweetConfirmReload(
          "모집 예정시간을 확인해주세요",
          "현재시간보다 과거로 설정되었습니다.",
          ""
        );
      }
    }

    if (!post_info.foodCategory || post_info.foodCategory === "") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "모집을 희망하는 식품의 카테고리를 입력해주세요.",
        ""
      );
      return;
    }

    logger("post 업로드 상태", post_info);

    dispatch(postAction.addPostAX(post_info));
  };

  const UploadEditBtn = () => {
    logger("수정 버튼, post_info", post_info);

    // 모집글 작성 시 상위, 하위 컴포넌트들에서 올바르지 않은 value있을때 처리하는 과정
    if (!post_info.title || post_info.title === "") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "모집글의 제목을 입력해주세요.",
        ""
      );
      return;
    }
    if (!post_info.contents || post_info.contents === "") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "모집글의 내용을 입력해주세요.",
        ""
      );
      return;
    }
    if (!post_info.place || post_info.place === "") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "안전한 더치페이를 위해 모집원을 만날 장소가 필요합니다.\n 약속 장소를 입력해주세요.",
        ""
      );
      return;
    }
    if (!post_info?.detail_place || post_info?.detail_place === "") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "안전한 더치페이를 위해 모집원을 만날 장소가 필요합니다.\n 상세주소를 입력해주세요.",
        ""
      );
      return;
    }
    if (!post_info.restaurant || post_info.restaurant === "") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "배달 예정인 식당을 입력해주세요.",
        ""
      );
      return;
    }
    if (!post_info.headCount || post_info.headCount === "0") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "모집원의 인원 수를 입력해주세요.",
        ""
      );
      return;
    }

    // 시간의 경우 날짜가 내일 이후면 어떤 시간도 상관없지만 오늘일 경우 현재시간 이전일 수 없어서 조건 줌
    if (post_info.appointmentDate === today) {
      const select_time = parseInt(
        post_info.appointmentTime.split(":").join("")
      );
      const time_now = parseInt(now_time.split(":").join(""));

      // 선택시간이 과거인 경우
      if (time_now > select_time) {
        return customAlert.sweetConfirmReload(
          "모집 예정시간을 확인해주세요",
          "현재시간보다 과거로 설정되었습니다.",
          ""
        );
      }
    }
    if (!post_info.foodCategory || post_info.foodCategory === "") {
      customAlert.sweetConfirmReload(
        "빈칸이 있습니다.",
        "모집을 희망하는 식품의 카테고리를 입력해주세요.",
        ""
      );
      return;
    }

    dispatch(postAction.editPostAX(post_id, post_info));
  };

  if (is_login) {
    return (
      <Grid
        maxWidth="36rem"
        minHeight="100vh"
        border={border.line1}
        margin="0 auto"
      >
        <Grid shape="container">
          <Header {...props} shape="모임 만들기"/>
          <Grid height="4.4rem" />
          <UploadContents
            post_info={post_info}
            onChange={(value) => setPostInfo({ ...post_info, ...value })}
          />

          {/* <Grid borderBottom={border.line2}></Grid> */}
          <UploadInput
            post_info={post_info}
            find_address={props.location.state?.address}
            onChange={(value) => setPostInfo({ ...post_info, ...value })}
          />
          {/* <Grid height="10rem" /> */}
          <Grid
            height="auto"
            maxWidth="36rem"
            margin="0 auto"
            padding="2.8rem 2rem 2.7rem"
            bg={color.bg0}
          >
            {is_edit ? (
              <Button
                bg={color.brand100}
                height="5rem"
                border="none"
                radius={radius.button}
                cursor="t"
                _onClick={UploadEditBtn}
              >
                <Text color={color.bg0} bold2="700" size={fontSize.base}>
                  모집글 수정하기
                </Text>
              </Button>
            ) : (
              <Button
                bg={color.brand100}
                height="5rem"
                border="none"
                radius={radius.button}
                cursor="t"
                _onClick={uploadBtn}
              >
                <Text color={color.bg0} bold2="700" size={fontSize.base}>
                  밀착할 사람 모집하기
                </Text>
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return <Spinner />;
  }
});

export default Upload;
