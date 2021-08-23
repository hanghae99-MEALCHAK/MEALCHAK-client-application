import React from "react";
import axiosModule from "../redux/axios_module";
import logger from "../shared/Console";

// sweet alert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// 리덕스 기능 관련
import { history } from "../redux/configureStore";

// style
import { Text, Grid } from "../elements";
import theme from "../styles/theme";
import "./sweet.css";

const { color, fontSize } = theme;
const sweet = withReactContent(Swal);

// 단순 확인 알럿
// 최상위 제목으로 들어올값, 내용(array), 주소이동 필요 시 리로드될 주소를 파람값으로 받음
// 기본 적으로 처음 함수 만들때 리로드 목적으로 만들어서 path 값 조건 확인 후 사용
const sweetConfirmReload = (msg_title, msg_content_array, path) => {
  return sweet
    .fire({
      customClass: {
        popup: "border",
        confirmButton: "confirm",
      },
      width: "auto",
      padding: "0 1rem 1rem",
      title: (
        <Grid>
          <Text size={fontSize.base} bold2="700" margin="0 auto 1rem">
            {msg_title}
          </Text>
          {msg_content_array?.map((p, idx) => {
            let word_first = p.includes(":") ? p.split(":") : null;
            let word_mid = p.includes("/") ? p.split("/") : null;
            let word_normal = !p.includes(":") && !p.includes("/") ? p : null;
            if (word_first) {
              return (
                <Text size={fontSize.small} word_break="keep-all" key={idx}>
                  <b>{word_first[0]}</b>
                  {word_first[1]}
                </Text>
              );
            }
            if (word_mid) {
              return (
                <Text size={fontSize.small} word_break="keep-all" key={idx}>
                  {word_mid[0]} <b>{word_mid[1]}</b>
                  {word_mid[2]}
                </Text>
              );
            } else {
              return (
                <Text size={fontSize.small} word_break="keep-all" key={idx}>
                  {word_normal}
                </Text>
              );
            }
          })}
        </Grid>
      ),
      confirmButtonColor: color.brand100,
      confirmButtonText: (
        <Grid width="15rem" is_flex2 margin="auto">
          <Text padding="0" color={color.bg0} bold2={fontSize.bold}>
            확인
          </Text>
        </Grid>
      ),
      focusConfirm: false,
    })
    .then((res) => {
      if (res.isConfirmed) {
        // 주소 값이 없으면 리턴
        if (path === "") {
          return;
        }
        // 리로드 아니고 history 일때
        if (path === "history") {
          history.replace("/home");
          return;
        }
        // 뒤로가기
        if (path === "goBack") {
          history.goBack();
          return;
        }
        // 업로드에서 수정
        if (path === "/profile") {
          return history.push(path);
        }
        if (path === "/break") {
          return history.push("/chatlist");
        }
        // 그 외 새로 리로드 될때
        window.location.replace(path);
      } else if (res.isDismissed) {
        // 뒤로가기
        if (path === "goBack") {
          history.goBack();
          return;
        }
        // 마이페이지
        if (path === "/mypage") {
          history.push("/mypage");
          return;
        }
        if (path === "/mypost") {
          window.location.replace(path);
          return;
        }
        if (path === "/home") {
          window.location.replace(path);
        }
        if (path === "/") {
          window.location.replace(path);
        }
      } else {
        if (path === "/profile") {
          return history.push(path);
        }
        if (path === "/break") {
          return history.push("/chatlist");
        }
        return;
      }
    });
};

// 단순 확인 알럿
// 최상위 제목으로 들어올값, 내용, 주소이동 필요 시 리로드될 주소를 파람값으로 받음
// 리뷰 작성 페이지 전용 ( 줄바꿈 )
const sweetReviewWrite = (msg_title, msg_name, msg_content, path) => {
  return sweet
    .fire({
      customClass: {
        popup: "border",
        confirmButton: "confirmButton",
      },
      width: "auto",
      padding: "0 1rem 1rem",
      title: (
        <Grid>
          <Text size={fontSize.base} bold2="700" margin="0 auto 1rem">
            {msg_title}
          </Text>
          <Text size={fontSize.small}>
            {msg_name}
            <br />
            {msg_content}
          </Text>
        </Grid>
      ),
      confirmButtonColor: color.brand100,
      confirmButtonText: (
        <Grid width="15rem" is_flex2 margin="auto">
          <Text padding="0" color={color.bg0} bold2={fontSize.bold}>
            확인
          </Text>
        </Grid>
      ),
      focusConfirm: false,
    })
    .then((res) => {
      if (res.isConfirmed) {
        // 주소 값이 없으면 리턴
        if (path === "") {
          return;
        }
        // 리로드 아니고 history 일때
        if (path === "history") {
          history.replace("/home");
          return;
        }
        // 뒤로가기
        if (path === "goBack") {
          history.goBack();
          return;
        }
        // 그 외 새로 리로드 될때
        window.location.replace(path);
      } else if (res.isDismissed) {
        // 주소 값이 없으면 리턴
        if (path === "") {
          return;
        }
        // 리로드 아니고 history 일때
        if (path === "history") {
          history.replace("/home");
          return;
        }
        // 뒤로가기
        if (path === "goBack") {
          history.goBack();
          return;
        }
        // 그 외 새로 리로드 될때
        window.location.replace(path);
      }
    });
};

// 단순 확인 알럿
const sweetOK = (title, message1, message2, confirmText) => {
  return sweet
    .fire({
      customClass: {
        popup: "border",
        confirmButton: "confirm",
      },
      width: "auto",
      padding: "0 1rem 1rem",
      title: (
        <Grid>
          <Text margin="0 auto 1rem" size={fontSize.base} bold2="700">
            {title}
          </Text>
          <Text size={fontSize.small}>
            {message1} <br />
            {message2}
          </Text>
        </Grid>
      ),
      confirmButtonColor: color.brand100,
      confirmButtonText: (
        <Grid width="15rem" is_flex2 margin="auto">
          <Text padding="0" color={color.bg0}>
            {confirmText ? confirmText : "확인"}
          </Text>
        </Grid>
      ),
      focusConfirm: false,
    })
    .then((res) => {
      if (res.isConfirmed) {
        return true;
      }
      return false;
    });
};

// 확인, 취소 필요한 알럿
const sweetPromise = (title, message1, message2, confirmText, cancelText) => {
  return sweet
    .fire({
      customClass: {
        popup: "border",
        confirmButton: "confirmButton",
        cancelButton: "cancelButton",
        denyButton: "denyButton",
        actions: "meal-action-class",
      },
      width: "auto",
      padding: "0 1rem 1rem",
      title: (
        <Grid>
          <Text margin="0 auto 1rem" size={fontSize.base} bold2="700">
            {title}
          </Text>
          <Text size={fontSize.small}>
            {message1} <br />
            {message2}
          </Text>
        </Grid>
      ),
      showCancelButton: true,
      cancelButtonColor: color.brand20,
      cancelButtonText: (
        <Text padding="0" color={color.brand100} bold2={fontSize.bold}>
          {cancelText ? cancelText : "닫기"}
        </Text>
      ),
      confirmButtonColor: color.brand100,
      confirmButtonText: (
        <Grid is_flex2 margin="auto">
          <Text padding="0" color={color.bg0} bold2={fontSize.bold}>
            {confirmText ? confirmText : "확인"}
          </Text>
        </Grid>
      ),
      focusConfirm: false,
      reverseButtons: true,
    })
    .then((res) => {
      if (res.isConfirmed) {
        return true;
      }
      return false;
    });
};

// 로그인 체크 시 사용
// 체크 후 주소 이동 방식에 따라 달라서 파람값으로 replace 인지 받음
const sweetNeedLogin = (way) => {
  return sweet
    .fire({
      customClass: {
        popup: "border",
        confirmButton: "confirmButton",
        cancelButton: "cancelButton",
        denyButton: "denyButton",
        actions: "meal-action-class",
      },
      width: "auto",
      padding: "0 1rem 1rem",
      title: (
        <Grid>
          <Text margin="0 auto 1rem" size={fontSize.base} bold2="700">
            앗 로그인이 필요해요!
          </Text>
          <Text size={fontSize.small}>
            1초 만에 카카오 로그인하면
            <br />
            밀착 서비스를 사용하실 수 있어요
          </Text>
        </Grid>
      ),
      showCancelButton: true,
      cancelButtonColor: color.brand20,
      cancelButtonText: (
        <Text padding="0" color={color.brand100} bold2={fontSize.bold}>
          닫기
        </Text>
      ),
      confirmButtonColor: color.brand100,
      confirmButtonText: (
        <Grid is_flex2 margin="auto">
          <Text padding="0" color={color.bg0} bold2={fontSize.bold}>
            확인
          </Text>
        </Grid>
      ),
      focusConfirm: false,
      reverseButtons: true,
    })
    .then((res) => {
      if (res.isConfirmed) {
        if (way === "replace") {
          history.replace("/");
        }
        return;
      }
      return;
    });
};

// 잘못된 페이지 접근일때 표시
const sweetWA = () => {
  return sweet
    .fire({
      customClass: {
        popup: "border",
        confirmButton: "confirmButton",
        cancelButton: "cancelButton",
        denyButton: "denyButton",
        actions: "meal-action-class",
      },
      width: "auto",
      padding: "0 1rem 1rem",
      title: (
        <Grid>
          <Text margin="0 auto 1rem" size={fontSize.base} bold2="700">
            잘못된 접근입니다.
          </Text>
          <Text size={fontSize.small}>홈으로 돌아갑니다.</Text>
        </Grid>
      ),
      showCancelButton: true,
      cancelButtonColor: color.brand20,
      cancelButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.brand100} bold2={fontSize.bold}>
            닫기
          </Text>
        </Grid>
      ),
      confirmButtonColor: color.brand100,
      confirmButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.bg0} bold2={fontSize.bold}>
            확인
          </Text>
        </Grid>
      ),
      focusConfirm: false,
      reverseButtons: true,
    })
    .then((res) => {
      if (res.isConfirmed) {
        history.push("/home");
      }
    });
};

// 성별, 연령 없을때
const sweetAddCheck = () => {
  return sweet
    .fire({
      customClass: {
        popup: "border",
        confirmButton: "confirmButton",
        cancelButton: "cancelButton",
        denyButton: "denyButton",
        actions: "meal-action-class",
      },
      width: "auto",
      padding: "0 0 1rem",
      title: (
        <Grid>
          <Text margin="0 auto 1rem" size={fontSize.base} bold2="700">
            성별/연령 정보를 알려주세요!
          </Text>
          <Text size={fontSize.small}>밀착의 모든 서비스를 사용하려면</Text>
          <Text size={fontSize.small}>성별과 연령 정보가 있어야해요.</Text>
        </Grid>
      ),
      showCancelButton: true,
      cancelButtonColor: color.brand20,
      cancelButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.brand100} bold2={fontSize.bold}>
            나중에 하기
          </Text>
        </Grid>
      ),
      confirmButtonColor: color.brand100,
      confirmButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.bg0} bold2={fontSize.bold}>
            입력하기
          </Text>
        </Grid>
      ),
      focusConfirm: false,
      reverseButtons: true,
    })
    .then((res) => {
      if (res.isConfirmed) {
        history.replace("/profile");
      } else {
        return;
      }
    });
};

// 성별, 연령 없을때
const sweetUserInfo = (age, gender) => {
  let age_label = null;
  if (age === "10~19") {
    age_label = "10대";
  }
  if (age === "20~29") {
    age_label = "20대";
  }
  if (age === "30~39") {
    age_label = "30대";
  }
  if (age === "40~49") {
    age_label = "40대";
  }
  if (age === "50~59") {
    age_label = "50대";
  }

  let gender_label = null;
  if (gender === "female") {
    gender_label = "여성";
  }
  if (gender === "male") {
    gender_label = "남성";
  }

  return sweet
    .fire({
      customClass: {
        popup: "border",
        confirmButton: "confirmButton",
        cancelButton: "cancelButton",
        denyButton: "denyButton",
        actions: "meal-action-class",
      },
      width: "auto",
      padding: "0 0 1rem",
      title: (
        <Grid>
          <Text margin="0 auto 1rem" size={fontSize.base} bold2="700">
            입력한 성별/연령 정보가 맞나요?
          </Text>
          <Text size={fontSize.small}>
            성별/연령은 한번 선택 시, 수정이 어려우니 <br />
            맞게 선택했는지 확인해주세요.
          </Text>
          <Grid margin="1.6rem auto">
            <Text size={fontSize.base}>성별: {gender_label}</Text>
            <Text size={fontSize.base}>연령: {age_label}</Text>
          </Grid>
        </Grid>
      ),
      showCancelButton: true,
      cancelButtonColor: color.brand20,
      cancelButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.brand100} bold2={fontSize.bold}>
            다시 입력하기
          </Text>
        </Grid>
      ),
      confirmButtonColor: color.brand100,
      confirmButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.bg0} bold2={fontSize.bold}>
            저장하기
          </Text>
        </Grid>
      ),
      focusConfirm: false,
      reverseButtons: true,
    })
    .then((res) => {
      if (res.isConfirmed) {
        return true;
      } else {
        return false;
      }
    });
};

const SweetAllowChat = (join_id) => {
  sweet
    .fire({
      customClass: {
        popup: "border",
        confirmButton: "confirmButton",
        cancelButton: "cancelButton",
        denyButton: "denyButton",
        actions: "meal-action-class",
      },
      width: "auto",
      padding: "0 1rem 1rem",
      title: (
        <Grid>
          <Text margin="0 auto 1rem" size={fontSize.base} bold2="700">
            승인하시겠어요?
          </Text>
        </Grid>
      ),
      text: "승인을 누르면 채팅방으로 초대돼요.",
      showDenyButton: true,
      denyButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.brand100} bold2={fontSize.bold}>
            취소
          </Text>
        </Grid>
      ),
      denyButtonColor: color.brand20,
      confirmButtonColor: color.brand100,
      confirmButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.bg0} bold2={fontSize.bold}>
            승인하기
          </Text>
        </Grid>
      ),
      focusConfirm: false,
      reverseButtons: true,
    })
    .then((res) => {
      if (res.isConfirmed) {
        axiosModule
          .get(`/posts/join/request/accept/${join_id}?accept=true`)
          .then((res) => {
            logger("승인 수락 res", res);
            sweetConfirmReload(
              "승인 완료",
              ["성공적으로 요청 받은 승인을 수락했어요."],
              "/allowchat"
            );
          })
          .catch((e) => {
            logger("채팅방 참여 승인 요청 에러", e);
            sweetConfirmReload(
              "승인 실패",
              ["채팅방 승인에 실패했어요.", "모집 마감여부를 확인해주세요."],
              ""
            );
          });
      } else if (res.isDenied) {
        return;
      } else {
        return;
      }
    });
};

const SweetDenyChat = (join_id) => {
  sweet
    .fire({
      customClass: {
        popup: "border",
        confirmButton: "confirmButton",
        cancelButton: "cancelButton",
        denyButton: "denyButton",
        actions: "meal-action-class",
      },
      width: "auto",
      padding: "0 1rem 1rem",
      title: (
        <Grid>
          <Text margin="0 auto 1rem" size={fontSize.base} bold2="700">
            승인을 거절할까요?
          </Text>
        </Grid>
      ),
      text: "거절을 누르면 승인 요청이 삭제돼요.",
      showDenyButton: true,
      denyButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.brand100} bold2={fontSize.bold}>
            취소
          </Text>
        </Grid>
      ),
      denyButtonColor: color.brand20,
      confirmButtonColor: color.brand100,
      confirmButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.bg0} bold2={fontSize.bold}>
            거절하기
          </Text>
        </Grid>
      ),
      focusConfirm: false,
      reverseButtons: true,
    })
    .then((res) => {
      if (res.isConfirmed) {
        axiosModule
          .get(`/posts/join/request/accept/${join_id}?accept=false`)
          .then((res) => {
            logger("승인 거절 res", res);
            sweetConfirmReload(
              "거절 완료",
              ["성공적으로 승인 요청이 삭제됐어요."],
              "/allowchat"
            );
          })
          .catch((e) => {
            logger("채팅방 참여 승인 요청 에러", e);
            sweetConfirmReload(
              "승인 요청 에러",
              ["채팅방 참여 승인 요청 중 에러가 발생했습니다"],
              ""
            );
          });
      } else if (res.isDenied) {
        return;
      } else {
        return;
      }
    });
};

const SweetBen = (sendBen, other_user_id, other_user_name) => {
  sweet
    .fire({
      customClass: {
        popup: "border",
        confirmButton: "confirmButton",
        cancelButton: "cancelButton",
        denyButton: "denyButton",
        actions: "meal-action-class",
      },
      width: "auto",
      padding: "0 1rem 1rem",
      title: (
        <Grid>
          <Text margin="0 auto 1rem" size={fontSize.base} bold2="700">
            {other_user_name}님을 퇴장시키겠어요?
          </Text>
        </Grid>
      ),
      text: "아래 확인 버튼을 누르면 퇴장돼요. 한번 실행 시 취소가 불가해요",
      showDenyButton: true,
      denyButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.brand100} bold2={fontSize.bold}>
            취소
          </Text>
        </Grid>
      ),
      denyButtonColor: color.brand20,
      confirmButtonColor: color.brand100,
      confirmButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.bg0} bold2={fontSize.bold}>
            퇴장 시키기
          </Text>
        </Grid>
      ),
      focusConfirm: false,
      reverseButtons: true,
    })
    .then((res) => {
      if (res.isConfirmed) {
        sendBen(other_user_id, other_user_name);
      } else if (res.isDenied) {
        return;
      } else {
        return;
      }
    });
};

const SweetBreak = (sendBreak, post_id) => {
  sweet
    .fire({
      customClass: {
        popup: "border",
        confirmButton: "confirmButton",
        cancelButton: "cancelButton",
        denyButton: "denyButton",
        actions: "meal-action-class",
      },
      width: "auto",
      padding: "0 1rem 1rem",
      title: (
        <Grid>
          <Text margin="0 auto 1rem" size={fontSize.base} bold2="700">
            채팅방을 삭제하시겠어요?
          </Text>
        </Grid>
      ),
      text: "방장이 채팅방을 나갈 경우 해당 채팅방이 사라져요.",
      showDenyButton: true,
      denyButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.brand100} bold2={fontSize.bold}>
            취소
          </Text>
        </Grid>
      ),
      denyButtonColor: color.brand20,
      confirmButtonColor: color.brand100,
      confirmButtonText: (
        <Grid width="9rem" is_flex2 margin="auto">
          <Text padding="0" color={color.bg0} bold2={fontSize.bold}>
            나가기
          </Text>
        </Grid>
      ),
      focusConfirm: false,
      reverseButtons: true,
    })
    .then((res) => {
      if (res.isConfirmed) {
        axiosModule
          .delete(`/chat/quit/${post_id}`)
          .then((res) => {
            sendBreak();
          })
          .catch((e) => {
            logger("채팅방 나가기 요청 에러", e);
            sweetConfirmReload(
              "나가기 요청 에러",
              ["채팅방 나가기 요청 중 에러가 발생했습니다"],
              ""
            );
          });
      } else if (res.isDenied) {
        return;
      } else {
        return;
      }
    });
};

const customAlert = {
  sweetConfirmReload,
  sweetReviewWrite,
  sweetNeedLogin,
  sweetWA,
  // sweetEditError,
  SweetAllowChat,
  SweetDenyChat,
  // SweetOutChat,
  SweetBen,
  SweetBreak,
  sweetAddCheck,
  sweetUserInfo,
  sweetPromise,
  sweetOK,
};

export { customAlert };
