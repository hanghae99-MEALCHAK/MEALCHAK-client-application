import React from 'react';
import styled from 'styled-components';

import { Grid, Text } from '../elements';
import theme from '../styles/theme';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import '../shared/Swiper.scss';

import logger from '../shared/Console';

SwiperCore.use([Pagination, Autoplay]);

const MainBanner = (props) => {
  const { color } = theme;
  const rank_list = Object.values(props);

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
          autoplay={{ delay: 30000 }}
        >
          {rank_list.map((p, idx) => {
            return (
              <SwiperSlide key={idx}>
                <Grid width="36rem" height="12.6rem" margin="0.5rem auto">
                  <MainBannerBtn src={p.imgUrl}>
                    <Grid position="absolute" top="6.5rem" right="8.5rem">
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
  background-image: url('${(props) => props.src}');
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
