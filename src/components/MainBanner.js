import React from "react";
import styled from "styled-components";

import { Grid, Text } from "../elements";
import theme from "../styles/theme";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "../shared/Swiper.scss";

import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import logger from "../shared/Console";

SwiperCore.use([Pagination, Autoplay]);

const MainBanner = (props) => {
  const { color } = theme;

  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post?.list);
  const rank_list = Object.values(props);

  logger("MainBanner props : ", props);

  return (
    <React.Fragment>
      <div>
        <Swiper
          className="banner"
          spaceBetween={50}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 3000 }}
          // autoplay={{ delay: 30000 }}
        >
          {rank_list.map((p, idx) => {
            return (
              <SwiperSlide key={idx}>
                <Grid
                  width="36rem"
                  height="12.6rem"
                  margin="0.5rem auto"
                  cursor="t"
                  _onClick={() => {
                    if (post_list?.length !== 0) {
                      document
                        .querySelector("body")
                        .scrollTo({ top: 410, left: 0, behavior: "smooth" });
                    }
                    if (p.category === "한식") {
                      dispatch(postActions.getPostAX(p.category));
                      props?.getCategory({ kr: true });
                      props?.getCtg(p.category);
                      props?.getSort();
                    }
                    if (p.category === "중식") {
                      dispatch(postActions.getPostAX(p.category));
                      props?.getCategory({ cn: true });
                      props?.getCtg(p.category);
                      props?.getSort();
                    }
                    if (p.category === "일식") {
                      dispatch(postActions.getPostAX(p.category));
                      props?.getCategory({ jp: true });
                      props?.getCtg(p.category);
                      props?.getSort();
                    }
                    if (p.category === "양식") {
                      dispatch(postActions.getPostAX(p.category));
                      props?.getCategory({ west: true });
                      props?.getCtg(p.category);
                      props?.getSort();
                    }
                    if (p.category === "카페") {
                      dispatch(postActions.getPostAX(p.category));
                      props?.getCategory({ cafe: true });
                      props?.getCtg(p.category);
                      props?.getSort();
                    }
                    if (p.category === "기타") {
                      dispatch(postActions.getPostAX(p.category));
                      props?.getCategory({ etc: true });
                      props?.getCtg(p.category);
                      props?.getSort();
                    }
                  }}
                >
                  <MainBannerBtn src={p.imgUrl}>
                    <Grid position="relative" top="6.1rem" right="9.1rem">
                      <Text
                        size="1.6rem"
                        text_align="center"
                        color={color.brand100}
                      >
                        <SpanTag>{idx + 1}위</SpanTag>
                        &nbsp;&nbsp;&nbsp;
                        <SpanTag>#{p.category}</SpanTag>
                      </Text>
                    </Grid>
                  </MainBannerBtn>
                </Grid>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Grid height="1.2rem" />
      </div>
    </React.Fragment>
  );
};

MainBanner.defaultProps = {};

const MainBannerBtn = styled.div`
  max-width: 32rem;
  height: 10rem;
  margin: 1rem auto;
  border-radius: 1rem;
  /* background-image: url('https://cdn.pixabay.com/photo/2016/06/06/18/29/meat-skewer-1440105__340.jpg'); */
  background-image: url("${(props) => props.src}");
  background-size: cover;
  filter: drop-shadow(0px 0px 0.5rem rgba(0, 0, 0, 0.2));
`;

const SpanTag = styled.span`
  font-weight: 700;
  background-color: ${(props) => props.theme.color.bg0};
  padding: 0.2rem 0.8rem;
  border-radius: 0.4rem;
`;

export default MainBanner;
