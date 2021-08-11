import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";
import { actionCreators as imageActions } from "../redux/modules/image";

// select
import { GenderSelect, AgeSelect } from "../components/ReactSelect";

// style
import { Button, Grid, Input, Text } from "../elements";
import { customAlert } from "../components/Sweet";
import { Header } from "../components";
import Spinner from "../shared/Spinner";
import logger from "../shared/Console";
import theme from "../styles/theme";

const ProfileEdit = (props) => {
  const { color, border, radius, fontSize, btn_border } = theme;
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  const user_info = useSelector((state) => state.user.user);
  const preview = useSelector((state) => state.image?.preview);

  const gender_options = [
    { value: "female", label: "여성" },
    { value: "male", label: "남성" },
  ];

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

  const changeNick = (e) => {
    setProfile({ ...editProfile, nickname: e.target.value });
    setDisabled(false);
  };

  const changeComment = (e) => {
    setProfile({ ...editProfile, comment: e.target.value });
    setDisabled(false);
  };

  // 사용자 추가 정보 따로 axios 요청이있는지?
  const editUser = () => {
    logger("수정할 이름", editProfile.nickname);
    logger("수정할 이름", editProfile.comment);
    logger("수정 내용", editProfile);

    if (!user_info?.user_age && !user_info?.user_gender) {
      if (editProfile.gender && editProfile.age) {
        customAlert.sweetUserInfo(editProfile.age, editProfile.gender).then((res) => {
          if(res){
            dispatch(userAction.editUserProfileAX({ ...editProfile }));
            customAlert.sweetConfirmReload(
              "프로필이 수정되었습니다.",
              null,
              "/mypage")
          }
          else {
            return;
          }
        })
        
        // dispatch(userAction.editUserProfileAX({ ...editProfile }));
        // customAlert.sweetConfirmReload(
        //   "프로필이 수정되었습니다.",
        //   null,
        //   "/mypage"
        // );
      } else {
        customAlert.sweetConfirmReload("성별/ 연령", "필수항목입니다.", "");
      }
    } else {
      // 프로필 age, gender 둘다 이미 있는 사람
      if (editProfile.gender && editProfile.age) {
        dispatch(userAction.editUserProfileAX({ ...editProfile }));
        customAlert.sweetConfirmReload(
          "프로필이 수정되었습니다.",
          null,
          "/mypage"
        );
      } else {
        customAlert.sweetConfirmReload("성별/ 연령", "필수항목입니다.", "");
      }
    }
  };

  // 선택한 파일 정보
  const fileInput = React.useRef();
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    setProfile({ ...editProfile, image: file });
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(userAction.loginCheck("/profile"));
  }, []);

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
      <Grid
        maxWidth="36rem"
        minWidth="32rem"
        minHeight="100vh"
        border={border.line1}
        margin="0 auto"
      >
        <Grid shape="container">
          <Header {...props} shape="프로필수정" />
          <Grid height="4.4rem" />

          <Grid margin="3.6rem auto 2rem">
            <Profile
              user_profile={preview ? preview : user_info?.user_profile}
            />
          </Grid>
          <ProfileCover>
            <input
              type="file"
              id="input-file"
              ref={fileInput}
              onChange={selectFile}
              style={{ display: "none" }}
            />
            <label htmlFor="input-file" value={editProfile.image || ""}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ margin: "3.5rem 0 0 3.8rem" }}
              >
                <path
                  d="M5 12.5558C5 11.4204 5.9204 10.5 7.05576 10.5V10.5C7.83809 10.5 8.55262 10.056 8.89902 9.35449L9.81482 7.5C9.99871 7.12761 10.0907 6.94142 10.2076 6.78792C10.5048 6.39791 10.9348 6.13064 11.4161 6.03689C11.6055 6 11.8132 6 12.2285 6H17.7715C18.1868 6 18.3945 6 18.5839 6.03689C19.0652 6.13064 19.4952 6.39791 19.7924 6.78792C19.9093 6.94142 20.0013 7.12761 20.1852 7.5L21.101 9.35449C21.4474 10.056 22.1619 10.5 22.9442 10.5V10.5C24.0796 10.5 25 11.4204 25 12.5558V18.2143C25 20.8349 25 22.1452 24.2369 22.999C24.1621 23.0827 24.0827 23.1621 23.999 23.2369C23.1452 24 21.8349 24 19.2143 24H10.7857C8.16513 24 6.85484 24 6.00096 23.2369C5.91728 23.1621 5.83786 23.0827 5.76307 22.999C5 22.1452 5 20.8349 5 18.2143V12.5558Z"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle cx="15" cy="16" r="4" stroke="white" strokeWidth="2" />
              </svg>
            </label>
          </ProfileCover>
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
                length={10}
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
                onChange={changeComment}
                value={editProfile?.comment}
                placeholder="어느 지역에서 주로 시켜먹나요?&#13;&#10;제일 좋아하는 음식은 무엇인가요?&#13;&#10;나를 나타낼 수 있는 문구로 소개해보세요!"
              ></TextArea>
            </Grid>
          </FocusWithin>
          <Text
            width="28.8rem"
            height="2.2rem"
            margin="0.4rem auto 0 2rem"
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
          >
            <GenderSelect
              options={gender_options}
              value={editProfile.gender}
              setProfile={setProfile}
              setDisabled={setDisabled}
              editProfile={editProfile}
              onChange={props.onChange}
              gender={editProfile.gender}
            />
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
          >
            <AgeSelect
              options={age_options}
              value={editProfile.age}
              setProfile={setProfile}
              setDisabled={setDisabled}
              editProfile={editProfile}
              onChange={props.onChange}
              age={editProfile.age}
            />
          </Grid>
        </Grid>

        <Grid
          height="auto"
          maxWidth="35.5rem"
          margin="0 auto 0 0.1rem"
          padding="2.8rem 2rem 2.7rem"
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
    );
  } else {
    return <Spinner />;
  }
};

ProfileEdit.defaultProps = {};

const Profile = styled.div`
  margin: auto;
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
  margin-left: 12.9rem;
  top: 8.1rem;
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
  &::placeholder {
    color: ${theme.color.bg80};
    font-size: ${theme.fontSize.base};
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.01rem;
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
