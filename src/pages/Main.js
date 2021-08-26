import React from "react";
import styled from "styled-components";

import { Grid, Text, Button, Image } from "../elements";
import { Post, Footer, Header, MainBanner, PcSide } from "../components";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDetectOutsideClick } from "../components/useDetectOutsideClick";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import logger from "../shared/Console";

import theme from "../styles/theme";
import "../components/style.css";

// 이미지
import { png } from "../styles/img/index";
import { webp } from "../styles/img/webp/index";
import { isWebpSupported } from "react-image-webp/dist/utils";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "../shared/Swiper.scss";

const Main = (props) => {
  const media = useMediaQuery("(min-width: 950px)");

  const { color, border, btn_border, fontSize } = theme;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const post_list = useSelector((state) => state.post?.list);
  const rank_list = useSelector((state) => state.post?.rank);
  const is_loading = useSelector((state) => state.user.is_loading);

  const [ctg, setCtg] = React.useState("");
  const [sort, setSort] = React.useState({
    recent: true,
    nearBy: false,
  });
  const [category, setCategory] = React.useState({
    all: true,
    kr: false,
    bunsik: false,
    cn: false,
    jp: false,
    west: false,
    cafe: false,
    etc: false,
  });

  const [start, setStart] = React.useState(true);
  React.useEffect(() => {
    document
      .querySelector("body")
      .scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (post_list.length === 0) {
      dispatch(postActions.getPostAX("전체"));
      setCtg("전체");
      dispatch(postActions.getRankDB());
      return;
    }
    if (user?.user_address) {
      dispatch(postActions.getPostAX("전체"));
      setCtg("전체");
      dispatch(postActions.getRankDB());
      return;
    }
  }, []);

  const swiperRef = React.useRef(null);
  const mainRef = React.useRef(null);
  const scrollToCategory = () => {
    swiperRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const qaRef = React.useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(qaRef, false);
  const onClick = () => {
    setIsActive(!isActive);
  };
  
  React.useEffect(() => {
    const is_address = user?.user_address === "여기를 클릭해서 주소를 설정하세요!" ? true : false ;
    dispatch(imageActions.setMask(is_address));
  },[user?.user_address])

  return (
    <React.Fragment>
      <PcSide {...props} />
      <div ref={mainRef}></div>
      <Grid
        minHeight="100vh"
        margin="0 auto"
        padding={media ? "0" : "0 0 5.2rem 0"}
      >
        <Grid shape="container">
          <Header {...props} shape="홈">
            {user?.user_address}
          </Header>
          <Footer {...props}></Footer>
          <Button
            feedback
            width="5rem"
            height="5rem"
            radius="2.5rem"
            bg="rgba(255, 204,151, 0.6)"
            position="fixed"
            border="none"
            padding="0"
            margin={media ? "0 0 0 29.3rem" : "0 0 0 29.5rem"}
            bottom={media ? "1rem" : "6rem"}
            z_index="100"
            cursor="t"
            _onClick={onClick}
          >
            {isActive ? (
              <Text color="white" size="3rem" bold cursor="t">
                !
              </Text>
            ) : (
              <FeedbackBtn
                src={isWebpSupported() ? webp.feedbackWebp : png.feedback}
              />
            )}
          </Button>
          <div className="link-container">
            <nav
              ref={qaRef}
              className={`link ${isActive ? "active" : "inactive"}`}
              style={media ? { bottom: "6.7rem" } : { bottom: "11.5rem" }}
            >
              <Grid
                width="fit-content"
                height="fit-content"
                radius="inherit"
                text_align="center"
                absolute="relative"
              >
                <Text size={fontSize.small}>밀착에서의 경험은 어떠셨나요!</Text>
                <Text size={fontSize.small}>
                  여러분의 소중한 의견에 귀 기울이겠습니다.
                </Text>
                <Text size={fontSize.small}>
                  <a
                    href="https://forms.gle/j2616Jgt3toPf4Dd8"
                    target="_blank"
                    rel="noreferrer"
                  >
                    후기 및 의견 작성하기
                  </a>
                </Text>
              </Grid>
            </nav>
          </div>
        </Grid>
        <Grid width="36rem" margin="0 auto">
          <Button
            width="32rem"
            height="4.4rem"
            margin="0 1.8rem"
            bg={color.bg0}
            border={btn_border.bg40}
            radius="1.2rem"
            cursor="t"
            _onClick={() => {
              history.push("/search");
            }}
          >
            <Grid
              is_flex4="t"
              flex_direction="row"
              justify_content="space-between"
              padding="0.2rem 1.4rem 0"
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
              <Image
                size="2.4"
                src={isWebpSupported() ? webp.searchWebp : png.search}
                margin="0 0 0.4rem"
              />
            </Grid>
          </Button>
        </Grid>
        <Grid is_float="left">
          <Grid
            width="fit-content"
            maxWidth="fit-content"
            padding="2.4rem 0 0 2.1rem"
          >
            <Text size="1.6rem" color={color.bg100} bold>
              #오늘의 인기 메뉴
            </Text>
          </Grid>
          <MainBanner
            scrollToCategory={scrollToCategory}
            {...rank_list}
            category={category}
            getCategory={(value) =>
              setCategory({ ...{ category: false }, ...value })
            }
            getCtg={(value) => setCtg(value)}
            getSort={() => setSort({ ...{ sort: false }, recent: true })}
          />
          <Grid height="0.8rem" bg="#f4f4f3" />
          <div ref={swiperRef}></div>
        </Grid>
        <Grid
          maxWidth="34.9rem"
          height="4.5rem"
          margin={media ? "0 0 0 2rem" : "0 0 0 2.8rem"}
          flex
          flex_direction="row"
          align_items="center"
          padding="2rem 0 1.6rem 0"
        >
          <Swiper
            className="category"
            slidesPerView="7.55"
            style={{ transform: "none" }}
          >
            <SwiperSlide style={{ width: "fit-content", textAlign: "center" }}>
              <Text
                width="fit-content"
                height="2.4rem"
                size={fontSize.base}
                color={category.all ? color.bg100 : color.bg80}
                bold
                cursor="t"
                // margin="-0.4rem 0rem 0.1rem 0.5rem"
                margin="-0.4rem 1.6rem 0.1rem 0rem"
                padding="1.6rem 0 2.8rem 0"
                border_bottom={category.all ? "0.2rem solid black" : ""}
                white_space="nowrap"
                _onClick={(e) => {
                  dispatch(postActions.getPostAX(e.target.innerText));
                  setCategory({ ...{ category: false }, all: true });
                  setCtg(e.target.innerText);
                }}
              >
                전체
              </Text>
            </SwiperSlide>
            <SwiperSlide style={{ width: "fit-content", textAlign: "center" }}>
              <Text
                width="fit-content"
                height="2.4rem"
                size="1.6rem"
                color={category.kr ? color.bg100 : color.bg80}
                bold
                cursor="t"
                margin="-0.4rem 1.6rem 0 0"
                padding="1.6rem 0 2.8rem 0"
                border_bottom={category.kr ? "0.2rem solid black" : ""}
                white_space="nowrap"
                _onClick={(e) => {
                  dispatch(postActions.getPostAX(e.target.innerText));
                  setCategory({ ...{ category: false }, kr: true });
                  setCtg(e.target.innerText);
                  setSort({ ...{ sort: false }, recent: true });
                }}
              >
                한식
              </Text>
            </SwiperSlide>
            <SwiperSlide style={{ width: "fit-content", textAlign: "center" }}>
              <Text
                width="fit-content"
                height="2.4rem"
                size="1.6rem"
                color={category.bunsik ? color.bg100 : color.bg80}
                bold
                cursor="t"
                margin="-0.4rem 1.6rem 0 0"
                padding="1.6rem 0 2.8rem 0"
                border_bottom={category.bunsik ? "0.2rem solid black" : "none"}
                white_space="nowrap"
                _onClick={(e) => {
                  dispatch(postActions.getPostAX(e.target.innerText));
                  setCategory({ ...{ category: false }, bunsik: true });
                  setCtg(e.target.innerText);
                  setSort({ ...{ sort: false }, recent: true });
                }}
              >
                분식
              </Text>
            </SwiperSlide>
            <SwiperSlide style={{ width: "fit-content", textAlign: "center" }}>
              <Text
                width="fit-content"
                height="2.4rem"
                size="1.6rem"
                color={category.cn ? color.bg100 : color.bg80}
                bold
                cursor="t"
                margin="-0.4rem 1.6rem 0 0"
                padding="1.6rem 0 2.8rem 0"
                border_bottom={category.cn ? "0.2rem solid black" : ""}
                white_space="nowrap"
                _onClick={(e) => {
                  dispatch(postActions.getPostAX(e.target.innerText));
                  setCategory({ ...{ category: false }, cn: true });
                  setCtg(e.target.innerText);
                  setSort({ ...{ sort: false }, recent: true });
                }}
              >
                중식
              </Text>
            </SwiperSlide>
            <SwiperSlide style={{ width: "fit-content", textAlign: "center" }}>
              <Text
                width="fit-content"
                height="2.4rem"
                size="1.6rem"
                color={category.jp ? color.bg100 : color.bg80}
                bold
                cursor="t"
                margin="-0.4rem 1.6rem 0 0"
                padding="1.6rem 0 2.8rem 0"
                border_bottom={category.jp ? "0.2rem solid black" : ""}
                white_space="nowrap"
                _onClick={(e) => {
                  dispatch(postActions.getPostAX(e.target.innerText));
                  setCategory({ ...{ category: false }, jp: true });
                  setCtg(e.target.innerText);
                  setSort({ ...{ sort: false }, recent: true });
                }}
              >
                일식
              </Text>
            </SwiperSlide>
            <SwiperSlide style={{ width: "fit-content", textAlign: "center" }}>
              <Text
                width="fit-content"
                height="2.4rem"
                size="1.6rem"
                color={category.west ? color.bg100 : color.bg80}
                bold
                cursor="t"
                margin="-0.4rem 1.6rem 0 0"
                padding="1.6rem 0 2.8rem 0"
                border_bottom={category?.west ? "0.2rem solid black" : ""}
                white_space="nowrap"
                _onClick={(e) => {
                  dispatch(postActions.getPostAX(e.target.innerText));
                  setCategory({ ...{ category: false }, west: true });
                  setCtg(e.target.innerText);
                  setSort({ ...{ sort: false }, recent: true });
                }}
              >
                양식
              </Text>
            </SwiperSlide>
            <SwiperSlide style={{ width: "fit-content", textAlign: "center" }}>
              <Text
                width="fit-content"
                height="2.4rem"
                size="1.6rem"
                color={category.cafe ? color.bg100 : color.bg80}
                bold
                cursor="t"
                margin="-0.4rem 1.6rem 0 0"
                padding="1.6rem 0 2.8rem 0"
                border_bottom={category.cafe ? "0.2rem solid black" : ""}
                white_space="nowrap"
                _onClick={(e) => {
                  dispatch(postActions.getPostAX(e.target.innerText));
                  setCategory({ ...{ category: false }, cafe: true });
                  setCtg(e.target.innerText);
                  setSort({ ...{ sort: false }, recent: true });
                }}
              >
                카페
              </Text>
            </SwiperSlide>
            <SwiperSlide style={{ width: "fit-content", textAlign: "center" }}>
              <Text
                width="fit-content"
                height="2.4rem"
                size="1.6rem"
                color={category.etc ? color.bg100 : color.bg80}
                bold
                cursor="t"
                margin="-0.4rem 1.6rem 0 0"
                padding="1.6rem 0 2.8rem 0"
                border_bottom={category.etc ? "0.2rem solid black" : ""}
                white_space="nowrap"
                _onClick={(e) => {
                  dispatch(postActions.getPostAX(e.target.innerText));
                  setCategory({ ...{ category: false }, etc: true });
                  setCtg(e.target.innerText);
                  setSort({ ...{ sort: false }, recent: true });
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
              color={sort?.recent ? "#ff9425" : "#cecac7"}
              bold
              cursor="t"
              // getPostAX(category, sort="recent") - 기본 정렬(sort)값이 recent(마감임박순)
              _onClick={() => {
                setSort({ ...{ sort: false }, recent: true });
                dispatch(postActions.getPostAX(ctg));
              }}
            >
              마감임박순
            </Text>
            <Text
              size="1.3rem"
              color={sort?.nearBy ? "#ff9425" : "#cecac7"}
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
              if (category.kr && p.category === "한식") {
                return <Post {...p} key={p.post_id} />;
              }
              if (category.bunsik && p.category === "분식") {
                return <Post {...p} key={p.post_id} />;
              }
              if (category.cn && p.category === "중식") {
                return <Post {...p} key={p.post_id} />;
              }
              if (category.jp && p.category === "일식") {
                return <Post {...p} key={p.post_id} />;
              }
              if (category.west && p.category === "양식") {
                return <Post {...p} key={p.post_id} />;
              }
              if (category.cafe && p.category === "카페") {
                return <Post {...p} key={p.post_id} />;
              }
              if (category.etc && p.category === "기타") {
                return <Post {...p} key={p.post_id} />;
              }
              return null;
            })
          ) : (
            <React.Fragment>
              <Grid>
                <Grid is_flex_column height="20rem" margin="3.2rem 0 0 0">
                  <LogoImg
                    src={
                      isWebpSupported()
                        ? webp.emptyHome_3xWebp
                        : png.emptyHome_3x
                    }
                  ></LogoImg>
                </Grid>
                <Text
                  size={fontSize.base}
                  color={color.bg80}
                  text_align="center"
                >
                  설정한 주소 근처에 올라온 글이 없어요!
                </Text>
              </Grid>
            </React.Fragment>
          )}
          {post_list.length === 0 && <Grid height="8.4rem" />}
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
  background-image: url("${(props) => props.src}");
  width: 18.4rem;
  height: 16.7rem;
  background-size: cover;
  background-position: center;
`;

const FeedbackBtn = styled.div`
  width: 100%;
  height: 100%;
  max-width: 3.4rem;
  max-height: 3.6rem;
  border-radius: 1rem;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  margin: 0.3rem 0 0 0;
`;

export default Main;
