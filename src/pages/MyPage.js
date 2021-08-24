import React from "react";
import styled from "styled-components";

import { actionCreators as userAction } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

// style
import ExifOrientationImg from "react-exif-orientation-img";
import { Header, Footer, ProfileTab, PcSide } from "../components";
import { Grid, Text, Image } from "../elements";
import Spinner from "../shared/Spinner";
import theme from "../styles/theme";
import logger from "../shared/Console";

// 이미지
import { png } from "../styles/img/index";
import { webp } from "../styles/img/webp/index";
import { isWebpSupported } from "react-image-webp/dist/utils";

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
    if (!is_login) {
      dispatch(userAction.loginCheck());
    }
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
        <PcSide {...props} />
        <Grid
          // maxWidth="36rem"
          minHeight="100vh"
          // border={border.line1}
          margin="0 auto"
          padding="0 0 1.47rem 0"
        >
          <Grid shape="container">
            <Header {...props} shape="마이페이지" />
            <Grid height="4.4rem" />
            <Footer {...props}></Footer>

            <Grid margin="3.6rem auto 2rem">
              <ExifOrientationImg
                style={{
                  margin: "auto",
                  width: "10rem",
                  height: "10rem",
                  borderRadius: "5rem",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
                src={user_info.user_profile}
                alt="profile-img"
              />
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
              <Grid
                width="24rem"
                text_align="center"
                margin="0.5rem auto 0 auto"
              >
                <Text size={fontSize.small} color="#9A9896" line_height="150%">
                  <span
                    style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
                  >
                    {user_info?.user_comment
                      ? user_info?.user_comment
                      : "프로필 수정에서 한 줄 소개를 입력해주세요."}
                  </span>
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
                      d="M21.2274 25.1883C20.7716 23.6998 19.7672 22.3846 18.3701 21.4465C16.9729 20.5085 15.2611 20 13.5 20C11.7389 20 10.0271 20.5085 8.62991 21.4465C7.23276 22.3846 6.22839 23.6998 5.77259 25.1883"
                      stroke="#36373C"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="13.5"
                      cy="11"
                      r="5"
                      stroke="#36373C"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19.5 17H25.5"
                      stroke="#36373C"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M22.5 14L22.5 20"
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

              <CopyToClipboard text="https://mealchak.com/" onCopy={copy}>
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
                      [
                        "이제 친구들에게 공유하고",
                        "함께 밀착 서비스를 사용해보세요 :)",
                      ],
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
                <Image
                  shape="setting"
                  src={png.setting}
                  size="30"
                  margin="0 1.2rem 0 0"
                />

                <Text color={color.bg100} size={fontSize.base} bold2="400">
                  앱 설정
                </Text>
              </Grid>
            )}
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
  background-size: cover;
  background-position: center;
`;

export default MyPage;
