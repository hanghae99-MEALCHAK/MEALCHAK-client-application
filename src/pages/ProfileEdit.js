// 마이페이지 프로필 수정 페이지
import React from "react";
import { useState } from "react";
import logger from "../shared/Console";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";
import { actionCreators as imageActions } from "../redux/modules/image";

// select 라이브러리
// 사용자 연령, 성별 선택
import { GenderSelect, AgeSelect } from "../components/ReactSelect";

// style
import Resizer from "react-image-file-resizer";
import { Button, Grid, Input, Text } from "../elements";
import { Header, PcSide } from "../components";
import Spinner from "../shared/Spinner";
import theme from "../styles/theme";
import styled from "styled-components";
import { customAlert } from "../components/Sweet";

const ProfileEdit = (props) => {
  // 프로필 수정 업로드 시 파일 사이즈 줄이는 함수
  // 300px 품질 95%로 고정
  // 콜백 함수로 uri file 객체 반환
  // 이미지 수정 속도 개선
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        95,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const { color, border, radius, fontSize, btn_border } = theme;
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const user_info = useSelector((state) => state.user.user);
  const preview = useSelector((state) => state.image?.preview);

  // 성별 options
  const gender_options = [
    { value: "female", label: "여성" },
    { value: "male", label: "남성" },
  ];

  // 연령 options
  const age_options = [
    { value: "10~19", label: "10대" },
    { value: "20~29", label: "20대" },
    { value: "30~39", label: "30대" },
    { value: "40~49", label: "40대" },
    { value: "50~59", label: "50대" },
  ];

  const [disabled, setDisabled] = useState(true);
  const [editProfile, setProfile] = useState({
    nickname: user_info?.user_nickname,
    comment: user_info?.user_comment ? user_info?.user_comment : "",
    image: user_info?.user_profile,
    gender: user_info?.user_gender ? user_info?.user_gender : null,
    age: user_info?.user_age ? user_info?.user_age : null,
  });

  // 이름 수정 함수
  const changeNick = (e) => {
    setProfile({ ...editProfile, nickname: e.target.value });
    setDisabled(false);
  };

  // 소개글 수정 함수
  // 글자수 제한
  const changeComment = (e) => {
    if (e.target.value.length >= 120) {
      return customAlert.sweetOK(
        "입력 가능한 글자수를 초과했어요",
        "모집글 작성 시 120자 이내로 작성해주세요."
      ).then(() => {
      setDisabled(true);
      });
    } else {
      setProfile({ ...editProfile, comment: e.target.value });
      setDisabled(false);
    }
  };

  // 사용자 정보 수정 함수
  const editUser = () => {
    logger("수정할 이름", editProfile.nickname);
    logger("수정할 이름", editProfile.comment);
    logger("수정 내용", editProfile);
    
    if (!user_info?.user_age && !user_info?.user_gender) {
      // 연령, 성별 입력시 확인 알럿
      // 최종 확인 이후 수정 요청 서버와 통신
      if (editProfile.gender && editProfile.age) {
        customAlert
        .sweetUserInfo(editProfile.age, editProfile.gender)
        .then((res) => {
          if (res) {
            dispatch(userAction.editUserProfileAX({ ...editProfile }));
          } else {
            return;
          }
        });
      } else {
        // 사용자 정보에 연령, 성별이 하나라도 없는 경우 경고 알럿
        customAlert.sweetConfirmReload(
          "앗 빈칸이 있어요",
          ["성별과 연령을 모두 선택해주세요."],
          ""
        );
      }
    } else {
      // 프로필 age, gender 둘다 이미 있는 사람인 경우
      if (editProfile.gender && editProfile.age) {
        dispatch(userAction.editUserProfileAX({ ...editProfile }));
      } else {
        customAlert.sweetConfirmReload(
          "앗 빈칸이 있어요",
          ["성별과 연령을 모두 선택해주세요."],
          ""
        );
      }
    }
  };

  // 선택한 파일 정보
  const fileInput = React.useRef();
  const selectFile = async (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    // 이미지 파일 리사이즈 이후 비동기적으로 처리
    // resizeFile 함수 실행후 반환 받은 파일 객체로 이후 과정 처리
    const img = await resizeFile(file);
    logger("이미지 정보", file);
    logger("resize 이미지 정보", img);

    setProfile({ ...editProfile, image: img });
    reader.readAsDataURL(img);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  React.useEffect(() => {
    dispatch(userAction.loginCheck("/profile"));
  }, []);

  // 이름, 소개란이 하나라도 비어있는 경우 
  // 성별, 연령이 비어있는 경우 변화 감지 후 처리
  React.useEffect(() => {
    if (!editProfile.comment || !editProfile.nickname) {
      setDisabled(true);
    } else if (!editProfile.age || !editProfile.gender) {
      if (user_info?.user_age && user_info?.user_gender) {
        setProfile({
          ...editProfile,
          gender: user_info?.user_gender,
          age: user_info?.user_age,
        });
      } else {
        setDisabled(true);
      }
    } else if (editProfile.comment || editProfile.nickname) {
      setDisabled(false);
    }
  }, [
    editProfile.comment,
    editProfile.nickname,
    editProfile.age,
    editProfile.gender,
  ]);

  if (is_login) {
    return (
      <>
        <PcSide {...props} />
        <Grid
          minWidth="32rem"
          minHeight="100vh"
          margin="0 auto"
        >
          <Grid shape="container" minWidth="32rem">
            <Header {...props} shape="프로필수정" />

            <Grid is_flex2 margin="3.6rem auto 2rem">
              <Profile
                user_profile={preview ? preview : user_info?.user_profile}
              />
              <ProfileCover>
                <input
                  type="file"
                  accept="image/jpg,image/png,image/jpeg,image/bmp"
                  id="input-file"
                  ref={fileInput}
                  onChange={selectFile}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="input-file"
                  value={editProfile.image || ""}
                  style={{ cursor: "pointer" }}
                >
                  <svg
                    width="2.5rem"
                    height="2.5rem"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ margin: "3.6rem 0 0 3.8rem" }}
                  >
                    <path
                      d="M5 12.5558C5 11.4204 5.9204 10.5 7.05576 10.5V10.5C7.83809 10.5 8.55262 10.056 8.89902 9.35449L9.81482 7.5C9.99871 7.12761 10.0907 6.94142 10.2076 6.78792C10.5048 6.39791 10.9348 6.13064 11.4161 6.03689C11.6055 6 11.8132 6 12.2285 6H17.7715C18.1868 6 18.3945 6 18.5839 6.03689C19.0652 6.13064 19.4952 6.39791 19.7924 6.78792C19.9093 6.94142 20.0013 7.12761 20.1852 7.5L21.101 9.35449C21.4474 10.056 22.1619 10.5 22.9442 10.5V10.5C24.0796 10.5 25 11.4204 25 12.5558V18.2143C25 20.8349 25 22.1452 24.2369 22.999C24.1621 23.0827 24.0827 23.1621 23.999 23.2369C23.1452 24 21.8349 24 19.2143 24H10.7857C8.16513 24 6.85484 24 6.00096 23.2369C5.91728 23.1621 5.83786 23.0827 5.76307 22.999C5 22.1452 5 20.8349 5 18.2143V12.5558Z"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle
                      cx="15"
                      cy="16"
                      r="4"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </label>
              </ProfileCover>
            </Grid>
            <FocusWithin>
              <Grid
                width="32rem"
                minWidth="32rem"
                heigh="8.2rem"
                margin="0 auto 2.4rem auto"
              >
                <Text
                  width="32rem"
                  margin="0 0 0.9rem 0"
                  height="2.4rem"
                  bold2="500"
                  size={fontSize.base}
                  color={color.bg100}
                  line_height="150%"
                >
                  닉네임
                </Text>
                <Input
                  type="text"
                  border={btn_border.bg40}
                  padding="1.5rem 1.3rem"
                  size={fontSize.base}
                  color={color.bg80}
                  length={8}
                  placeholder={user_info?.user_nickname}
                  value={editProfile?.nickname}
                  _onChange={changeNick}
                />
              </Grid>
            </FocusWithin>
            <FocusWithin>
              <Grid
                width="32rem"
                minWidth="32rem"
                height="8.2rem"
                shape="container"
                align_items="center"
              >
                <Text
                  width="32rem"
                  margin="0 0 0.9rem 0"
                  height="2.4rem"
                  bold2="500"
                  size={fontSize.base}
                  color={color.bg100}
                  line_height="150%"
                >
                  소개글
                </Text>
                <TextArea
                  maxLength="120"
                  onChange={changeComment}
                  value={editProfile?.comment}
                  placeholder="어느 지역에서 주로 시켜먹나요?&#13;&#10;제일 좋아하는 음식은 무엇인가요?&#13;&#10;나를 나타낼 수 있는 문구로 소개해보세요!"
                ></TextArea>
              </Grid>
            </FocusWithin>
            <Text
              width="32rem"
              height="2.2rem"
              margin="0.4rem auto 0"
              color="#9A9896"
              size={fontSize.small}
              line_height="150%"
            >
              20글자 이상 입력해주세요.
            </Text>
          </Grid>

          <Grid margin="0 auto 1rem" shape="container" align_items="center">
            <Text
              width="32rem"
              margin="2.4rem 0 0 0"
              height="2.4rem"
              bold2="500"
              size={fontSize.base}
              color={color.bg100}
              line_height="150%"
            >
              성별
            </Text>
            <Grid
              width="32rem"
              minWidth="32rem"
              border={border.bg40}
              radius="1.2rem"
              height="auto"
              bg={user_info?.user_gender ? "#eee" : ""}
            >
              {user_info?.user_gender ? (
                <Text
                  size={fontSize.base}
                  color={color.bg80}
                  padding="1.4rem 0 1.4rem 1.6rem"
                >
                  {user_info.user_gender === "male" ? "남성" : "여성"}
                </Text>
              ) : (
                <GenderSelect
                  options={gender_options}
                  value={editProfile.gender}
                  setProfile={setProfile}
                  setDisabled={setDisabled}
                  editProfile={editProfile}
                  onChange={props.onChange}
                  gender={editProfile.gender}
                />
              )}
            </Grid>
          </Grid>

          <Grid margin="0 auto 1rem" shape="container" align_items="center">
            <Text
              width="32rem"
              margin="2.4rem 0 0 0"
              height="2.4rem"
              bold2="500"
              size={fontSize.base}
              color={color.bg100}
              line_height="150%"
            >
              연령
            </Text>

            <Grid
              width="32rem"
              minWidth="32rem"
              border={border.bg40}
              radius="1.2rem"
              height="auto"
              bg={user_info?.user_age ? "#eee" : ""}
            >
              {user_info?.user_age ? (
                <Text
                  size={fontSize.base}
                  color={color.bg80}
                  padding="1.4rem 0 1.4rem 1.6rem"
                >
                  {age_options.map((p) => {
                    if (p.value === user_info.user_age) {
                      return p.label;
                    }
                    return null;
                  })}
                </Text>
              ) : (
                <AgeSelect
                  options={age_options}
                  value={editProfile.age}
                  setProfile={setProfile}
                  setDisabled={setDisabled}
                  editProfile={editProfile}
                  onChange={props.onChange}
                  age={editProfile.age}
                />
              )}
            </Grid>
          </Grid>

          <Grid
            width="32rem"
            height="auto"
            maxWidth="35.5rem"
            margin="0 auto 0.1rem"
            padding="2.8rem 0 2.7rem"
          >
            <Button
              bg={disabled ? color.bg40 : color.brand100}
              height="5rem"
              border="none"
              radius={radius.button}
              cursor="t"
              disabled={disabled}
              _onClick={editUser}
            >
              <Text
                color={disabled ? color.bg60 : color.bg0}
                bold2="700"
                size={fontSize.base}
              >
                저장하기
              </Text>
            </Button>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return <Spinner />;
  }
};

ProfileEdit.defaultProps = {};

const Profile = styled.div`
  margin: 1rem auto;
  width: 10rem;
  height: 10rem;
  border-radius: 5rem;
  ${(props) =>
    props.user_profile
      ? `background-image: url(${props?.user_profile});`
      : `background-image: url(http://115.85.182.57:8080/image/profileDefaultImg.jpg);`}
  background-size: cover;
  background-position: center;
  /* padding: 10rem 0 0 0; */
`;

const ProfileCover = styled.div`
  position: absolute;
  top: 4.7rem;
  width: 10rem;
  height: 10rem;
  border-radius: 5rem;
  background: rgba(54, 55, 60, 0.4);
  background-size: cover;
  background-position: center;
  opacity: 0.7;
  border: none;
`;

const TextArea = styled.textarea`
  width: 32rem;
  height: 16.8rem;
  color: ${theme.color.bg100};
  font-size: ${theme.fontSize.base};
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.01rem;
  background-color: ${theme.color.bg0};
  border: ${theme.btn_border.bg40};
  border-radius: ${theme.radius.button};
  padding: 1.6rem;
  resize: none;
  -ms-overflow-style: none;
  /* 모바일 및 브라우저별 호환 */
  &::placeholder {
    color: ${theme.color.bg80};
    font-size: ${theme.fontSize.base};
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.01rem;
  }
  &::-webkit-input-placeholder::after {
    display: block;
    content: "어느 지역에서 주로 시켜먹나요?\A제일 좋아하는 음식은 무엇인가요?\A나를 나타낼 수 있는 문구로 소개해보세요!";
  }
  &::-moz-placeholder {
    /* Firefox 19+ */
    display: block;
    content: "어느 지역에서 주로 시켜먹나요?\A제일 좋아하는 음식은 무엇인가요?\A나를 나타낼 수 있는 문구로 소개해보세요!";
  }

  &:-ms-input-placeholder {
    display: block;
    content: "어느 지역에서 주로 시켜먹나요?\A제일 좋아하는 음식은 무엇인가요?\A나를 나타낼 수 있는 문구로 소개해보세요!";
  }

  &:-moz-placeholder {
    /* Firefox 18- */
    display: block;
    content: "어느 지역에서 주로 시켜먹나요?\A제일 좋아하는 음식은 무엇인가요?\A나를 나타낼 수 있는 문구로 소개해보세요!";
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FocusWithin = styled.div`
  &:focus-within p {
    color: #ff9425;
  }
  &:focus-within input {
    border: 1px solid #ff9425;
    outline: none;
  }
  &:focus-within textarea {
    border: 1px solid #ff9425;
    outline: none;
    resize: none;
  }
`;

export default ProfileEdit;
