import React from "react";
import styled from "styled-components";

import { actionCreators as userAction } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

// style
import { Header, Footer, ProfileTab } from "../components";
import { Grid, Text } from "../elements";
import Spinner from "../shared/Spinner";
import theme from "../styles/theme";
import logger from "../shared/Console";

// clipboard
import CopyToClipboard from "react-copy-to-clipboard";
import { customAlert } from "../components/Sweet";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const user_info = useSelector((state) => state.user.user);

  const { color, border, fontSize } = theme;

  React.useEffect(() => {
    document
      .querySelector("body")
      .scrollTo({ top: 0, left: 0, behavior: "instant" });
    dispatch(userAction.loginCheck());
    logger("Mypage props: ", props);
  }, []);

  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  if (is_login) {
    return (
      <React.Fragment>
        <Grid
          maxWidth="36rem"
          minHeight="100vh"
          border={border.line1}
          margin="0 auto"
        >
          <Grid shape="container">
            <Header {...props} shape="마이페이지" />
            <Grid height="4.4rem" />

            <Grid margin="3.6rem auto 2rem">
              <Profile user_profile={user_info.user_profile} />
            </Grid>
            <Grid margin="0 auto 0.5rem">
              <Text
                width="auto"
                size={fontSize.large}
                color={color.bg100}
                bold
                line_height="150%"
                text_align="center"
                overflow="hidden"
                text_overflow="ellipsis"
                white_space="nowrap"
                display="block"
              >
                {user_info.user_nickname}
              </Text>
              <Grid width="auto" text_align="center" margin="0.5rem 0 0 0">
                <Text size={fontSize.small} color="#9A9896" line_height="150%">
                  {user_info?.user_comment
                    ? user_info?.user_comment
                    : "프로필 수정에서 한 줄 소개를 입력해주세요."}
                </Text>
              </Grid>
            </Grid>
            {/* 매너점수, 성별, 연령 */}
            <ProfileTab user_info={user_info} />

            <Grid borderBottom={border.boldLine} />

            <Grid
              is_flex4="t"
              padding="1.9rem 2rem"
              borderBottom={border.bg20}
              cursor="t"
              _onClick={() => {
                history.push("/mypost");
              }}
            >
              <svg
                style={{ marginRight: "1.2rem" }}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.7279 6.27208L7.97371 17.0263L8.12132 21.1213L12.2163 21.2689L22.9706 10.5147L18.7279 6.27208Z"
                  stroke="#36373C"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 25H24"
                  stroke="#36373C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Text color={color.bg100} size={fontSize.base} bold2="400">
                내가 쓴 글
              </Text>
            </Grid>
            <Grid
              is_flex4="t"
              padding="1.9rem 2rem"
              borderBottom={border.bg20}
              cursor="t"
              _onClick={() => {
                history.push("/myreview");
              }}
            >
              <svg
                style={{ marginRight: "1.2rem" }}
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="5"
                  y="4"
                  width="20"
                  height="22"
                  rx="4"
                  stroke="#36373C"
                  strokeWidth="2"
                />
                <line
                  x1="10"
                  y1="18"
                  x2="17"
                  y2="18"
                  stroke="#36373C"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="10"
                  y1="10"
                  x2="20"
                  y2="10"
                  stroke="#36373C"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="10"
                  y1="14"
                  x2="20"
                  y2="14"
                  stroke="#36373C"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <Text color={color.bg100} size={fontSize.base} bold2="400">
                내가 받은 리뷰
              </Text>
            </Grid>
            <Grid
              is_flex4="t"
              padding="1.9rem 2rem"
              borderBottom={border.bg20}
              justify_content="space-between"
            >
              <Grid is_flex4="t" width="60%">
                <svg
                  style={{ marginRight: "1.2rem" }}
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      d="M22.7274 25.1883C22.2716 23.6998 21.2672 22.3846 19.8701 21.4465C18.4729 20.5085 16.7611 20 15 20C13.2389 20 11.5271 20.5085 10.1299 21.4465C8.73276 22.3846 7.72839 23.6998 7.27259 25.1883"
                      stroke="#36373C"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="15"
                      cy="11"
                      r="5"
                      stroke="#36373C"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <Text color={color.bg100} size={fontSize.base} bold2="400">
                  친구 초대
                </Text>
              </Grid>

              <CopyToClipboard text="http://surgo.kr/" onCopy={copy}>
                <button
                  style={{
                    height: "auto",
                    border: "none",
                    backgroundColor: color.brand20,
                    padding: "0.4rem 0.8rem",
                    borderRadius: "0.8rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    customAlert.sweetConfirmReload(
                      "링크가 복사 됐어요!",
                      ["이제 친구들에게 공유하고",
                      "함께 밀착 서비스를 사용해보세요 :)"],
                      ""
                    );
                  }}
                >
                  <Text
                    size={fontSize.small}
                    bold2="700"
                    color={color.brand100}
                  >
                    공유 링크 복사하기
                  </Text>
                </button>
              </CopyToClipboard>
            </Grid>
            {user_info && (
              <Grid
                is_flex4="t"
                padding="1.9rem 2rem"
                margin="0 0 3.6rem"
                borderBottom="0.1rem solid #F1F2F4"
                cursor="t"
                _onClick={() => {
                  history.push("/settings");
                }}
              >
                <svg
                  style={{ marginRight: "1.2rem" }}
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.4032 5.28161L16.4081 5.38111V5.38111L17.4032 5.28161ZM17.1617 4.17289L17.9783 3.59578L17.9783 3.59577L17.1617 4.17289ZM17.8723 7.23701L17.2165 7.99189L17.2165 7.99189L17.8723 7.23701ZM18.4582 7.47967L18.5282 6.48212L18.4582 7.47967ZM20.1726 6.42876L19.5394 5.6548V5.6548L20.1726 6.42876ZM21.1273 5.81553L20.9579 4.82998L20.9579 4.82998L21.1273 5.81553ZM21.5633 5.83728L21.83 4.87348L21.83 4.87348L21.5633 5.83728ZM22.4523 6.54246L21.7452 7.24957V7.24957L22.4523 6.54246ZM23.4575 7.54761L22.7504 8.25471L22.7504 8.25471L23.4575 7.54761ZM24.1627 8.43662L25.1265 8.17002V8.17002L24.1627 8.43662ZM24.1844 8.87259L25.17 9.04197L25.17 9.04196L24.1844 8.87259ZM23.5712 9.82736L24.3451 10.4606V10.4606L23.5712 9.82736ZM22.5202 11.5419L21.5227 11.6119V11.6119L22.5202 11.5419ZM22.7629 12.1276L22.008 12.7835L22.008 12.7835L22.7629 12.1276ZM24.7183 12.5968L24.6188 13.5919H24.6188L24.7183 12.5968ZM25.8271 12.8384L26.4043 12.0217V12.0217L25.8271 12.8384ZM26.12 13.162L26.99 12.669L26.99 12.669L26.12 13.162ZM26.1201 16.8379L26.9902 17.3308L26.9902 17.3308L26.1201 16.8379ZM25.827 17.1617L26.4041 17.9785L26.4041 17.9785L25.827 17.1617ZM24.7185 17.4032L24.619 16.4081H24.619L24.7185 17.4032ZM22.7635 17.8722L23.5182 18.5282L23.5182 18.5282L22.7635 17.8722ZM22.5207 18.4584L21.5231 18.3886V18.3886L22.5207 18.4584ZM23.5714 20.1723L22.7974 20.8055L22.7974 20.8055L23.5714 20.1723ZM24.1844 21.1267L23.1989 21.2963L23.1989 21.2963L24.1844 21.1267ZM24.1627 21.563L23.1989 21.2963L23.1989 21.2963L24.1627 21.563ZM21.5634 24.1622L21.2968 23.1984H21.2968L21.5634 24.1622ZM21.1274 24.184L21.2968 23.1984L21.2968 23.1984L21.1274 24.184ZM20.1727 23.5707L20.8059 22.7968L20.7896 22.7834L20.7727 22.7707L20.1727 23.5707ZM20.1727 23.5707L19.5394 24.3447L19.5558 24.3581L19.5727 24.3707L20.1727 23.5707ZM18.4582 22.5198L18.3882 21.5223H18.3882L18.4582 22.5198ZM17.8724 22.7625L17.2165 22.0076L17.8724 22.7625ZM17.4032 24.7181L16.4082 24.6186V24.6186L17.4032 24.7181ZM17.1616 25.8272L17.9782 26.4045L17.9782 26.4045L17.1616 25.8272ZM16.8381 26.12L17.3312 26.9899L17.3312 26.9899L16.8381 26.12ZM13.162 26.12L12.669 26.99L12.669 26.9901L13.162 26.12ZM12.8383 25.8271L12.0217 26.4043L12.0217 26.4043L12.8383 25.8271ZM12.5968 24.7184L13.5919 24.6189L12.5968 24.7184ZM12.1276 22.7629L12.7834 22.008L12.7834 22.008L12.1276 22.7629ZM11.5419 22.5203L11.4718 23.5178L11.4718 23.5178L11.5419 22.5203ZM9.82733 23.5712L9.19409 22.7972L9.19409 22.7972L9.82733 23.5712ZM8.87253 24.1845L9.0419 25.17H9.0419L8.87253 24.1845ZM8.43658 24.1627L8.16999 25.1265L8.17 25.1265L8.43658 24.1627ZM7.54755 23.4575L8.25466 22.7504L8.25466 22.7504L7.54755 23.4575ZM6.54243 22.4524L5.83532 23.1595L5.83532 23.1595L6.54243 22.4524ZM5.83723 21.5634L4.87343 21.83L4.87343 21.83L5.83723 21.5634ZM5.81549 21.1274L4.82994 20.958H4.82994L5.81549 21.1274ZM6.42873 20.1726L7.20269 20.8059H7.20269L6.42873 20.1726ZM7.47965 18.4582L8.47719 18.3882V18.3882L7.47965 18.4582ZM7.23698 17.8724L6.4821 18.5282L6.4821 18.5282L7.23698 17.8724ZM5.2816 17.4032L5.38111 16.4081H5.38111L5.2816 17.4032ZM4.17289 17.1617L3.59578 17.9784H3.59578L4.17289 17.1617ZM3.87996 16.838L3.00992 17.331H3.00992L3.87996 16.838ZM3.88002 13.1619L4.75 13.655L4.75 13.655L3.88002 13.1619ZM4.17279 12.8384L3.59558 12.0218H3.59558L4.17279 12.8384ZM5.28175 12.5968L5.18225 11.6018H5.18225L5.28175 12.5968ZM7.23757 12.1275L7.99257 12.7832H7.99257L7.23757 12.1275ZM7.4801 11.542L6.48256 11.4718V11.4718L7.4801 11.542ZM6.42895 9.82705L5.65499 10.4603H5.65499L6.42895 9.82705ZM5.81552 8.87193L6.8011 8.70271L6.8011 8.70271L5.81552 8.87193ZM5.83725 8.43627L6.8011 8.70271L6.8011 8.70271L5.83725 8.43627ZM6.54263 7.54696L5.83553 6.83986H5.83553L6.54263 7.54696ZM7.54761 6.54198L8.25472 7.24909L8.25472 7.24909L7.54761 6.54198ZM8.43664 5.83677L8.70323 6.80058L8.70323 6.80058L8.43664 5.83677ZM8.8726 5.81502L9.04196 4.82947L9.04196 4.82947L8.8726 5.81502ZM9.82747 6.42835L10.4607 5.65439L10.4607 5.65439L9.82747 6.42835ZM11.5417 7.47924L11.4718 6.48168L11.5417 7.47924ZM12.1278 7.23646L11.4718 6.48168L11.4718 6.48168L12.1278 7.23646ZM12.5969 5.28147L11.6018 5.18196V5.18196L12.5969 5.28147ZM12.8383 4.17298L13.655 4.75L13.655 4.75L12.8383 4.17298ZM13.1621 3.87991L12.6692 3.00981L12.6692 3.00981L13.1621 3.87991ZM16.838 3.87996L17.331 3.00993L17.331 3.00993L16.838 3.87996ZM18.3982 5.18211C18.3702 4.90257 18.3436 4.62615 18.299 4.39526C18.2516 4.1491 18.1691 3.86577 17.9783 3.59578L16.345 4.75C16.3064 4.6953 16.3149 4.66852 16.3352 4.774C16.3585 4.89474 16.3765 5.06504 16.4081 5.38111L18.3982 5.18211ZM18.5282 6.48212C18.6339 6.57395 18.6008 6.64096 18.5467 6.38125C18.4944 6.13069 18.457 5.77034 18.3982 5.18211L16.4081 5.38111C16.4623 5.9229 16.5097 6.41007 16.5888 6.78961C16.6661 7.16 16.8111 7.63969 17.2165 7.99189L18.5282 6.48212ZM18.5282 6.48212L18.5282 6.48212L17.2165 7.99189C17.5441 8.27648 17.9553 8.44682 18.3881 8.47721L18.5282 6.48212ZM19.5394 5.6548C19.0818 6.02915 18.8006 6.25751 18.5865 6.39773C18.3645 6.54307 18.3885 6.47232 18.5282 6.48212L18.3881 8.47721C18.9238 8.51481 19.3656 8.27818 19.6821 8.0709C20.0065 7.8585 20.3844 7.54751 20.8058 7.20272L19.5394 5.6548ZM20.9579 4.82998C20.6321 4.88599 20.3735 5.02804 20.1659 5.16853C19.9711 5.30031 19.7568 5.4769 19.5394 5.6548L20.8058 7.20272C21.0517 7.00157 21.1848 6.89388 21.2867 6.82497C21.3756 6.76477 21.3627 6.78974 21.2967 6.80108L20.9579 4.82998ZM21.83 4.87348C21.546 4.79494 21.2483 4.78008 20.9579 4.82998L21.2967 6.80108L21.2967 6.80108L21.83 4.87348ZM23.1594 5.83536C22.9608 5.63671 22.7651 5.43966 22.5844 5.28916C22.3918 5.12871 22.1486 4.96162 21.83 4.87348L21.2967 6.80108C21.2322 6.78322 21.2218 6.7571 21.3044 6.82585C21.3988 6.90455 21.5206 7.02495 21.7452 7.24957L23.1594 5.83536ZM24.1646 6.8405L23.1594 5.83536L21.7452 7.24957L22.7504 8.25471L24.1646 6.8405ZM25.1265 8.17002C25.0383 7.85137 24.8712 7.60815 24.7108 7.41552C24.5603 7.23484 24.3632 7.03916 24.1646 6.8405L22.7504 8.25471C22.975 8.47934 23.0954 8.60111 23.1741 8.69559C23.2428 8.77813 23.2167 8.76777 23.1989 8.70322L25.1265 8.17002ZM25.17 9.04196C25.2199 8.75166 25.205 8.45392 25.1265 8.17002L23.1989 8.70321V8.70322L25.17 9.04196ZM24.3451 10.4606C24.523 10.2432 24.6996 10.0288 24.8314 9.83408C24.9719 9.62644 25.114 9.3678 25.17 9.04197L23.1989 8.70321C23.2102 8.6372 23.2352 8.6243 23.175 8.71327C23.1061 8.81511 22.9984 8.94826 22.7972 9.19412L24.3451 10.4606ZM23.5178 11.4718C23.5276 11.6115 23.4568 11.6355 23.6022 11.4135C23.7424 11.1994 23.9708 10.9181 24.3451 10.4606L22.7972 9.19412C22.4524 9.61555 22.1414 9.99352 21.929 10.3179C21.7217 10.6344 21.4851 11.0762 21.5227 11.6119L23.5178 11.4718ZM23.5178 11.4718L23.5178 11.4718L21.5227 11.6119C21.5531 12.0447 21.7234 12.4559 22.008 12.7835L23.5178 11.4718ZM24.8179 11.6018C24.2296 11.543 23.8692 11.5056 23.6187 11.4533C23.3589 11.3991 23.4259 11.3661 23.5178 11.4718L22.008 12.7835C22.3602 13.1889 22.8399 13.3339 23.2103 13.4112C23.5898 13.4903 24.077 13.5377 24.6188 13.5919L24.8179 11.6018ZM26.4043 12.0217C26.1343 11.8309 25.8509 11.7484 25.6047 11.701C25.3738 11.6564 25.0974 11.6298 24.8179 11.6018L24.6188 13.5919C24.9349 13.6235 25.1053 13.6415 25.226 13.6648C25.3315 13.6851 25.3047 13.6937 25.25 13.655L26.4043 12.0217ZM26.99 12.669C26.8448 12.4127 26.6448 12.1917 26.4043 12.0217L25.25 13.655L25.25 13.655L26.99 12.669ZM27.25 14.2893C27.25 14.0083 27.251 13.7306 27.2296 13.4964C27.2069 13.2468 27.153 12.9566 26.99 12.669L25.25 13.655C25.217 13.5967 25.2281 13.5709 25.2379 13.6779C25.249 13.8004 25.25 13.9716 25.25 14.2893H27.25ZM27.25 15.7109V14.2893H25.25V15.7109H27.25ZM26.9902 17.3308C27.1531 17.0432 27.2069 16.7532 27.2296 16.5035C27.251 16.2694 27.25 15.9918 27.25 15.7109H25.25C25.25 16.0285 25.249 16.1997 25.2379 16.3221C25.2281 16.4291 25.217 16.4033 25.25 16.345L26.9902 17.3308ZM26.4041 17.9785C26.6448 17.8084 26.8449 17.5873 26.9902 17.3308L25.25 16.345L25.25 16.345L26.4041 17.9785ZM24.818 18.3982C25.0975 18.3703 25.3738 18.3436 25.6047 18.2991C25.8508 18.2516 26.1341 18.1692 26.4041 17.9785L25.25 16.345C25.3047 16.3064 25.3315 16.3149 25.226 16.3352C25.1053 16.3585 24.935 16.3765 24.619 16.4081L24.818 18.3982ZM23.5182 18.5282C23.4264 18.6338 23.3594 18.6008 23.6191 18.5466C23.8696 18.4944 24.2299 18.457 24.818 18.3982L24.619 16.4081C24.0773 16.4623 23.5903 16.5096 23.2108 16.5888C22.8405 16.666 22.3609 16.8109 22.0088 17.2161L23.5182 18.5282ZM23.5182 18.5282L23.5182 18.5282L22.0088 17.2161C21.7239 17.5439 21.5534 17.9554 21.5231 18.3886L23.5182 18.5282ZM24.3453 19.539C23.9711 19.0817 23.7428 18.8005 23.6026 18.5864C23.4573 18.3645 23.528 18.3885 23.5182 18.5282L21.5231 18.3886C21.4856 18.9241 21.7222 19.3657 21.9295 19.6821C22.1418 20.0064 22.4527 20.3842 22.7974 20.8055L24.3453 19.539ZM25.17 20.9572C25.1139 20.6315 24.9719 20.3729 24.8314 20.1654C24.6997 19.9707 24.5232 19.7564 24.3453 19.539L22.7974 20.8055C22.9985 21.0513 23.1062 21.1844 23.175 21.2862C23.2352 21.3752 23.2103 21.3623 23.1989 21.2963L25.17 20.9572ZM25.1264 21.8298C25.2051 21.5457 25.2199 21.2477 25.17 20.9572L23.1989 21.2963V21.2963L25.1264 21.8298ZM24.1648 23.1588C24.3634 22.9602 24.5604 22.7646 24.7108 22.584C24.8712 22.3915 25.0383 22.1483 25.1264 21.8298L23.1989 21.2963C23.2168 21.2317 23.2429 21.2214 23.1742 21.3039C23.0955 21.3983 22.9751 21.5201 22.7506 21.7446L24.1648 23.1588ZM23.1595 24.1641L24.1648 23.1588L22.7506 21.7446L21.7453 22.7499L23.1595 24.1641ZM21.83 25.126C22.1487 25.0379 22.3919 24.8708 22.5845 24.7103C22.7652 24.5598 22.9608 24.3628 23.1595 24.1641L21.7453 22.7499C21.5207 22.9745 21.3989 23.0949 21.3044 23.1736C21.2219 23.2424 21.2322 23.2163 21.2968 23.1984L21.83 25.126ZM20.958 25.1695C21.2483 25.2194 21.5461 25.2045 21.83 25.126L21.2968 23.1984H21.2968L20.958 25.1695ZM19.5394 24.3447C19.7569 24.5226 19.9712 24.6992 20.1659 24.831C20.3736 24.9714 20.6322 25.1135 20.958 25.1695L21.2968 23.1984C21.3628 23.2097 21.3757 23.2347 21.2867 23.1745C21.1849 23.1056 21.0518 22.9979 20.8059 22.7968L19.5394 24.3447ZM19.5727 24.3707L19.5727 24.3707L20.7727 22.7707L20.7727 22.7707L19.5727 24.3707ZM18.5282 23.5174C18.3886 23.5272 18.3646 23.4564 18.5865 23.6018C18.8006 23.742 19.0819 23.9703 19.5394 24.3447L20.8059 22.7968C20.3845 22.452 20.0065 22.141 19.6822 21.9286C19.3656 21.7213 18.9239 21.4847 18.3882 21.5223L18.5282 23.5174ZM18.5283 23.5174H18.5283L18.3882 21.5223C17.9553 21.5527 17.5441 21.723 17.2165 22.0076L18.5283 23.5174ZM18.3982 24.8176C18.4571 24.2293 18.4945 23.8689 18.5467 23.6183C18.6009 23.3585 18.634 23.4255 18.5283 23.5174L17.2165 22.0076C16.8111 22.3598 16.6661 22.8395 16.5889 23.2099C16.5097 23.5895 16.4623 24.0767 16.4082 24.6186L18.3982 24.8176ZM17.9782 26.4045C18.1691 26.1344 18.2515 25.851 18.299 25.6047C18.3436 25.3738 18.3703 25.0973 18.3982 24.8176L16.4082 24.6186C16.3765 24.9348 16.3585 25.1052 16.3352 25.226C16.3149 25.3315 16.3063 25.3047 16.345 25.25L17.9782 26.4045ZM17.3312 26.9899C17.5873 26.8448 17.8082 26.6448 17.9782 26.4045L16.345 25.25L16.345 25.25L17.3312 26.9899ZM15.7106 27.25C15.9916 27.25 16.2694 27.251 16.5036 27.2296C16.7533 27.2069 17.0435 27.153 17.3312 26.9899L16.345 25.25C16.4033 25.217 16.4291 25.2281 16.3221 25.2379C16.1996 25.249 16.0283 25.25 15.7106 25.25V27.25ZM14.2893 27.25H15.7106V25.25H14.2893V27.25ZM12.669 26.9901C12.9566 27.153 13.2468 27.2069 13.4964 27.2296C13.7306 27.251 14.0083 27.25 14.2893 27.25V25.25C13.9716 25.25 13.8004 25.249 13.6779 25.2379C13.5709 25.2281 13.5967 25.217 13.655 25.25L12.669 26.9901ZM12.0217 26.4043C12.1917 26.6448 12.4127 26.8448 12.669 26.99L13.655 25.25L13.655 25.25L12.0217 26.4043ZM11.6018 24.8179C11.6298 25.0974 11.6564 25.3738 11.701 25.6048C11.7484 25.8509 11.8309 26.1343 12.0217 26.4043L13.655 25.25C13.6936 25.3047 13.6851 25.3315 13.6648 25.226C13.6415 25.1053 13.6235 24.935 13.5919 24.6189L11.6018 24.8179ZM11.4718 23.5178C11.3661 23.426 11.3991 23.3589 11.4533 23.6187C11.5056 23.8692 11.543 24.2296 11.6018 24.8179L13.5919 24.6189C13.5377 24.077 13.4903 23.5899 13.4112 23.2103C13.3339 22.8399 13.1889 22.3602 12.7834 22.008L11.4718 23.5178ZM11.4718 23.5178L11.4718 23.5178L12.7834 22.008C12.4559 21.7234 12.0447 21.5531 11.6119 21.5227L11.4718 23.5178ZM10.4606 24.3452C10.9181 23.9708 11.1994 23.7424 11.4135 23.6022C11.6355 23.4568 11.6115 23.5276 11.4718 23.5178L11.6119 21.5227C11.0762 21.4851 10.6344 21.7217 10.3179 21.929C9.9935 22.1414 9.61552 22.4524 9.19409 22.7972L10.4606 24.3452ZM9.0419 25.17C9.36774 25.114 9.62639 24.972 9.83403 24.8315C10.0288 24.6997 10.2431 24.5231 10.4606 24.3452L9.19409 22.7972C8.94822 22.9984 8.81507 23.1061 8.71322 23.175C8.62425 23.2352 8.63716 23.2103 8.70317 23.1989L9.0419 25.17ZM8.17 25.1265C8.45388 25.205 8.7516 25.2199 9.0419 25.17L8.70317 23.1989L8.70317 23.1989L8.17 25.1265ZM6.84044 24.1646C7.03911 24.3633 7.2348 24.5603 7.41548 24.7108C7.60811 24.8713 7.85134 25.0384 8.16999 25.1265L8.70317 23.1989C8.76773 23.2168 8.77809 23.2429 8.69555 23.1741C8.60106 23.0954 8.47929 22.975 8.25466 22.7504L6.84044 24.1646ZM5.83532 23.1595L6.84045 24.1646L8.25466 22.7504L7.24953 21.7453L5.83532 23.1595ZM4.87343 21.83C4.96157 22.1486 5.12866 22.3918 5.28911 22.5845C5.43962 22.7651 5.63667 22.9608 5.83532 23.1595L7.24953 21.7453C7.02491 21.5206 6.90451 21.3989 6.8258 21.3044C6.75705 21.2219 6.78318 21.2322 6.80104 21.2968L4.87343 21.83ZM4.82994 20.958C4.78004 21.2483 4.79489 21.5461 4.87343 21.83L6.80104 21.2968L6.80104 21.2968L4.82994 20.958ZM5.65477 19.5394C5.47687 19.7568 5.30027 19.9711 5.16849 20.1659C5.028 20.3735 4.88594 20.6322 4.82994 20.958L6.80104 21.2968C6.78969 21.3628 6.76472 21.3757 6.82492 21.2867C6.89383 21.1849 7.00153 21.0517 7.20269 20.8059L5.65477 19.5394ZM6.4821 18.5282C6.4723 18.3885 6.54305 18.3645 6.39771 18.5865C6.25748 18.8006 6.02912 19.0819 5.65477 19.5394L7.20269 20.8059C7.54748 20.3845 7.85847 20.0065 8.07088 19.6821C8.27815 19.3656 8.51479 18.9239 8.47719 18.3882L6.4821 18.5282ZM6.4821 18.5282L6.4821 18.5282L8.47719 18.3882C8.44681 17.9553 8.27647 17.5441 7.99187 17.2165L6.4821 18.5282ZM5.1821 18.3982C5.77032 18.457 6.13067 18.4944 6.38123 18.5467C6.64094 18.6009 6.57393 18.6339 6.4821 18.5282L7.99187 17.2165C7.63967 16.8111 7.15998 16.6661 6.78959 16.5888C6.41005 16.5097 5.92289 16.4623 5.38111 16.4081L5.1821 18.3982ZM3.59578 17.9784C3.86577 18.1692 4.1491 18.2516 4.39526 18.2991C4.62615 18.3436 4.90256 18.3703 5.1821 18.3982L5.38111 16.4081C5.06503 16.3765 4.89473 16.3585 4.774 16.3352C4.66852 16.3149 4.6953 16.3064 4.75 16.345L3.59578 17.9784ZM3.00992 17.331C3.15515 17.5873 3.3552 17.8084 3.59578 17.9784L4.75 16.345H4.75L3.00992 17.331ZM2.75 15.7108C2.75 15.9917 2.74904 16.2694 2.77037 16.5036C2.79311 16.7532 2.84694 17.0434 3.00992 17.331L4.75 16.345C4.78302 16.4033 4.77187 16.4291 4.76212 16.3221C4.75096 16.1997 4.75 16.0284 4.75 15.7108H2.75ZM2.75 14.2894V15.7108H4.75V14.2894H2.75ZM3.01004 12.6688C2.84699 12.9565 2.79313 13.2467 2.77038 13.4964C2.74903 13.7306 2.75 14.0084 2.75 14.2894H4.75C4.75 13.9717 4.75097 13.8004 4.76213 13.6779C4.77188 13.5709 4.78303 13.5967 4.75 13.655L3.01004 12.6688ZM3.59558 12.0218C3.35516 12.1917 3.15522 12.4127 3.01004 12.6688L4.75 13.655L4.75 13.655L3.59558 12.0218ZM5.18225 11.6018C4.90264 11.6298 4.62617 11.6564 4.39522 11.701C4.14901 11.7485 3.86561 11.8309 3.59558 12.0218L4.75 13.655C4.69529 13.6937 4.6685 13.6851 4.774 13.6648C4.89477 13.6415 5.06511 13.6235 5.38126 13.5919L5.18225 11.6018ZM6.48257 11.4718C6.5744 11.366 6.64144 11.3991 6.38168 11.4533C6.13106 11.5056 5.77062 11.543 5.18225 11.6018L5.38126 13.5919C5.92318 13.5377 6.41045 13.4903 6.79008 13.4111C7.16055 13.3339 7.64036 13.1888 7.99257 12.7832L6.48257 11.4718ZM6.48256 11.4718L6.48256 11.4718L7.99257 12.7832C8.27695 12.4558 8.44718 12.0448 8.47763 11.6122L6.48256 11.4718ZM5.65499 10.4603C6.02944 10.918 6.25788 11.1993 6.39814 11.4135C6.54352 11.6355 6.47273 11.6115 6.48256 11.4718L8.47763 11.6122C8.51534 11.0763 8.27865 10.6345 8.07133 10.3179C7.85888 9.99341 7.5478 9.61535 7.2029 9.19381L5.65499 10.4603ZM4.82994 9.04114C4.8859 9.3671 5.028 9.62583 5.16853 9.83354C5.30035 10.0284 5.47702 10.2428 5.65499 10.4603L7.2029 9.19381C7.00167 8.94786 6.89393 8.81465 6.825 8.71277C6.76477 8.62376 6.78976 8.63667 6.8011 8.70271L4.82994 9.04114ZM4.8734 8.16982C4.79497 8.45353 4.78013 8.75104 4.82994 9.04114L6.8011 8.70271L6.8011 8.70271L4.8734 8.16982ZM5.83553 6.83986C5.63681 7.03857 5.43969 7.23432 5.28915 7.41506C5.12864 7.60775 4.96151 7.85106 4.8734 8.16982L6.8011 8.70271C6.78325 8.76729 6.7571 8.77765 6.82587 8.69509C6.9046 8.60058 7.02505 8.47876 7.24974 8.25407L5.83553 6.83986ZM6.84051 5.83487L5.83553 6.83986L7.24974 8.25407L8.25472 7.24909L6.84051 5.83487ZM8.17005 4.87296C7.8514 4.9611 7.60817 5.12819 7.41554 5.28865C7.23486 5.43916 7.03917 5.63621 6.84051 5.83487L8.25472 7.24909C8.47935 7.02446 8.60112 6.90405 8.69561 6.82535C8.77815 6.75659 8.76779 6.78272 8.70323 6.80058L8.17005 4.87296ZM9.04196 4.82947C8.75167 4.77958 8.45394 4.79443 8.17005 4.87296L8.70323 6.80058H8.70323L9.04196 4.82947ZM10.4607 5.65439C10.2432 5.47646 10.0289 5.29984 9.83412 5.16805C9.62648 5.02755 9.36782 4.88547 9.04196 4.82947L8.70323 6.80058C8.6372 6.78923 8.6243 6.76426 8.7133 6.82448C8.81516 6.8934 8.94834 7.00112 9.19424 7.20231L10.4607 5.65439ZM11.4718 6.48168C11.6115 6.4719 11.6355 6.54264 11.4136 6.39728C11.1994 6.25706 10.9182 6.0287 10.4607 5.65439L9.19423 7.20231C9.61562 7.54707 9.99353 7.85803 10.3178 8.07041C10.6343 8.27766 11.076 8.5143 11.6116 8.4768L11.4718 6.48168ZM11.4718 6.48168L11.4718 6.48168L11.6116 8.4768C12.0447 8.44647 12.4561 8.27603 12.7838 7.99123L11.4718 6.48168ZM11.6018 5.18196C11.543 5.77006 11.5056 6.13033 11.4534 6.38083C11.3992 6.64049 11.3662 6.57351 11.4718 6.48168L12.7838 7.99124C13.189 7.63905 13.334 7.15946 13.4112 6.78915C13.4904 6.40968 13.5377 5.92263 13.5919 5.38097L11.6018 5.18196ZM12.0215 3.59596C11.8308 3.86592 11.7484 4.14919 11.7009 4.39529C11.6564 4.62613 11.6298 4.90249 11.6018 5.18196L13.5919 5.38097C13.6235 5.06496 13.6415 4.8947 13.6648 4.77399C13.6851 4.66854 13.6936 4.69531 13.655 4.75L12.0215 3.59596ZM12.6692 3.00981C12.4128 3.15508 12.1916 3.35524 12.0215 3.59597L13.655 4.75L13.655 4.75L12.6692 3.00981ZM14.2891 2.75C14.0082 2.75 13.7306 2.74904 13.4965 2.77036C13.2469 2.7931 12.9568 2.8469 12.6692 3.00981L13.655 4.75C13.5967 4.78301 13.5709 4.77186 13.6779 4.76212C13.8003 4.75096 13.9715 4.75 14.2891 4.75V2.75ZM15.7108 2.75H14.2891V4.75H15.7108V2.75ZM17.331 3.00993C17.0433 2.84694 16.7532 2.79311 16.5036 2.77037C16.2694 2.74904 15.9917 2.75 15.7108 2.75V4.75C16.0284 4.75 16.1997 4.75096 16.3221 4.76212C16.4291 4.77187 16.4033 4.78302 16.345 4.75L17.331 3.00993ZM17.9783 3.59577C17.8083 3.3552 17.5873 3.15515 17.331 3.00993L16.345 4.75L16.345 4.75L17.9783 3.59577ZM16.5 15C16.5 15.8284 15.8284 16.5 15 16.5V18.5C16.933 18.5 18.5 16.933 18.5 15H16.5ZM15 13.5C15.8284 13.5 16.5 14.1716 16.5 15H18.5C18.5 13.067 16.933 11.5 15 11.5V13.5ZM13.5 15C13.5 14.1716 14.1716 13.5 15 13.5V11.5C13.067 11.5 11.5 13.067 11.5 15H13.5ZM15 16.5C14.1716 16.5 13.5 15.8284 13.5 15H11.5C11.5 16.933 13.067 18.5 15 18.5V16.5Z"
                    fill="#36373C"
                  />
                </svg>

                <Text color={color.bg100} size={fontSize.base} bold2="400">
                  앱 설정
                </Text>
              </Grid>
            )}

            <Footer {...props}></Footer>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else {
    return <Spinner />;
  }
};

MyPage.defaultProps = {};

const Profile = styled.div`
  margin: auto;
  width: 10rem;
  height: 10rem;
  border-radius: 5rem;
  ${(props) =>
    props.user_profile
      ? `background-image: url(${props.user_profile});`
      : `background-image: url(http://115.85.182.57:8080/image/profileDefaultImg.jpg)`}
  background-size: cover;
  background-position: center;
`;

export default MyPage;
