// 로딩 컴포넌트
import React from "react";
import styled from "styled-components";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// 커스텀 theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF9425",
    },
  },
});

const Spinner = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Outter>
        <CircularProgress />
      </Outter>
    </ThemeProvider>
  );
};

const Outter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fefefe;
`;

export default Spinner;
