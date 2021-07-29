import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import { Grid, Button, Text, Image } from "../elements";

import theme from "../styles/theme";

const DetailPost = (props) => {
  const {
    post_id,
    title,
    headCount,
    insert_dt,
    address,
    orderTime,
    contents,
    shop,
    createdAt,
    username,
    user_id,
  } = props;

  const { color } = theme;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Grid
        width="30rem"
        margin="1.6rem auto"
        padding="1.6rem"
        is_border="0.1rem solid #EBE9E8"
        radius="1.6rem"
      >
        <Grid>
          <Grid is_flex>
            <Grid width="auto">
              <Image shape="circle" size="4" />
            </Grid>
            <Grid>
              <Text bold size="1.3rem" color={color.bg100}>
                {username}
              </Text>
              <Text width="10rem" size="1rem" color={color.bg60}>
                {insert_dt}
              </Text>
            </Grid>
            <Grid
              is_flex4
              width="9.1rem"
              height="2.3rem"
              radius="0.5rem"
              bg={color.bg20}
            >
              <Text
                text_align="center"
                width="9.1rem"
                bold2="700"
                size="1rem"
                color={color.brand100}
              >
                모집 인원 2명/{headCount}명
              </Text>
            </Grid>
          </Grid>
          <Grid>
            <Text
              margin="1.6rem 0 0.8rem 0"
              bold
              size="1.6rem"
              color={color.bg100}
            >
              {title}
            </Text>
            <Text size="1.3rem" color={color.bg100}>
              {contents}
            </Text>
          </Grid>
          <GreyLine />
          <Grid>
            <Text margin="0.8rem 0" size="1.3rem" color={color.bg80}>
              배달 받을 곳
            </Text>
            <Text margin="0 0 1.6rem 0" size="1.3rem" color={color.bg100}>
              {address}
            </Text>
          </Grid>
          <GreyLine />
          <Grid is_flex>
            <Grid>
              <Text margin="0.8rem 0" size="1.3rem" color={color.bg80}>
                배달 식당
              </Text>
              <Text size="1.3rem" color={color.bg100}>
                {props.shop}
              </Text>
            </Grid>
            <Grid is_flex>
              <Grid>
                <Text margin="0.8rem 0" size="1.3rem" color={color.bg80}>
                  주문 예정 시각
                </Text>
                <Text size="1.3rem" color={color.bg100}>
                  {orderTime}
                </Text>
              </Grid>
            </Grid>
          </Grid>
          <Grid is_flex></Grid>
        </Grid>
      </Grid>
      {props.is_me && (
        <Grid text_align="center">
          <Button shape="large" color={color.bg60} _onClick={() => {
            history.push(`/upload/${post_id}`)
          }}>
            <Text bold size="1.6rem" color={color.bg0}>
              수정하기
            </Text>
          </Button>
        </Grid>
      )}

      <Button is_float bg={color.brand100}>
        <Text bold size="1.6rem" color={color.bg0}>
          채팅 시작하기
        </Text>
      </Button>
    </React.Fragment>
  );
};

DetailPost.defaultProps = {};

const DeatilHeader = styled.div`
  margin: 1rem auto;
  text-align: center;
  vertical-align: middle;
`;

const GreyLine = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 1px;
  margin: 1rem auto;
  background-color: #f1f2f4;
`;

export default DetailPost;
