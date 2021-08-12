import React from "react";
import { useSelector } from "react-redux";
import logger from "../shared/Console";
import { ChatUserItem } from ".";
import moment from "moment";

// style
import { Grid, Text, Image } from "../elements";
import theme from "../styles/theme";
import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { customAlert } from "./Sweet";

const SideContent = (props) => {
  const user_in_chat = useSelector((state) => state.chat.userInList);
  const my_id = useSelector((state) => state.user.user?.user_id);
  const own_user_id = props.own_user_id;
  const order_time = props.order_time;

  // 시간
  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "d").format("YYYY-MM-DD");
  const pass_day = parseInt(today.split("-").join(""));
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

  // 방 나가기 사용자 방장 구분 후 실행하는 함수
  const get_out_chat = (post_id) => {
    if (my_id === own_user_id) {
      customAlert.SweetBreak(props.sendBreak, post_id);
    } else {
      customAlert.SweetOutChat(post_id);
    }
  };

  React.useEffect(() => {
    logger("사용자 목록", user_in_chat);
    logger("order_time", order_time);
  }, []);

  const { color, border, fontSize } = theme;

  return (
    <React.Fragment>
        <Grid shape="container" text_align="left">
          <Grid
            padding="1.6rem 2rem 0.4rem"
            flex_direction="column"
          >
            <Text size={fontSize.base} bold2="700">
              {props.roomName}
            </Text>
          </Grid>

          <Grid
          padding="0 2rem 1.6rem"
          borderBottom={border.line2}
          >
            {date_time() ? (
              <Text
                size={fontSize.small}
                color={color.bg80}
                margin="0.4rem 0 0"
                bold2="500"
              >
                예상 만남 시간
                <span style={{ fontWeight: "400", marginLeft: "0.5rem" }}>
                  {/* {ym[1]}월 {day[0]}일 {hm[0]}:{hm[1]} */}
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

          {user_in_chat?.map((user_info, idx) => {
            if (my_id === user_info?.user_id) {
              return (
                <ChatUserItem
                  key={idx}
                  user_info={user_info}
                  shape="is_me"
                  own_user_id={own_user_id}
                />
              );
            }
          })}
          {user_in_chat?.map((user_info, idx) => {
            if (my_id !== user_info?.user_id) {
              if (my_id === own_user_id) {
                return (
                  <ChatUserItem
                    key={idx}
                    user_info={user_info}
                    owner={true}
                    sendBen={props.sendBen}
                  />
                );
              } else {
                return (
                  <ChatUserItem
                    key={idx}
                    user_info={user_info}
                    own_user_id={own_user_id}
                  />
                );
              }
            }
          })}
        </Grid>
        <Grid
          borderTop={border.line2}
          position="absolute"
          align_items="flex-end"
          justify_content="space-between"
          flex
          padding="1.3rem 2.4rem"
          height="auto"
          bg={color.bg0}
        >
          <FiLogOut
            size="2.4rem"
            style={{ cursor: "pointer" }}
            onClick={() => {
              get_out_chat(props.post_id);
            }}
          />
          <Grid width="auto">
            <Text
              size={fontSize.small}
              color={color.brand100}
              cursor="pointer"
              _onClick={props._onClick}
            >
              닫기
            </Text>
          </Grid>
        </Grid>
    </React.Fragment>
  );
};


export default SideContent;
