import React from 'react';
import styled from 'styled-components';

import { Grid, Image, Text, Button } from '../elements';
import { history } from '../redux/configureStore';
import logger from '../shared/Console';
import theme from '../styles/theme';

const Post = (props) => {
  const { color, fontSize } = theme;

  return (
    <React.Fragment>
      <Grid
        maxWidth="32rem"
        margin="0 auto 2rem auto"
        bg={color.bg0}
        border="0.1rem solid #EBE9E8"
        radius={fontSize.base}
      >
        <Grid is_float="left" margin="0.5rem 1.5rem 1.5rem 1.5rem">
          <Grid is_flex>
            <UserProfile src={props.userImg} />
            <Grid>
              <Grid is_flex>
                <Text size={fontSize.small} color={color.bg100} bold2="500">
                  {props.username}
                </Text>
                <Grid
                  maxWidth="9.1rem"
                  height="2.3rem"
                  bg={color.bg20}
                  radius="0.5rem"
                  padding="0.4rem 0.8rem"
                  margin="0 3.3rem 0 0"
                >
                  <Text
                    size="1rem"
                    text_align="center"
                    color={color.brand100}
                    bold
                  >
                    모집 인원 2/4명
                  </Text>
                </Grid>
              </Grid>
              <Text size="1rem" color={color.bg80} bold2="400">
                {props.insert_dt}
              </Text>
            </Grid>
          </Grid>
        </Grid>
        <Grid maxWidth="29rem" margin="0 1.5rem">
          <Grid>
            <Text
              size={fontSize.postBox}
              line_height="150%"
              color={color.bg100}
              bold
              margin="0 0 1rem 0"
            >
              {props.title}
            </Text>
            <Text
              width="28.8rem"
              height="4rem"
              size={fontSize.small}
              line_height="150%"
              color={color.bg100}
              bold2="400"
              overflow="hidden"
              display="-webkit-box"
              webkit_line="2"
              webkit_box_orient="vertical"
            >
              {props.contents}
            </Text>
          </Grid>
          <Grid margin="0 auto">
            <MainBanner />
          </Grid>
          <Hr />
          <Grid>
            <Text
              size={fontSize.small}
              bold2="400"
              line_height="150%"
              color={color.bg80}
              margin="1rem 0"
            >
              배달 받을 곳
            </Text>
            <Text
              width="29rem"
              height="2rem"
              size="1.3rem"
              bold2="500"
              line_height="150%"
              color="#36373C"
              margin="0 0 1rem 0"
              overflow="hidden"
              text_overflow="ellipsis"
              white_space="nowrap"
              display="block"
            >
              {props.address}
            </Text>
          </Grid>
          <Hr />

          <Grid is_flex align_items="center">
            <Grid>
              <Text
                size={fontSize.small}
                bold2="400"
                line_height="150%"
                color={color.bg80}
                margin="1rem 0"
              >
                배달 식당
              </Text>
              <Text
                width="13.6rem"
                size="1.3rem"
                bold2="500"
                line_height="150%"
                color="#36373C"
                margin="0 0 1rem 0"
                overflow="hidden"
                text_overflow="ellipsis"
                white_space="nowrap"
                display="block"
              >
                {props.shop}
              </Text>
            </Grid>
            <Grid is_float="right">
              <Grid text_align="left" padding="0 0 0 1rem">
                <Text
                  size={fontSize.small}
                  bold2="400"
                  line_height="150%"
                  color={color.bg80}
                  margin="1rem 0"
                >
                  주문 예정 시각
                </Text>
                <Text
                  width="13.6rem"
                  size="1.3rem"
                  bold2="500"
                  line_height="150%"
                  color="#36373C"
                  margin="0 0 1rem 0"
                >
                  {props.orderTime}
                </Text>
              </Grid>
            </Grid>
          </Grid>
          <Grid is_flex maxWidth="29rem" margin="0 0 1.5rem 0">
            <Button
              width="14rem"
              height="4.4rem"
              radius="1.2rem"
              bg={color.brand20}
              border="none"
              color={color.brand100}
              size={fontSize.small}
              bold={fontSize.bold}
              _onClick={() => {
                history.push(`/post/${props.post_id}`);
              }}
            >
              자세히 보기
            </Button>
            <Button
              width="14rem"
              height="4.4rem"
              radius="1.2rem"
              bg={color.brand100}
              border="none"
              color={color.bg0}
              size={fontSize.small}
              bold={fontSize.bold}
            >
              채팅 시작하기
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {};

const UserProfile = styled.img`
  width: 4.5rem;
  height: 3.8rem;
  border-radius: 2rem;
  background-image: url('${(props) => props.src}');
  /* background-image: url("https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg"); */
  background-size: cover;
  /* margin: 0.4rem; */
  margin: 1rem 1rem 1rem 0;
`;

// 게시물 카테고리별 사진
const MainBanner = styled.div`
  width: 28rem;
  height: 10rem;
  margin: 1.5rem auto;
  border-radius: 1rem;
  background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMWFhUXGB0aGBgYFxgYGBoZFxoXGhcYGBgdHSggGBolHRUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAFBgMEAAIHAf/EADkQAAECBAUCBAQFAwUAAwAAAAECEQADBCEFEjFBUWFxBhMigTKRobEUQsHR8FJi4RUjcoLxBzOS/8QAGgEAAwEBAQEAAAAAAAAAAAAAAwQFAgEABv/EADMRAAICAQMBBgQGAgIDAAAAAAECAAMRBBIhMRMiQVFh8AVxgaEUMpGxwdEj4VLxFTNC/9oADAMBAAIRAxEAPwDsk+paB06ritPnkxVUuBFoVUk8ycTEJXHgjGjBMKBMBjYxGFRsTGQZqbCPRGkeAx4mekjxkyaEhzGhMDp2LJZSQHU7PsBCt9wrGTGaKTYcCW14iE/EkgQOneI5btFj8XnsUgxUqMHSbgC8TH1d2O4c/Tn7x9KKQe+MQhInhYcaRIRFGhSZYykFouypiTpDdGpSxRk8+XSK20lWOOkllRSnz1qUcuiYtVE0S0FR2inhaFzJapwAZJII3PVukY1jscVoSD1OPKaoQBTYw44Az5z2RWqBuXi2vEA1tYHViSlT7GKM6YQWG8SRrdRXuXP6x0aauzBAh44g6MwQogWJAsD3iE4jvlgeCuWhXrISzkbE9or09W6QerQRtfewyG8PIdZxNInJABGfWH6arC+hiwUQFlzbhoMmpSEZydNYq6HWdonfPIiOp0+1hsHXwmZY9yxHmQoJLqv0IHtzFOmqClZSS6XtzBTrq9wHn4wa6diCR1HhL7R60SJD3EeTVBIJUWAhvIHMAAc4mjR55g5EVfN8zT4dusR16QJZS99RCD64c7OQPv8AKNJpuQGhARumAWFV5SQlem0HhDGn1K3LkfUQeo05qbBm6ZkSonRUmzkouotEaMQlneDdqF6mC7FmGQDDcioi9KnPCwrE0p2MEaCtCw4Maq1VbttDcwVmmdRuI4huMin50ewzkRXaYu54jVGGPHhcmNgTYGMERTFMCYqIqy0T9Z8QXTYyM5jNWmNgyJfLR5mGxgKcUAVlWwHPEVMYCkfDMudOYBXr7H7yqCPnG/8Ax3gTjyjLGpVvCvg+JVAstlAb8wSm1Cl9oZfWoo9fKCXQ2buennJa/FG9KA5MDatPlS80w+o6JEbzAUkEai8D8UmlTqVctbpEttcHJz16DyliihUwF6ePmZrhlapz6rwUmVqiB6oRsPkrQsrdn+sFjXW1hS6g7u6YyE7TvlcRro8XOhYtFxVRLX/aYUcNmEpUsF2Nxu3MXzOUlOZaSARYm0eZbh6j1/uKvRXu7vBlrG1n0pzONYm8M4ipE0SSr/bW4ItvvC/PrHILx7QV0tE9CpjlIIJA1glBftFb3/1GG04agoRng+HjGXFwpClIUbJNgdWOhgDV4ilDObhUMHinFpFVLKpKCVyyCVlkgjcAveBp8PSMwnTEOggOlyfisT3Dv7RSb4eljkhsjwkurVmtVDoQfHPvxhSdNRMpyp2DPFLDaWUCCZroSPhd7/1GFmonLppkylWp8h9J2I2Py+sb4dXlCnToqxHIdyOjtChUo5DLHq9OWqJRuvI9+EdErQSSLRXxOQVpZJuPrEeHrClKV5ORB0S5JHzinPxJQWUolqN9XYAPq5F+YA4PXjnr4fXmLqpV+Oox6/tLMrxAcstE0gCXYbHi8X6lCZgdJDs9jA2d4dlVBTNmS3JGmYgW3IDQToaGTLtLKQRqwf68QxuDAZyc46/wflAFlU5X16fzNMFrVJUULSr5aRR8RVs0l8rSxtYnuoA2gjUrZbJLgfEdT7cQOxOQCorBd+dxA7NZivsj09/rC0KpuFmB09/Kb4XiqMoDsYsUiM6jmL3hWJ8lX1Sen7xfo8UUCSDcl44LACN/QftG302ctX4wtiOGlF03HEWMMxFRTkOu0e0VZMUCpaXS1opLWCcwtHmtWtt9ORnw/keEVwXBrsGceMKzKMrubx5+CUnQCIpmKeWkKUUhJ/MTaIZfiBC0kiYk9v0g5rVhuYmLjtM7RJqidkBGQnq0U8Mr8kwKBsSxEDp+PuTkf3inKmuX3hRnKMGB6R9NKezIcdZ0lNYOYyAlJVOhOmkZF8XZGZDNGDjEmK41JjFCNYYgcT2YHSR0gTKNoLnQ9oCSjED42PyH5yloejfSDcel+gneK+GzJlQtSihKUZQkW0y7g8wYnUgm2OkEKalQgBOgEI6e5lr2jxlJr1VAMZMrS6XRto3UAHu0XFTkpFrmBdXO1gVlnOM5MAhZzBkzFpZOUKcmKVdUggxQr6QCb5gLXciB+MYklAJJ9ocq06krsj1KkAl8D+pFOxVgElmD/WBtdjQ0SYBVNdmVw8aJCXZiesXk0ajkiIXfEVQkVwijxFMlA5VG8SyvElROUlBJUSQkAnc2HQRUwzCDUTUyk6qLAnQbknsIf5vhWmoJJnnPNmpDpUTlSFDQ5BoO5Mets09ZCt1PQRG2+xjuJ4+UloMGmZU55iQopzZRdh331EVjRzCvKlJX1AJF/tF/AqxK0rmpdWewJsEpTZKd3Zzfckww4PKHk5swZ1FyQNCxJ+URcv2jKf69/Wd0Hxa7eQ5BGDBGGYMpLqnMlLWS9yf0gzKnpmpMolQFgGUE6f3EvxpzAHGULWvOiYyR03/aKMynyJA84qmK9TbCzkDga/ODLayDjg/WL6zV3O/a7gR4Dw49+Map+ESAcypaCXfMtRWr6kxDUVUmUlwz/wBKEX68aC/tCzIxebmygnOr5p4bg7xdM8qAQQE7EuDpxAb87gTz8zCaTUWXIQBjHkMj5eMcqGplKYPYP8QZyd/vFmZLlFmT8rCFNNU2kbory+phbt2IwVEoHSc5VjDNRMILOAkace7RSnKF8p112ipOqwYh/EH2hbvND11ACEqdbDWPVFwRxpFOUthq5jJtQEhy3aOKhzOkZPE2lUqZhUg2UEuk+5cQLw+elK/UkKYsYty5Kyn8QnkgDlOh/WBa6Uyz5qTmlkt1SeFRUVd1QXxX9oWsjcwJ4P7zpHh2Yg3DZW0P2AgXj8hl5khOVR+FNynvxEWFTlCSSEkuGSoaB/sYIYbhxKVzJihKASWIOhI1J4gqsbUWoDk8+WPfsyTxTa1pPHTHn784DxWmyjKpLy1Bjf8AjQoTcMXKUyC6Pys5LHkR0QJEyUygCR/HEL6ZZSo7GMOwrIP/AMt9pR07kg+Y+8W5Etb6Fn1NvpBgUpYZTfeLOHykrWpALFNy/Bf9oLLlSJbFUwdhvG3rUjj7kTbajPHU+gMHSqecAA4+cZF5WL072QWjIH3f+Qgf8n/A+/rDZEeCN1JinVVyUFte0W7LUrGXOBIddbOcKJPOPpLcQJoKZRF7RYTiSFWD21BglS1CGGUDrEfXWVaixUB6cxyoWUKcjrIEU7aCNJ8wSw5FzpE+IVGVLjWF2pnnUlzCFpWs7V5P7Q9NbW8npNpk/eBtbWiJZEwLUx0GsGaWikZSrICBqVX+8BRAGwY7Y4q6ic4xLEio5UAk8C8CqzAJ864Ciexjrc2qp0fClL9ABFGoxN7JIT2F4r1XWLjslmWsNi4ZcD1nJqfwfWKL+VlY6qUkQzYX4XUkuQCSL3eDUxClKLJUptycqR77+wixRy5xQplJKUfEyspsH/5dm1Y8Q72uqY9QPkP7in4fTjk5+v8AqVafDUyMikoGdPGp78Pp7xN42xhEylXJkoUVTAwG4ckOewJP6xRmVDTElJa9w503BeJ8aUpBCXD+oNuCOO8JMzC4E8n39prU6dNm7OBjoBn2YuUNQJVMlIUxA/8AYNS6vJKQldrOeXJcfeFitSVBhrpElNLmK8sFXqFh0DG/sBBWpVhknxzI+mG1bSAT3fDyzzGBGOSkD15ilWncdIiVImz0zFyZJTplJsFB2Um5sWJuIhrqjy8jF1AakDL11s0Q0niGYUrUpThgBxZ3aPKp/OBn5nj9JMB4LYktOooUcyMixY3B04I2i2aj8zFuYXPxcybmKUrWQCSwJYDlgWESYXXlknMpJVf4jlPBaOvpie8ZZHxAV1LtAJ8fDmMIrW7/ACjX/URzHiKSQUlalKZnLkaC6r86wteF5QqFELWp9mNgba/OBVaZLASPD0jNPxRChZxjH1jOcTSIjVi40/zCZi1QqXMXKULpU2YEsRsfcNGlNVswcl/b5cwf/wAcAMx+vVo/5Y3zMbVolKjFT/Upy1epgniI6JBUQGLbmN6qjUg2vHFpqU4A5h2cr6RpwzEVZQhSrbDjpEs9klR1BspOx69CIWaOaSQAC50G7w64xTpSlBSPUr4g99NYXtpKMXQ9PeJzcvAI6+8y5hykoSJsoqVILeah/UhXUf0voqCeF4gmeTLUsSwVA3ALgbcPYQmU1UZK8ydDZQOhB1B6RNOZLLln0HbdJ4PI4Mc3nAsToOo9+HpAtpdzFWPJ6H+/X18Y0YbOAUtOZwFFi2oexj3E6IH1JA6wFoKxRUVuLAO5uR0G5gx/qKQgqN+RGd621lG464grKnrfK+mf0gHEKTOk5WzjTZ+Q8LqppBKVOCNQdoZ6uaosqTe7mxbKeDoT0gb4jphMQmakMoFltwdD8/vGEXACWHmOae0Kcjof3gzzesZEH4Bf93yjI1sHnHu1E6VX4ilmQQX3iiJAyKmLNmtG1ThhF2tFCrRnTkKiwgFlpst3W/QSPTWgUCs/OU5KDlXN/jRSk+IxLmFBLDn94sVKZgAQk+neFTHqeWmYoOX2Oj+0HFFNjceX3jTltpzjk+PlH6rrQpCFAgnvASuq2ELWG4oJSUpUp3Di4Nj2Nu0CsY8QZiydN/2jqfD3NmPvMo6VJkmO2DZ1ZlsyToTYHtzBUTX9N78R7KnS1IzFLgoGVi2U2Ytw0WP9dkSksiUonclvvA60qsbc2B9/6hGZz+VCT9vf0gzy0uwzE7MNfm8Dsak1Mqm/FLQhMonKgFQzqvqw2seD94mr/FEwOUJSgtqwJbUO8Li0z5qPNmzf/sUsJkoJDguFKyD0oQTY8tvFTTJXjP8AqK6xbxtyOP1J9PKEMJxrz3SEkEByE5iAOTwHgiZOfuN4F+GDNpM5TqpxkKPSysrkrzPbKPTla+og1Sy5igVKCSHLsGZ7k9T7wZiD+XmLoGUYIxB66V1D1ZRdzwWLE20dn94HVviEKUpwxfbQdnvButlTGdEtSjsyCQ3UgMIV6/C50wnLKmFW5Kco9ngDCpj3o1Ucgg88Ylafiab5ReNMMlmfMDKINyDs4Fh2sY9R4aqyLSiPdIf6wQoPDdXKMtRQBlUD8Qexf7RsvSgO1hn5iI66uw1hKl/SeqwqbNOSasFGrJcHpt1+kQ4fRIyZSAQFpzghsyUqGZJUA4cA/KDMuomy1nNLWA9iz2fkQAq6go8z0llkqY2uSSH6dIxQ7HjjwxjpIX4W0nAUx8qcVliSyEolSSLAAJdJtYBvnvHP5OHeZPUmWt0OAlw5u1iNrkxmL4fNTJkTCpUxSwozGexLeWkNoAPqIjwRa5C0KWnKrMLMxSkfmVwd76tBlTCllbOf4MEamxkx2ofCWUHNMXwLpZwWNm/loVfFOGGiX6VeWqY5dAYLAN2D+gh7gW05itjFXVzZijMqVBjZIKkgeyde5g34fKZyUy6gCcJb5c7k+serU7WbsI6O7hs5z1A94M6ihQCxz6Rfw0H0zHCljRSgFHeygp3ta8RypyvOUqYA6i7pSAHLAAAadoK45g6JEwJlKLKS7HVNyGfcRSmU6yAHuDmB/wAwXtxjHnPoatCbFWyvpGWibciNMTq0pSwL/wA0hWmVsxBZbiKk6sKtTCK6Rt27Mo7lH5ocosRUielcssU3uHuRxDnhNT+IIzTGmEtcH1E7uLDtHNqVd4acKW5G2l+sc1A2iMBAyZHXzjRitAqUrKQTbXaIKJSWVIX8KroV/SrjsY2qKhawStZUWs8Dqtbyw9jCCWAWZUcdMGZVC6AMefSWsKrcqgpnbbaDlJVpzZiwCy+1vbaE7DF2Fxd7b2LX+UFpa4w+UbAh7KRZz795jzKUhYKU37W+rQGrJJlqcfCTfpEuDYqgDKss2kWK2slEEZwQeIYfZbWGyAf2klFeqwrg4nkueCBdMZAfzIyFh8StAx/MP+GEMfjc3pLP1it5oSsZkJY2cNFCtkl05FpU4ueDFVcqY7EF/nAE3K2SeZtKEIyDgH6Q7UUaToWfS4a/eKMnC5S0rzJSTpe6v8D2iiqetsqiW4MXKGolDVYGbXVwftDC2Zfuieap1Trn5Rfm+D5anIl26bQCxHwDqULI6KD/AFjp0uoUjQhSW2Ij2opEzJU2bmy5Ekgf1K4gteovDba2OfEHyH2gXes/+xRjzHr94s4Z8KUOAzIJ/XtFOqsS8RUkxlK7vFXGqnKS7g9esDWsl+PGWEAVoMxSa7BPX6Rewau8qURkSolQLqSkswYahz2gBLXmWH0eGWnly1hkBiOv6w/Z/jUCcYJYdrDIluvxFKpyhLICCfSVkJF2+IuwAb6npFxWJBJKEkLykJdJsNPULNzC9XUe8YrE50yYjzDYJyp9KQAHGjAPHd+9Sw6xSzTbGA6j3zOi0FY4A0GkZOksrK1/5d4E4evTqIuzFrzf25d3d9m4H7xAfJOG8IB6tj92ZUHKSm1uI8MoqDHf+WioVsYt01aU6GPdDkcD9YRkZV45M8WE7wNqaVDLZKVZgR60hTWLEPoRzG9ZUeoO5zE/Ylz8oqrmmDU768FTO9kGHMANNlDKFZUgMGt8z7wvV+ErLqClAkubm/e94dJyXEU1yg0VKdUyncOsXt0VRB4EUUeZLT/uEKIHpdyfc7iCGCeIRLWBMl62zgtl5tx1i7USgolOtoo0mGJUsubXHW8PC1GGXEQs+FVleOsNeeaicooYpJsTowAAPSw+sW14eqWnMoC5Z9Q/A9mhapZhkTwtNgmxTsQP13gxXVy5pBJAGw7/AKwKwKBGal1NdoRR/jH3mYthYnSS3xJug/pHPRNI1jpVFPFgTHP8QpleYsJSSMx0BOpgvw9ydyN9J74mmArr194lmjXpDfghG+0IdFNKSxtDdh9UyDvHNbWcYh9NfvpjDUVaRqqAmJ4snKWOsCsUr/yveIcFokzZqPOUUSSWWvixuPdoBRo1GGaea7A4hPCa0FbZtWPY7iGiSYSqqjFNPyeYiYkn0zEKcMTZX7iHDA6wFny5kliDcOPuIHrqdveHSM6bUBl9ZYzGJ6dDxvOmAkqOW52DAdhFWrrkJ3iWQW4WHa8YhPzE8x5ClMxlLmxj2Cfgn8oHePP7w75k0JfIW9ogOLrQfzJPWGupw9bNl22hfxbBklIlonGU5KlBSXdTMm50AcwaikE98Yi73jb3RmWFeKkJSgTZAL3BV+YHd+YjVitLNlqOUS1C4Yu/SBNLgNQZgaUchspQWmYkhmJIsbm8bnwukTkSlCakKUolaVAJyZXYAuxB+8PtpxtJJ49+MUS9VbGCD6f9yxTYgnVCxqxAOnf5xYmrmL+EP10HzMFcKwGkpwyJQc/nV6lE8knT2ghUUlgVDT2+bRFeyrd3OR5mNrqjnkcxY/05IUSD6SA4e/Vi1j1a0CsV8PzJqiULUrhKy6mGwVoe1oYK4CXmWSwGsAqfxIFzFSwDl2U2h4LaXe8NUWWklkGQPfEMbgCBu5PvmJ1RIUhRCnBBuDqCIL4ctcqZlWlSFbpUCD0N9ozxBN8yaFH4myk8too9ee0VZcpkeaST6gkDlLHN1f4WiocWJg+MNhl5/WNs+UCjNy9uGb9/vA+dTFqZRLgmYm5t/tlKm7MqMo60FDO/76aRSq6l0IlGYAUzicgDqS4ZSiGbYBneFNNWQWWZsbgc+P2wY20UzTTiCFdVAqLaAMP+oYfaEimxjyz5cwM2ig5TfuBF2bjaSGCxCVmkcHGOJ3slchs+kK+fGv4kavCxUYvwX7QJrMcKWOrnR79zB69A78T2oZK13OY5zqkcxCqrQN4VpuIizG56xCqao8/MwcaHHWKjVVkcRiqsVSHAuft3ij+JXOJCCAEi5NhfQPAVZJDRZoMdEpHlKTYEnMwv3/TvDVelVRkDJk3U327SR8gP7/1iGk0a1oJAV36ddvrA9FSiWoi/ZtDANXimalSsi1JSbNY294qKxbMXUSSdTBvwjEcj9IHQarsyRbZkfOHaqoSVFSdTztFb8UobmBYxIPvDAK9EyWkF1AXA3zKbOX6ka6/KOms1jkZldNWlnFZlWlrphWADbdxtv7wweGZKxNIUWl7d7AH5awKw7D5hUMss301NjxzDjQ4UqXl8wkKJ0YsE8vobn6GFNXYNhUAdJ5Vw28nrCuNeGZCpbTUhStiAxHUKsfuI55i+BTKb1oVml87jgKH6x07EalJISm4QAl+baxRXLCgQoOCGI5ieusal9o/L5dff0naq9y7n6n6TkeR7mLcqYE65uw0i7iGFFM9aQPQLjsdB9YhmUg7RZ7VWE8qdQIOnpdVtNv2gwrEfJITlTmADqSTew1GkVE0xL7ARFNlJYsXPaNEq3dMw1RU5EJzvEKiglmb5NFakrTM+JTmK7AyyklieA8VKWlyli5G+zRlKawCAMRaxrg24DiM3kxkS06WSPU9uYyEjbz1joTI6R7lYtNSGB31N49psUF/NTnf81nbiKs1QUX0+0QzJcS1vdT19/WE7Kph0x8v7hKsNMpBMt0LOli3u1oq0GR2UopVZ1XP80ipGIIBBjT3Fuo/3854UKARk/wAwj+IJaGWVMSpGU6sB100EJU2cxaD0vEMxSsHIABc6ONh1MZoATPr4enjF9bRkKR76YgHxFT5krluz78bwuy5CZQZPudyYZ8WQuesqSMoPO0QycHl6r9R+kGqcIu3PGY2gQAOR3sfWI1dKXMU0tClH+0E/aJaXwzVrDKSEMbOr9njokmiH5UH2TF6kRl+OWT3tDP40qAoGPXkwVtmTuz9IlYb4TULrmKJfQW06u/1EH8M8OBB9CcraO41+phpWoJY+hHAfpEP+poF0lz2+sCstOe+306faK/ibGGEX+Yp434cyqZgQb2Fu0L1Z4fVs/TeOj1GIBR9mGkCquaCCIF+KKN3G4hk1NpUBhzOe1Hh6eEFYBKBcnT/2FivoydNY6RiLEs5+cLWKyAC7axU02rJIzN2UC9Cr+MBYdRrWoFUtZlp+NQDBP/JTEI7m2kFBIa4t/mL2H4tNkU6pcuYkJWolaVJBU/pAKCTeyRtbq5imZ3oJd/UW7OSIdtYNjEQ0+laoEN54Bmok3gdiJD2AU3y/yYI1c0eWG31I07PAwRivg5hnpDggxdOsaxIU3I6xumQo6JJ7AmKk+U2meSUFRCUhybAQ9YLhPloYsTZwbjV+/wC8DcAwiYhJmZDnUPTb4E6FXc6Qy4RQqlO7rUq7ke3NxEvW6jjap6fefS/CNEyDtHHJ+w+XXJjXQKMsBQ+IjgWB2AZmttEmIYj6h6wXS5y2A2Yjn9oiw6oQSUKQ5VZJ4tezts8B6lOVSgLh7F3fq7CJBUmvrwZRSlTZyOn3EIypoPcxaAG52vACTMIJ7f8AkWJtQcoSTc6wo1JzD2rgQJiU4qnqUmySftaKc2ruxAgxUUDg5faFGbVlKjmF9/aKunC2DjwgNwX80KLmvHstYe4gOcUOwiSTPWssBeD9gQOZ4XVtwJYr0uXEUFM4ff8Ajxe8k/mMRppklY+sErYAYg9SN9eFkqZa/wApLbRkEkyekZAO3iPYV+Z/USel8VJ0Wkj6wTp8blr0UD94P4T4IkU4zFPmzB+ZQsP+KdB9T1jXE8LlTQykA8HcdlaiJt9mmV8AHHn/AKj1d2/ygaZiAA1iuvERzC34ipp1MXfNLNgdx0V+8CpeL82hyvQKyhlORN/iqlbY5wfX3iPwxNGV1flD76DU2B0F/aD+ET5c5KVW4GV2tbfV26a6COWyK4uFBRsdQYbfDdSEJyA6H/IgOq0m2o7euZx332BQeCOMecdJflj41sOAk67/APvWLIxGllfD6upDn6wBqFnIF6hRLHtqIoTFPClTmscAA/L+5tNGtoyzHEYazxSo2QkJ6m/0gavFZqrmYfmw+UB5k8NEKqmClrH6mM16Smsd1RDaqkm6lEmPDVAQGRUxF+LZ3BEC7Ak8zrJ4Q3+Nb3gXPxkOUl+8DsQrgEuk34hfXWEnfW5J40hujRBuTEb8qRtHMZ5lSBrAjE6gK124gbNxA8xkiWVAq6Ws7n9N4dr02zkwptUcCb1c92szWa3v7xVE8sRtEk9KfTzvEhpQo9Wf+fOGRtAi7u00FSlQykBDPe5B6HeKM2YQrK14lqUsCw94GLWXfcaQetQeYhqr3RQBJ5SA7mOgYJNank5PSVJUStr+lSk5QfYD3jnU2YZi9AMx0SGF+Bt2jrPh/BhKkpzdwDs+tuYS+JutdY3dc8Tfw5gzHjgdfUmeopVuFJNzoU+kgnUbMxLR7WyZ6CAtJDjU3f3f6QVQwvoI1rakzGdy2jl4iC8EHI+Uso7bhwCPPx9IvTipLNmcnUWb3GgiaRLWWBJIB3Nh17wRKBHslQALizRrtuMCbLEA8QfXqEpGc2bbmE+T4kmGpcpcOGSz6bW9+YJeI8QTMCkFRIANgWuP0hXlVcv0JCEi91L9ay+gc+lI7D32ixotMpQs45MifEdXYjBVnTsNyzUFaPhc23HQ9oV8fwdp2YCyvvFvwalaZ2VPwLFx20MMuISdCQ7XY/aJzk6bUEA8H+YxTYbVE5lWYcUXaJKOcEJJOu0O9ThZMsTMvoVbseDCTjtCqUpx8J06dIo1Xdr3G6zrLtUsv1mGqeL+GUznNC6hUNPh6Y6G4glqYHEGbcrkQh5cexNljID2fpF906HRVSnYEF9jb5RriNIk2SQ+/R7+xgVIVtvBbDqtN0qDE7jpp+sQ6HB/xv8AqYe2s1tvWK2IUoVmlrS72bYv3tHNPEeAmStWUGxuNQOxjt2J0WZOYAancXvrCbj0kqb03AKXN+2vA0ijo7+wbbz/AARNWKdYoAx/IPoev0nLqCkXMUyfcw/UcuWmWFZyZ75VoyslKUvd9Co9NmgNIBkKch/tePJ2JKz5xbpFK5zaCB0nafh4q2kk5HJjxT1ZXICAbBRU3BOvzgRXKmJUlhbQ9rQMovEaEJYgwTqCpQCmIzB7uGfkRK7J0fLdPDMp07MbAR58SOaobq+UU51UlPXvFeuMwbW6QFnTFG5hqqjd4wl1yp1hafipPTtA+fiJO8UFExEsmHEoUSbdrHA7oxJp1WoxV/EF7xvLKgc7OBzFaoW+tiS8Nqg6SPfqrOpMv0kxGcFV03s7Xaz9H16CDfmylEeWbHRO73GnO/vCxQrUCSlKSw/MAWYE2fdgT/1g5hMyfZKVTAlarpl5r5rEMi5cbbtA7awephdJqWYnAHrMIS7kv2H0gjTsrROkMNLTrMoSUyJCQSAZhSAsaWL+on/rqYZMXwKTKTLyJYixu9iNz3+8IXPhSfKUkvUkDHXpOaYkBujsQYXJ8q8dA8Q0TJJbaFCVSKmKCRuYLpLgUz0ntTT2qjaJa8FYSJk7zFj0S791flH6x0iZUPpAzCsPTIlhA9zyd4uUlOZqiMwH6nh4k6q38VdkdBwIzpdMmnr5+Zks6eQm+8ReZHtXTLSkZ0txuC3aBEyrUCkbG2bg7PAhQScRhSu3I8/CHpCX7Qv+M8Y8iWUp+I2H6q9n+ZEEZNYQk5izb7Nv9o5jjeIqqJqlP6RZIf8AKP1OsNaDR77ct0H3k74jeakwOp6f3IJVTmBCyQ/5hxFPfWNUIJMEqWgCiAXj6JmVBPnq6rLjkdZ0/wD+MKfOoLIcJQ19HL6+whsxDDyyl8mwbQdesKvgOYJCVSysAZSQTYk7D5Ew9yqhCkEKNgASG6f+xA1AS3OT4kyoe0pYfICIOL1s2mTmSSZRLKTsCdCx50iv5KKiWxDZhZ+uhENFRQIm55R+FYI7Poe4ML+HSJch5Kz60kgv+j7Qojg1gj8wOMj95SVgcjHr6zn2I4cuRMKFgjg8jkQb8ISSoqENmI4fmF8sxHChcdv8RL4OwlAXNKAcrgB79794qU6ntwFPX7RTU1iqouJ6nCi2kZDkmhtpGQ92Ikbt4uyahExKVBQJIdwXc6NbdwYtSiSHGv8ALwh4XOMpelmPLXBH0h1w6tSsD+rpv/mPmNVQN25ZdAbb3hCEqtIYEOBEVbhEueM0s93jedLcaMYpLKk3SSDA6b8HbZyPvMovO6s4P2ir4gwnKSAO/I7wnVUrKWjqVfMnTAVAIUUXLZXA0JvtCTiFKJkwWCQpQHYEgGLGnsGfSPoxdMHqIc8B+HJIR+KqgVOHlIG3Cy9nO3z7F6unkrCsylIOzB+zwamyM6QmUklk/DwBx0gHUyomPq3sfewHp8otplDEncQfLPT6c9Yupkk5kn1AaKZn9oE4lhViUj2hxRLbUOP59Y0rKLi4IcHpBk1RVtwjxUEbGOfWctmHLYxEsw1+IMFcFaBfcc/5gFJwzzgfJfzE3MpRGYjlBtmbca94u0WLau4SJqw9J2nkeBni1pyISBrr7D94CTrqMTKzJJBcHQuLxqogsw0hpBtkqw7zJ6SiUQVGyQxJOmoHc63a4DweTUyghBlqKSC6gNQWfMleoS9hZwCHcxUWoolJBHpUOo7/ADETYZQJmLlhJDLIAc3BJAILXsSz9ICz5GSOkdpo2vtVsDE6TgakzvKk+YpS0AqzrRLK1JUz50KHpLMxYnRy4MMWL0YCMwzFtCWNtDt2gBR0WUpSmqSpeXL6QHSGHpCm6Mz7RcxeUqRLQ8xZKizE2Abj2ibqzvVjth9PVgqA3y6ykvD0VCsjuwKikkBJbR92eB5w9KVS1NKdKSXlJyhWY2B5KQnXlRG0Q+IatQlFQKnysMpYg7EFnAHAgThGPZgrOLpAvzol+pcjTmAVhvw2EHoY8vcvAY4448s+WY009KVsdioJ1Gp/wI1xunTJORMwH0g2F8w67GB0rEQxLaj020Ni49vvFebOe8LqoUYxKCoxfJPA8POeTq2YooCjZAIHY8/T5RXQWJGoMbTVPGssHXiDA5hWIA8pQ8UVak06kgEEnKT/AG8/p7whgx0evxiV5MxJSFEggBncl/lsYS6bC1Kiro3CVkMMc/rPm/iVD23Ar5fp/wByhKN4PYZ8QitMwwpiWldMEsYOOJvRUPU3ejxhoBUgEsHDngR0HDkJJCkqCksB/wDnQ/aOY0S3AjovhzD/APZCszOHtZuh6xEKndgDMa14CoGJ9JfqJCcyWSxfazws+PsIcpnJF29TfQ94alyiFdiC3D7a3jTHZicmUhwdexgQY1726dP6iVFpV1K8znOEzpiS3xDg/Yw8+FpaWUwAKi5A0Hb5QteUJKin3B5B0gng1WfOQE7m/beN0agpeGA4Mc1yC+o4j6mQIyIkzi0ZH0faCfM7DOP4ng6pYUUHNldwbEAddDFDA8a9THX9oyMiDSotpYtPqSxLL6x8oarOm5vtG01DvGRkRLuGmOjHEE16SUqlv6VaiK2MYGJWU5gxBUGBswdtO3+IyMinpCShJ8MQruVZdvjnMJYDjqnC06jXqOsXqxppKk2LOobe0eRkK291ig6dZ21FVg69ekHrlx7LUGyqfL9QenSMjIGh5hjyIPqpIvChj2F5D5qCzFy1iC+oI3jIyKOjdlsGD1OIS1A9XejF4cmSKyXlmykLmpHqUpIcgaF+feK/i7w9KFN5slDIZ7MGsCHcu1xYf1dCTkZH0g5XM+RsULdtHSIs2tUtAQok5WCb6AOGi9giBmSC5Dh2sW3Y8xkZC93dXiU6CTk+kZcNqfJmImB7Kv2Gv0MO9dVJnSlrF7O+l079D1jIyEFPdYRx0A2t45gGsmTZlOEgJyBWXqSWYEna/wBISFYp5U1MsS0goUCbAnMlwCSdW4FjaMjILpFDLz5QHxDhCB/yMtIxhctCEzCkpCWSw9TBZAz2urq5s0bpr85DbxkZGnqUjfjkzvw/VWFlQnjBhBLaO9orYxOKEAJ+JVvYxkZCdQG8SpecrKtHhoUxNzBhFKAwaMjIHdYxPWcVRNKihBEC6imlJlLzAiYCMhGhv6kq9i4PSMjIJpnbOJ11G39JdwlWZEdJ8Oy88qXMJsHSUizlJTc3vZaflGRkeCg2EH1+0R+InFIPr/BhyqQEsBvod9N/pCzj89ZDEAG2mp99o9jIU1PFmB0ifw8ZcZgrEpGaTnGssP8A9f8AGsReEFKVNz7aCPYyN6YZCk+cdvJCOJ0dLxkZGRfnzmZ//9k=');
  background-size: cover;
`;

const Hr = styled.hr`
  width: 29rem;
  background-color: #f4f4f3;
  border: 0.1rem solid #f4f4f3;
  margin: 0;
`;
export default Post;
