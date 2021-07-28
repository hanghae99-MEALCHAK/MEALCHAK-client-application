import React from "react";
import styled from "styled-components";
import { useState } from "react";
import logger from "../shared/Console";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postAction } from "../redux/modules/post";
import { history } from "../redux/configureStore";

// style
import { Button, Grid, Text } from "../elements";
import UploadInput from "../components/UploadInput";
import UploadContents from "../components/UploadContents";

const Upload = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  const [post_info, setPostInfo] = useState({});

  const uploadBtn = () => {
    logger("업로드 버튼, post_info", post_info);

    if (!post_info.title || post_info.title === "") {
      window.alert("모집글의 제목을 입력해주세요.");
      return;
    }
    if (!post_info.contents || post_info.contents === "") {
      window.alert("모집글의 내용을 입력해주세요.");
      return;
    }
    if (!post_info.place || post_info.place === "") {
      window.alert(
        "안전한 더치페이를 위해 모집원을 만날 장소가 필요합니다.\n 약속 장소를 입력해주세요."
      );
      return;
    }
    if (!post_info.restaurant || post_info.restaurant === "") {
      window.alert("배달 예정인 식당을 입력해주세요.");
      return;
    }
    if (!post_info.headCount || post_info.headCount === "0") {
      window.alert("모집원의 인원 수를 입력해주세요.");
      return;
    }
    if (!post_info.appointmentTime || post_info.appointmentTime === "") {
      window.alert("모집원을 만날 시간을 입력해주세요.");
      return;
    }
    if (!post_info.foodCategory || post_info.foodCategory === "") {
      window.alert("모집을 희망하는 식품의 카테고리를 입력해주세요.");
      return;
    }

    dispatch(postAction.addPostAX(post_info));
  };

  if (is_login) {
    return (
      <Grid maxWidth="36rem" border="1px solid #CFCFCF" margin="0 auto">
        <Container>
          <Grid is_flex4="t" height="4.4rem">
            <span
              className="material-icons-outlined"
              style={{
                fontSize: "1.9rem",
                position: "absolute",
                marginLeft: "1.2rem",
              }}
            >
              close
            </span>
            <Text margin="auto" size="1.6rem" bold2="700">
              글쓰기
            </Text>
          </Grid>
          <UploadContents
            onChange={(value) => setPostInfo({ ...post_info, ...value })}
          />

          <Grid borderBottom="1px solid #CFCFCF"></Grid>
          <UploadInput
            onChange={(value) => setPostInfo({ ...post_info, ...value })}
          />
          <Grid height="10rem" />
          <Grid
            height="auto"
            maxWidth="35.5rem"
            margin="0 auto"
            padding="2.8rem 2rem 2.7rem"
            is_fixed="t"
            bg="#ffffff"
            margin="0 auto"
          >
            <Button
              bg="#FF9425"
              height="5rem"
              border="none"
              radius="1.4rem"
              _onClick={uploadBtn}
            >
              <Text color="#ffffff" bold2="700" size="1.6rem">
                밀착할 사람 모집하기
              </Text>
            </Button>
          </Grid>
        </Container>
      </Grid>
    );
  } else {
    return (
      <Grid maxWidth="36rem" margin="0 auto" padding='2rem'>
        <Container>
          <Text size="2.5rem" bold="t" margin="3rem 0.5rem">
            앗 - 잠깐!
          </Text>
          <Text size="1.6rem" bold="t" margin="3rem 0.5rem 3rem">
            로그인 후에만 글을 쓸 수 있어요!
          </Text>
          <Button
              bg="#FF9425"
              height="5rem"
              border="none"
              radius="1.4rem"

            // 튜토리얼, 메인페이지 주소 변경 후 수정 필요
              _onClick={() => {history.replace('/tutorial')}}
            >
              <Text color="#ffffff" bold2="700" size="1.6rem">
                로그인하러 가기
              </Text>
            </Button>
        </Container>
      </Grid>
    );
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Upload;
