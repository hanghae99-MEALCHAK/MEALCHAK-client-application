// 채팅 사이드바 컴포넌트
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChatUserItem } from ".";
import moment from "moment";
import { actionCreators as chatActions } from "../redux/modules/chat";

// style
import { Grid, Text, Image } from "../elements";
import theme from "../styles/theme";
import { customAlert } from "./Sweet";

// 이미지, 아이콘의 경우 webp 사용
// webp 사용 불가 환경일 경우만 png
import { png } from "../styles/img/index";
import { webp } from "../styles/img/webp/index";
import { isWebpSupported } from "react-image-webp/dist/utils";

const SideContent = (props) => {
  const { color, border, fontSize } = theme;
  const dispatch = useDispatch();
  const user_in_chat = useSelector((state) => state.chat.userInList);
  const my_id = useSelector((state) => state.user.user?.user_id);
  const own_user_id = props.own_user_id;
  const order_time = props.order_time;

  // 시간
  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "d").format("YYYY-MM-DD");
  const is_today = today === order_time.split(" ")[0] ? true : false;
  const is_tomorrow = tomorrow === order_time.split(" ")[0] ? true : false;

  // 연, 월
  const ym = props.order_time.split("-");
  // 일
  const day = ym[2].split(" ");
  // 시, 분
  const hm = day[1].split(":");

  // 날짜에 따라서 side bar 표시 변경 함수
  const date_time = () => {
    if (is_today) {
      return `오늘 ${hm[0]}:${hm[1]}`;
    }
    if (is_tomorrow) {
      return `내일 ${hm[0]}:${hm[1]}`;
    }
    if (
      parseInt(today.split("-").join("")) >
      parseInt(order_time.split(" ")[0].split("-").join(""))
    ) {
      return false;
    } else {
      return `${ym[1]}월 ${day[0]}일 ${hm[0]}:${hm[1]}`;
    }
  };

  // 방 나가기 - 사용자, 방장 구분 후 실행하는 함수
  const get_out_chat = (post_id) => {
    if (my_id === own_user_id) {
      customAlert.SweetBreak(props.sendBreak, post_id);
    } else {
      dispatch(chatActions.leaveChatAX(post_id));
    }
  };

  return (
    <React.Fragment>
      <Grid shape="container" text_align="left">
        <Grid padding="1.6rem 2rem 0.4rem" flex_direction="column">
          <Text size={fontSize.base} bold2="700">
            {props.roomName}
          </Text>
        </Grid>

        {/* 채팅 만남 일정 표시 */}
        <Grid padding="0 2rem 1.6rem" borderBottom={border.line2}>
          {date_time() ? ( // 모집 마감 여부 판단
            <Text
              size={fontSize.small}
              color={color.bg80}
              margin="0.4rem 0 0"
              bold2="500"
            >
              만남 예정 시간
              <span style={{ fontWeight: "400", marginLeft: "0.5rem" }}>
                {/* 오늘, 내일, 날짜 표시 */}
                {date_time()}
              </span>
            </Text>
          ) : (
            <Text
              size={fontSize.small}
              color={color.bg80}
              margin="0.4rem 0 0"
              bold2="500"
            >
              모집 기간 만료
            </Text>
          )}
        </Grid>

        {/* 채팅 참여 인원수 표시 */}
        <Grid padding="1.6rem 0 0.8rem 2.4rem">
          <Text size={fontSize.base} color={color.bg80}>
            대화상대
            <span
              style={{
                padding: "0 0.6rem",
                fontSize: fontSize.base,
                fontWeight: 700,
                color: color.brand100,
              }}
            >
              {user_in_chat?.length}
            </span>
          </Text>
        </Grid>

        {/* 채팅 참여중인 사용자 목록 표시 */}
        {user_in_chat?.map((user_info, idx) => {
          //  해당 참여자 정보가 나인 경우
          if (my_id === user_info?.user_id) {
            return (
              <ChatUserItem
                key={idx}
                user_info={user_info}
                shape="is_me" // 내 정보 여부 판단
                own_user_id={own_user_id}
              />
            );
          }
        })}
        {user_in_chat?.map((user_info, idx) => {
          //  해당 참여자 정보가 남인 경우
          if (my_id !== user_info?.user_id) {
            // 내가 방장 일때, 다른 사용자의 정보 목록의 경우
            if (my_id === own_user_id) {
              return (
                <ChatUserItem
                  key={idx}
                  user_info={user_info}
                  owner={true} // 방장 여부 판단
                  sendBen={props.sendBen} // 강퇴기능 함수 추가
                />
              );
            } else {
              return (
                // 그 외 단순 내가 참여자인 경우 다른 사용자 목록
                <ChatUserItem
                  key={idx}
                  user_info={user_info}
                  own_user_id={own_user_id} // 방장 아이디
                />
              );
            }
          }
        })}
      </Grid>
      <Grid
        borderTop={border.line2}
        position="absolute"
        align_items="center"
        justify_content="space-between"
        flex
        padding="0 2rem"
        height="5rem"
        bg={color.bg0}
      >
        {/* 채팅방 나가기 */}
        <Grid width="auto" height="auto">
          <Image
            size="2.4"
            src={isWebpSupported() ? webp.exitWebp : png.exit}
            cursor="pointer"
            _onClick={() => {
              get_out_chat(props.post_id); // 채팅방 나가기 함수
            }}
          />
        </Grid>

        {/* 사이드바 닫기 */}
        <Grid width="auto" height="auto">
          <Text
            size={fontSize.small}
            color={color.brand100}
            cursor="pointer"
            _onClick={props._onClick}
            bold2={fontSize.medium}
          >
            닫기
          </Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SideContent;
