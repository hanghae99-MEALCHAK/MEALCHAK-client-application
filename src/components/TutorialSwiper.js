import React from 'react';
import styled from 'styled-components';

import { Grid, Text } from '../elements';
import theme from '../styles/theme';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import logger from '../shared/Console';

SwiperCore.use([Pagination, Navigation]);

const TutorialSwiper = (props) => {
  return (
    <React.Fragment>
      <div>
        {/* <img src="/illust/logo_2x.png" alt="logo" />
        <ElLogo /> */}
        <Swiper
          className="banner"
          spaceBetween={50}
          slidesPerView={1}
          //   navigation
          pagination={{
            // el: '.my-custom-pagination-div',
            clickable: true,
          }}
        >
          <SwiperSlide>
            <Grid height="40rem">
              <ElIntro src="/illust/introA.svg"></ElIntro>
            </Grid>
            <Grid is_fixed bottom="-29rem">
              <Text>배달은 한 번만</Text>
              <Text>밀착에서는 함께 배달시켜 먹으니까</Text>
              <Text>배달비 부담은 덜고 자연은 더해요!</Text>
            </Grid>
          </SwiperSlide>
          <SwiperSlide>
            <Grid height="30rem">
              <ElIntro src="/illust/introB.svg"></ElIntro>
            </Grid>
          </SwiperSlide>
          <SwiperSlide>
            <Grid height="30rem">
              <ElIntro src="/illust/introC.svg"></ElIntro>
            </Grid>
          </SwiperSlide>
        </Swiper>
      </div>
    </React.Fragment>
  );
};

TutorialSwiper.defaultProps = {};

const TutorialBox = styled.div`
  /* max-width: 27rem; */
  height: 30rem;
  /* margin: 1rem auto; */
  border-radius: 1rem;
  /* background-image: url('https://cdn.pixabay.com/photo/2016/06/06/18/29/meat-skewer-1440105__340.jpg'); */
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

const ElIntro = styled.div`
  /* position: fixed; */
  background-image: url('${(props) => props.src}');
  width: 320px;
  height: 320px;
  background-size: cover;
  background-position: center center;
`;

export default TutorialSwiper;
