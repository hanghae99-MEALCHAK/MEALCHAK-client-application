// 모임 만들기 및 모임 만들기 수정 페이지
import React from "react";
import moment from "moment";
import logger from "../shared/Console";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postAction } from "../redux/modules/post";
import { actionCreators as userAction } from "../redux/modules/user";

// style
import theme from "../styles/theme";
import Spinner from "../shared/Spinner";
import { Button, Grid, Text } from "../elements";
import { UploadInput, UploadContents, Header, PcSide } from "../components";
import { customAlert } from "../components/Sweet";

const Upload = React.memo((props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  // 홈에서의 접근인 경우
  const post_list = useSelector((state) => state.post.list);

  // 홈에서의 접근이 아닌 내가쓴 글에서의 접근인 경우 반별
  // 내가쓴 글일 경우 user의 myPost array가 있음
  const my_post = useSelector((state) => state.user?.myPost);

  // style
  const { color, radius, fontSize } = theme;

  const post_address = useSelector((state) => state.loc.post_address);
  const longitude = post_address?.longitude;
  const latitude = post_address?.latitude;

  // 수정판별
  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  // 수정에 접근 한 경로 판별 후 이후 행동 결정
  const post_idx = is_edit
    ? post_list.findIndex((p) => p.post_id === parseInt(post_id))
    : null;
  const my_post_idx = is_edit
    ? my_post.findIndex((p) => p.post_id === parseInt(post_id))
    : null;

  // post_list의 배열이 있는 경우 post 모듈에서 정보를 가지고 오기
  // 반대의 경우 내가 쓴 글이므로 user의 게시글 정보 가지고 오기
  let _post = post_list.length > 0 ? post_list[post_idx] : my_post[my_post_idx];

  React.useEffect(() => {
    document
      .querySelector("body")
      .scrollTo({ top: 0, left: 0, behavior: "instant" });
      // 잘못된 접근일 경우 예외 처리
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

  // 수정하는 상황인 경우 수정 될 이전 내용 불러오기
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
    meeting: _post?.meeting,
  };
  const [post_info, setPostInfo] = useState(_post ? { ...past_post } : {});
  const today = moment().format("YYYY-MM-DD");
  const now_time = moment().format("HH:mm");

  const uploadBtn = () => {
    // 모집글 작성 시 상위, 하위 컴포넌트들에서 올바르지 않은 value있을때 처리하는 과정
    if (post_info.disabled) {
      return customAlert
        .sweetOK(
          "입력 가능한 글자수를 초과했어요",
          "모집글 작성 시 255자 이내로 작성해주세요."
        )
        .then(() => {
          return;
        });
    }

    if (!post_info.title || post_info.title === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        [`모집글의 /제목/을 작성해주세요.`],
        ""
      );
      return;
    }
    if (!post_info.contents || post_info.contents === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        [`모집글의 /내용/을 작성해주세요.`],
        ""
      );
      return;
    }
    if (!post_info?.place || post_info?.place === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        ["만날 장소에서 주소 찾기 버튼을 눌러", `주소;를 입력해주세요.`],
        ""
      );
      return;
    }
    if (!post_info?.detail_place || post_info?.detail_place === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        [`상세 주소;를 작성해주세요.`],
        ""
      );
      return;
    }
    if (!post_info.restaurant || post_info.restaurant === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        ["배달 예정인 식당 ;이름을 적어주세요."],
        ""
      );
      return;
    }
    if (!post_info.headCount || post_info.headCount === "0") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        [`모집 인원 수;를 선택해주세요.`],
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
      if (time_now >= select_time) {
        return customAlert.sweetConfirmReload(
          "배달 주문 예정 시간을 확인해주세요",
          ["현재시간보다 과거로 설정됐어요."],
          ""
        );
      }
    }

    if (!post_info.foodCategory || post_info.foodCategory === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        [`음식의 /카테고리/를 선택해주세요.`],
        ""
      );
      return;
    }

    if (!post_info.meeting || post_info.meeting === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        [`모집 유형;을 선택해주세요.`],
        ""
      );
      return;
    }

    logger("post 업로드 상태", post_info);
    delete post_info.disabled;
    dispatch(postAction.addPostAX(post_info));
  };

  const UploadEditBtn = () => {
    logger("수정 버튼, post_info", post_info);

    // 모집글 작성 시 상위, 하위 컴포넌트들에서 올바르지 않은 value있을때 처리하는 과정
    if (post_info.disabled) {
      return customAlert
        .sweetOK(
          "입력 가능한 글자수를 초과했어요",
          "모집글 작성 시 255자 이내로 작성해주세요."
        )
        .then(() => {
          return;
        });
    }
    if (!post_info.title || post_info.title === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        [`모집글의 /제목/을 작성해주세요.`],
        ""
      );
      return;
    }
    if (!post_info.contents || post_info.contents === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        [`모집글의 /내용/을 작성해주세요.`],
        ""
      );
      return;
    }
    if (!post_info.place || post_info.place === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        ["만날 장소에서 주소 찾기 버튼을 눌러", `주소;를 입력해주세요.`],
        ""
      );
      return;
    }
    if (!post_info?.detail_place || post_info?.detail_place === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        [`상세 주소;를 작성해주세요.`],
        ""
      );
      return;
    }
    if (!post_info.restaurant || post_info.restaurant === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        ["배달 예정인 식당; 이름을 적어주세요."],
        ""
      );
      return;
    }
    if (!post_info.headCount || post_info.headCount === "0") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        [`모집 인원 수;를 선택해주세요.`],
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
          "배달 주문 예정 시간을 확인해주세요",
          ["현재시간보다 과거로 설정됐어요."],
          ""
        );
      }
    }
    if (!post_info.foodCategory || post_info.foodCategory === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        [`음식의 /카테고리/를 선택해주세요.`],
        ""
      );
      return;
    }

    if (!post_info.meeting || post_info.meeting === "") {
      customAlert.sweetConfirmReload(
        "앗 빈칸이 있어요",
        [`모집 유형;을 선택해주세요.`],
        ""
      );
      return;
    }
    delete post_info.disabled;
    dispatch(
      postAction.editPostAX(
        post_id,
        post_info,
        my_post.length > 0 ? "/mypost" : null
      )
    );
  };

  if (is_login) {
    return (
      <>
        <PcSide {...props} />
        <Grid
          minHeight="100vh"
          margin="0 auto"
        >
          <Grid shape="container">
            <Header {...props} shape="모임 만들기" />
            <Grid height="4.4rem" />
            {/* 모임 만들기 텍스트 인풋 모음 */}
            <UploadContents
              post_info={post_info}
              // 하위에서 상위로 데이터 올리기
              onChange={(value) => setPostInfo({ ...post_info, ...value })}
            />

            {/* 모임 만들기 input 모음 */}
            <UploadInput
              post_info={post_info}
              find_address={props.location.state?.address}
              // 하위에서 상위로 데이터 올리기
              onChange={(value) => setPostInfo({ ...post_info, ...value })}
            />
            
            {/* 최초 업로드, 수정 여부 판별 후 버튼 바꾸기 */}
            <Grid padding="0 2rem">
              <Grid
                height="auto"
                maxWidth="36rem"
                margin="0"
                padding="2.8rem 0 2.7rem"
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
        </Grid>
      </>
    );
  } else {
    return <Spinner />;
  }
});

export default Upload;
