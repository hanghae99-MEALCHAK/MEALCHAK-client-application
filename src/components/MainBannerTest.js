import React from 'react';
import styled from 'styled-components';

import { Grid, Text } from '../elements';
import theme from '../styles/theme';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Pagination, Autoplay]);

const MainBannerTest = (props) => {
  const { color } = theme;
  // console.log(props.imgList.map(src =>));

  props.imgList.map((src) => {
    return console.log(src.mainURL);
  });
  // const imgList = [
  //   {
  //     mainURL:
  //       'https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665__340.jpg',
  //   },
  //   {
  //     mainURL:
  //       'https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523__340.jpg',
  //   },
  //   {
  //     mainURL:
  //       'https://cdn.pixabay.com/photo/2016/06/06/18/29/meat-skewer-1440105__340.jpg',
  //   },
  // ];

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
          autoplay={{ delay: 1000 }}
        >
          {props.imgList.map((p) => {
            return (
              <SwiperSlide>
                <Grid width="36rem">
                  <MainBannerBtn src={p.mainURL}>
                    {/* <Grid
                      position="absolute"
                      top="23rem"
                      right="8.5rem"
                      is_flex3
                    >
                      <Text
                        width="auto"
                        height="2rem"
                        size="1.3rem"
                        padding="0rem 0.8rem"
                        bold
                        text_align="center"
                        color={color.brand100}
                        bg={color.bg0}
                        radius="0.4rem"
                      >
                        {p.id}위
                      </Text>
                      <Text
                        width="auto"
                        height="2rem"
                        size="1.3rem"
                        padding="0rem 0.8rem"
                        bold
                        text_align="center"
                        margin="0 0 0 0.8rem"
                        color={color.brand100}
                        bg={color.bg0}
                        radius="0.4rem"
                      >
                        #떡볶이
                      </Text>
                    </Grid> */}

                    {/* <Grid>
                      <Text
                        size="1.3rem"
                        bold
                        shadow="0rem 0.4rem 0.4rem rgba(0, 0, 0, 0.25)"
                        text_align="center"
                        margin="1rem 0"
                      >
                        1위&nbsp;
                        <span style={{ fontWeight: '400' }}>#떡볶이</span>
                      </Text>
                    </Grid> */}
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

MainBannerTest.defaultProps = {};

const MainBannerBtn = styled.div`
  max-width: 32rem;
  height: 10rem;
  margin: 0 auto;
  border-radius: 1rem;
  /* background-image: url('https://cdn.pixabay.com/photo/2016/06/06/18/29/meat-skewer-1440105__340.jpg'); */
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

export default MainBannerTest;
