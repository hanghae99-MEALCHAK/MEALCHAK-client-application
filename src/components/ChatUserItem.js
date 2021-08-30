// 채팅방 안 사이드 바의 참여중인 사용자 리스트
import React from "react";
import { history } from "../redux/configureStore";
// style
import theme from "../styles/theme";
import { IoIosCloseCircle } from "react-icons/io";
import { customAlert } from "./Sweet";
import { Grid, Image, Text } from "../elements";

const ChatUserItem = (props) => {
  //SideContent.js 의 props
  const { fontSize, color } = theme;
  const user_info = props.user_info; // 참여중인 사용자 정보
  const shape = props.shape; // 참여 중인 사용자 목록에서 나의 정보인 경우
  const owner = props.owner; // 내가 방장 일때, 다른 사용자의 정보 목록의 경우 받아오는 props

  // 목록 정보가 나인 경우
  // 리스트 최상단으로 고정해서 보여 줌
  if (shape === "is_me") {
    return (
      <Grid is_flex4="t" padding="0.8rem 0 0.8rem 2rem">
        <Image
          margin="0.4rem 0.8rem 0.4rem 0"
          cursor="pointer"
          _onClick={() => {
            history.push({
              pathname: `/myprofile`, // 내 프로필 보기
              state: { user_id: user_info.user_id },
            });
          }}
          src={user_info.user_img}
        ></Image>
        <Text bold2="700" size={fontSize.base}>
          나 ({user_info.user_name})
        </Text>
        {user_info.user_id === props.own_user_id && ( //방장 태그 달기
          <Text
            width="2.7rem"
            height="1.5rem"
            margin="0 0 0 0.4rem"
            size={fontSize.tiny}
            bg={color.brand20}
            color={color.brand100}
            radius="0.4rem"
            bold2="700"
            text_align="center"
          >
            방장
          </Text>
        )}
      </Grid>
    );
  }

  // 타 사용자 리스트 뷰
  // 내가 방장 일때
  if (owner) {
    return (
      <Grid is_flex4="t" padding="0.8rem 2rem">
        <Grid is_flex4="t">
          <Image
            margin="0.4rem 0.8rem 0.4rem 0"
            cursor="pointer"
            shape="circle"
            src={user_info.user_img}
            _onClick={() => {
              history.push({
                pathname: `/userprofile/${user_info.user_id}`, // 타 사용자 프로필 보기
                state: { user_id: user_info.user_id },
              });
            }}
          ></Image>
          <Text size={fontSize.base}>{user_info.user_name}</Text>
        </Grid>
        <IoIosCloseCircle // 내가 방장인 경우, 타 사용자 강퇴 아이콘이 보임
          size="2.4rem"
          color={color.bg60}
          onClick={() => {
            // 강퇴 알럿
            customAlert.SweetBen(
              props.sendBen, // 알럿 자체에서 강퇴 함수 실행되도록 props 넘김
              user_info.user_id, // 강퇴 시 필요한 타 사용자 id 정보
              user_info.user_name // 타 사용자 이름
            );
          }}
        />
      </Grid>
    );
  }

  // 타 사용자 리스트 뷰
  // 내가 방장이 아닐 때
  return (
    <Grid is_flex4="t" padding="0.8rem 0 0.8rem 2rem">
      <Image
        margin="0.4rem 0.8rem 0.4rem 0"
        cursor="pointer"
        shape="circle"
        src={user_info.user_img}
        _onClick={() => {
          history.push({
            pathname: `/userprofile/${props?.user_info.user_id}`, // 타 사용자 프로필 보기
            state: { user_id: props.user_info.user_id },
          });
        }}
      ></Image>
      <Text size={fontSize.base}>{user_info.user_name}</Text>
      {user_info.user_id === props.own_user_id && ( // 방장 태그 달기
        <Text
          padding="0.1rem"
          width="2.7rem"
          height="1.5rem"
          margin="0 0 0 0.4rem"
          size={fontSize.tiny}
          bg={color.brand20}
          color={color.brand100}
          radius="0.4rem"
          bold2="700"
          text_align="center"
        >
          방장
        </Text>
      )}
    </Grid>
  );
};

export default ChatUserItem;
