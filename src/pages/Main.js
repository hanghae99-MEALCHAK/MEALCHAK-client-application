import React from "react";
import styled from "styled-components";

import { Grid, Text, Button } from "../elements";
import { Post, Footer, Header, MainBanner } from "../components";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import logger from "../shared/Console";

import theme from "../styles/theme";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import '../shared/Swiper.scss';

const Main = (props) => {
  const { color, border, btn_border, fontSize } = theme;

  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post?.list);
  const user = useSelector((state) => state.user.user);
  const rank_list = useSelector((state) => state.post?.rank);

  const [category, setCategory] = React.useState({
    all: true,
    kr: false,
    cn: false,
    jp: false,
    west: false,
    cafe: false,
    etc: false,
  });

  const [sort, setSort] = React.useState({
    recent: true,
    nearBy: false,
  });
  const [ctg, setCtg] = React.useState("");

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostAX("전체"));
      setCtg("전체");
    }
    dispatch(postActions.getRankDB());
  }, []);

  console.log(category);
  return (
    <React.Fragment>
      <Grid
        minHeight="100vh"
        minWidth="36rem"
        maxWidth="36rem"
        margin="0 auto"
        border={border.line1}
      >
        <Grid shape="container">
          <Header {...props} shape="홈">
            {user?.user_address}
          </Header>
          <Footer {...props}></Footer>
        </Grid>
        <Grid width="36rem" margin="0 0 1rem 0">
          <Button
            width="32rem"
            height="4.4rem"
            margin="0 1.8rem"
            padding="0 0 0 1.5rem"
            bg={color.bg0}
            border={btn_border.bg40}
            radius="1.2rem"
            _onClick={() => {
              history.push("/search");
            }}
          >
            <Text
              minWidth="17rem"
              height="2rem"
              size={fontSize.small}
              bold2="400"
              line_height="150%"
              color={color.bg80}
              text_align="left"
            >
              오늘은 어떤 음식을 배달 시킬까?
            </Text>
            <svg
              style={{
                position: "absolute",
                top: "6.5rem",
                margin: "0 0 0 12rem",
              }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="6" stroke="#36373C" strokeWidth="2" />
              <path
                d="M16 16C17.1716 17.1716 19 19 19 19"
                stroke="#36373C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </Grid>
        <Grid is_float="left">
          <Grid maxWidth="15rem">
            <Text
              size="1.6rem"
              color={color.bg100}
              padding="0.8rem 0 0 0"
              margin="0 0 0 2.1rem"
              bold
            >
              #오늘의 인기 메뉴
            </Text>
          </Grid>
          <MainBanner {...rank_list}></MainBanner>
          <Grid height="0.8rem" bg="#f4f4f3" />
        </Grid>
        <Grid
          maxWidth="33.3rem"
          height="3.2rem"
          margin="0 auto"
          flex
          flex_direction="row"
          align_items="center"
          padding="2rem 0 1.6rem 0"
        >
// <<<<<<< feature/gw
//           <Swiper
//             className="category"
//             slidesPerView={'auto'}
//             autoplay={{ delay: 1000 }}
// =======
//           <Text
//             width="3rem"
//             height="2.4rem"
//             size={fontSize.base}
//             bold
//             cursor="t"
//             margin="-0.7rem 0.9rem 0"
//             border_bottom={category.all ? "0.1rem solid black" : ""}
//             _onClick={(e) => {
//               dispatch(postActions.getPostAX(e.target.innerText));
//               setCategory({ ...{ category: false }, all: true });
//               setCtg(e.target.innerText);
//             }}
//           >
//             전체
//           </Text>
//           <Text
//             width="3rem"
//             height="2.4rem"
//             size="1.6rem"
//             bold
//             cursor="t"
//             margin="-0.7rem 0.9rem 0"
//             border_bottom={category.kr ? "0.1rem solid black" : ""}
//             _onClick={(e) => {
//               dispatch(postActions.getPostAX(e.target.innerText));
//               setCategory({ ...{ category: false }, kr: true });
//               setCtg(e.target.innerText);
//               setSort({ ...{ sort: false }, recent: true });
//             }}
//           >
//             한식
//           </Text>
//           <Text
//             width="3rem"
//             height="2.4rem"
//             size="1.6rem"
//             bold
//             cursor="t"
//             margin="-0.7rem 0.9rem 0"
//             border_bottom={category.cn ? "0.1rem solid black" : ""}
//             _onClick={(e) => {
//               dispatch(postActions.getPostAX(e.target.innerText));
//               setCategory({ ...{ category: false }, cn: true });
//               setCtg(e.target.innerText);
//               setSort({ ...{ sort: false }, recent: true });
//             }}
//           >
//             중식
//           </Text>
//           <Text
//             width="3rem"
//             height="2.4rem"
//             size="1.6rem"
//             bold
//             cursor="t"
//             margin="-0.7rem 0.9rem 0"
//             border_bottom={category.jp ? "0.1rem solid black" : ""}
//             _onClick={(e) => {
//               dispatch(postActions.getPostAX(e.target.innerText));
//               setCategory({ ...{ category: false }, jp: true });
//               setCtg(e.target.innerText);
//               setSort({ ...{ sort: false }, recent: true });
//             }}
//           >
//             일식
//           </Text>
//           <Text
//             width="3rem"
//             height="2.4rem"
//             size="1.6rem"
//             bold
//             cursor="t"
//             margin="-0.7rem 0.9rem 0"
//             border_bottom={category?.west ? "0.1rem solid black" : ""}
//             _onClick={(e) => {
//               dispatch(postActions.getPostAX(e.target.innerText));
//               setCategory({ ...{ category: false }, west: true });
//               setCtg(e.target.innerText);
//               setSort({ ...{ sort: false }, recent: true });
//             }}
//           >
//             양식
//           </Text>
//           <Text
//             width="3rem"
//             height="2.4rem"
//             size="1.6rem"
//             bold
//             cursor="t"
//             margin="-0.7rem 0.9rem 0"
//             border_bottom={category.cafe ? "0.1rem solid black" : ""}
//             _onClick={(e) => {
//               dispatch(postActions.getPostAX(e.target.innerText));
//               setCategory({ ...{ category: false }, cafe: true });
//               setCtg(e.target.innerText);
//               setSort({ ...{ sort: false }, recent: true });
//             }}
//           >
//             카페
//           </Text>
//           <Text
//             width="3rem"
//             height="2.4rem"
//             size="1.6rem"
//             bold
//             cursor="t"
//             margin="-0.7rem 0.9rem 0"
//             border_bottom={category.etc ? "0.1rem solid black" : ""}
//             _onClick={(e) => {
//               dispatch(postActions.getPostAX(e.target.innerText));
//               setCategory({ ...{ category: false }, etc: true });
//               setCtg(e.target.innerText);
//               setSort({ ...{ sort: false }, recent: true });
//             }}
// >>>>>>> develop
//           >
            <SwiperSlide>
              <Text
                width="3rem"
                height="2.4rem"
                size={fontSize.base}
                bold
                cursor="t"
                margin="0 0.9rem"
                border_bottom={category.all ? '0.1rem solid black' : ''}
                _onClick={() => {
                  setCategory({ ...{ category: false }, all: true });
                }}
              >
                전체
              </Text>
            </SwiperSlide>
            <SwiperSlide>
              <Text
                width="3rem"
                height="2.4rem"
                size="1.6rem"
                bold
                cursor="t"
                margin="0 0.9rem"
                border_bottom={category.kr ? '0.1rem solid black' : ''}
                _onClick={() => {
                  setCategory({ ...{ category: false }, kr: true });
                }}
              >
                한식
              </Text>
            </SwiperSlide>
            <SwiperSlide>
              <Text
                width="3rem"
                height="2.4rem"
                size="1.6rem"
                bold
                cursor="t"
                margin="0 0.9rem"
                border_bottom={category.cn ? '0.1rem solid black' : 'none'}
                _onClick={() => {
                  setCategory({ ...{ category: false }, cn: true });
                }}
              >
                중식
              </Text>
            </SwiperSlide>
            <SwiperSlide>
              <Text
                width="3rem"
                height="2.4rem"
                size="1.6rem"
                bold
                cursor="t"
                margin="0 0.9rem"
                border_bottom={category.jp ? '0.1rem solid black' : ''}
                _onClick={() => {
                  setCategory({ ...{ category: false }, jp: true });
                }}
              >
                일식
              </Text>
            </SwiperSlide>
            <SwiperSlide>
              <Text
                width="3rem"
                height="2.4rem"
                size="1.6rem"
                bold
                cursor="t"
                margin="0 0.9rem"
                border_bottom={category.west ? '0.1rem solid black' : ''}
                _onClick={() => {
                  // dispatch(postActions.getPostAX('일식'));
                  setCategory({ ...{ category: false }, west: true });
                }}
              >
                양식
              </Text>
            </SwiperSlide>
            <SwiperSlide>
              <Text
                width="3rem"
                height="2.4rem"
                size="1.6rem"
                bold
                cursor="t"
                margin="0 0.9rem"
                border_bottom={category.cafe ? '0.1rem solid black' : ''}
                _onClick={() => {
                  setCategory({ ...{ category: false }, cafe: true });
                }}
              >
                카페
              </Text>
            </SwiperSlide>
            <SwiperSlide>
              <Text
                width="3rem"
                height="2.4rem"
                size="1.6rem"
                bold
                cursor="t"
                margin="0 0.9rem"
                border_bottom={category.etc ? '0.1rem solid black' : ''}
                _onClick={() => {
                  setCategory({ ...{ category: false }, etc: true });
                }}
              >
                기타
              </Text>
            </SwiperSlide>
          </Swiper>
        </Grid>
        <Hr />
        <Grid is_flex2 maxWidth="32rem" margin="1.6rem auto">
          <Grid>
            <Text size="1.3rem" color="#9A9896" bold2="500">
              정렬 기준
            </Text>
          </Grid>
          <Grid flex justify_content="flex-end">
            <Text
              size="1.3rem"
              color={sort.recent ? "#ff9425" : "#cecac7"}
              bold
              cursor="t"
              _onClick={() => {
                setSort({ ...{ sort: false }, recent: true });
                dispatch(postActions.getPostAX(ctg));
              }}
            >
              마감임박순
            </Text>
            <Text
              size="1.3rem"
              color={sort.nearBy ? "#ff9425" : "#cecac7"}
              bold
              margin="0 0 0 1rem"
              cursor="t"
              _onClick={() => {
                setSort({ ...{ sort: false }, nearBy: true });
                dispatch(postActions.getPostAX(ctg, "nearBy"));
              }}
            >
              거리순
            </Text>
          </Grid>
        </Grid>
        <Grid>
          {post_list?.length > 0 ? (
            post_list.map((p, idx) => {
              if (category.all) {
                return <Post {...p} key={p.post_id} />;
              }
              if (category.kr && p.category === '한식') {
                return <Post {...p} key={p.post_id} />;
              }
              if (category.cn && p.category === '중식') {
                return <Post {...p} key={p.post_id} />;
              }
              if (category.jp && p.category === '일식') {
                return <Post {...p} key={p.post_id} />;
              }
              if (category.west && p.category === '양식') {
                return <Post {...p} key={p.post_id} />;
              }
              if (category.cafe && p.category === '카페') {
                return <Post {...p} key={p.post_id} />;
              }
              if (category.etc && p.category === '기타') {
                return <Post {...p} key={p.post_id} />;
              }
              return null;
            })
          ) : (
            <React.Fragment>
              <Grid>
                <Grid is_flex_column height="20rem">
                  <LogoImg src="/illust/emptyHome_3x.png"></LogoImg>
                  <Text size={fontSize.base} color={color.bg80}>
                    설정한 주소 근처에 올라온 글이 없어요!
                  </Text>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
          {post_list.length > 1 ? (
            <Grid height="6rem" />
          ) : (
            <Grid height="10.4rem" />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Main.defaultProps = {};

const Hr = styled.hr`
  width: 36rem;
  height: 0.1rem;
  background-color: #f4f4f3;
  border: none;
  margin: 0;
`;

const LogoImg = styled.div`
  margin: 0 auto 1rem auto;
  background-image: url('${(props) => props.src}');
  width: 18.4rem;
  height: 16.7rem;
  background-size: cover;
  background-position: center;
`;

export default Main;
