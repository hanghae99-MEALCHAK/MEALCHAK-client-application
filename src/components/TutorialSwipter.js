import React from 'react';
import styled from 'styled-components';

import { Grid, Text } from '../elements';
import theme from '../styles/theme';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Pagination, Navigation]);

const TutorialSwipter = (props) => {
  const imgList = [
    {
      id: 1,
      mainURL:
        'https://cdn.pixabay.com/photo/2019/05/08/07/45/friends-4187953__340.png',
    },
    {
      id: 2,
      mainURL:
        'https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597__340.png',
    },
    {
      id: 3,
      mainURL:
        'https://cdn.pixabay.com/photo/2015/11/15/21/31/lego-1044891__340.jpg',
    },
  ];

  return (
    <React.Fragment>
      <div>
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
          {imgList.map((p) => {
            return (
              <div>
                <SwiperSlide>
                  <Grid width="auto" height="40rem">
                    <TutorialImg src={p.mainURL}></TutorialImg>
                  </Grid>
                </SwiperSlide>
                {/* <div class="my-custom-pagination-div" /> */}
              </div>
            );
          })}
        </Swiper>
      </div>
    </React.Fragment>
  );
};

TutorialSwipter.defaultProps = {};

const TutorialImg = styled.div`
  max-width: 32rem;
  height: 38rem;
  margin: 0 auto;
  border-radius: 1rem;
  /* background-image: url('https://cdn.pixabay.com/photo/2016/06/06/18/29/meat-skewer-1440105__340.jpg'); */
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

export default TutorialSwipter;
