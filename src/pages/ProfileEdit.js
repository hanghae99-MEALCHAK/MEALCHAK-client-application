import React from "react";
import styled from "styled-components";
import { useState } from "react";
import logger from "../shared/Console";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as postAction } from "../redux/modules/post";
import { actionCreators as userAction } from "../redux/modules/user";
import { actionCreators as imageActions } from "../redux/modules/image";

import { Kakao_auth_url } from "../shared/OAuth";
import Spinner from "../shared/Spinner";

// style
import { Button, Grid, Input, Text, Image } from "../elements";
import { Header, Footer } from "../components";
import theme from "../styles/theme";
import { customAlert } from "../components/Sweet";
import { actionCreators } from "../redux/modules/image";

const ProfileEdit = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const user_info = useSelector((state) => state.user?.user);
  const preview = useSelector((state) => state.image?.preview);

  const { color, border, radius, fontSize } = theme;

  const [editProfile, setProfile] = useState({
    nickname: user_info?.user_nickname,
    comment: user_info?.user_comment ? user_info?.user_comment : "",
    image: user_info?.user_profile,
  });
  const fileInput = React.useRef();
  const [disabled, setDisabled] = useState(true);

  const changeNick = (e) => {
    setProfile({ ...editProfile, nickname: e.target.value });
    setDisabled(false);
  };

  const changeComment = (e) => {
    setProfile({ ...editProfile, comment: e.target.value });
    setDisabled(false);
  };

  const editUser = () => {
    if (window.confirm("프로필을 수정하시겠습니까?")) {
      logger("수정할 이름", editProfile.nickname);
      logger("수정할 이름", editProfile.comment);
      dispatch(
        userAction.editUserProfileAX({
          username: editProfile.nickname,
          comment: editProfile.comment,
          image: editProfile.image,
        })
      );
      customAlert.sweetConfirmReload(
        "프로필이 수정되었습니다.",
        null,
        "/mypage"
      );
    }
  };

  // 선택한 파일 정보
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
    if (!editProfile.comment || editProfile.nickname) {
      setProfile({ ...editProfile, nickname: user_info?.user_nickname });
      setProfile({ ...editProfile, comment: user_info?.user_comment });
    }
    dispatch(userAction.loginCheck());
  }, []);

  React.useEffect(() => {
    if (!editProfile.comment || !editProfile.nickname) {
      setDisabled(true);
    } else if (editProfile.comment || editProfile.nickname) {
      setDisabled(false);
    }
  }, [editProfile.comment, editProfile.nickname]);

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
          <Grid borderBottom={border.boldLine} />

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
                border="1px solid #C7C8CE"
                padding="1.5rem 1.3rem"
                size={fontSize.base}
                color={color.bg60}
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
              margin="0 auto"
            >
              <Text
                width="32rem"
                height="2.4rem"
                bold2="500"
                size={fontSize.base}
                color={color.bg100}
                line_height="150%"
              >
                한 줄 소개
              </Text>
              <Input
                border="1px solid #C7C8CE"
                padding="1.5rem 1.3rem"
                size={fontSize.base}
                color={color.bg60}
                length={20}
                placeholder="한 줄 소개를 입력해주세요"
                value={editProfile?.comment}
                _onChange={changeComment}
              />
            </Grid>
          </FocusWithin>
          <Text
            width="28.8rem"
            height="2.2rem"
            margin="0 auto 0 2rem"
            color="#9A9896"
            size={fontSize.small}
            line_height="150%"
          >
            20글자까지 입력할 수 있어요.
          </Text>
        </Grid>
        <Grid
          height="auto"
          maxWidth="35.5rem"
          margin="0 auto 0 0.1rem"
          padding="2.8rem 2rem 2.7rem"
          is_fixed="t"
          bg={color.bg0}
        >
          <Button
            bg={disabled ? "gray" : color.brand100}
            height="5rem"
            border="none"
            radius={radius.button}
            cursor="t"
            disabled={disabled}
            _onClick={editUser}
          >
            <Text color={color.bg0} bold2="700" size={fontSize.base}>
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
  margin-left: 13rem;
  top: 9rem;
  width: 10rem;
  height: 10rem;
  border-radius: 5rem;
  background: rgba(54, 55, 60, 0.4);
  background-size: cover;
  background-position: center;
  opacity: 0.7;
  border: none;
`;

const FocusWithin = styled.div`
  &:focus-within p {
    color: #ff9425;
  }
  &:focus-within input {
    border: 1px solid #ff9425;
    outline: none;
  }
`;
export default ProfileEdit;
