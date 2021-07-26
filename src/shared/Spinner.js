import React from "react";
import styled, { keyframes } from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = (props) => {
  return (
    <Outter>
      <Box>
        <div>
          <CircularProgress />
        </div>
      </Box>
    </Outter>
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

const move = keyframes`
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Box = styled.div`
  animation: ${move} 1.5s 0s infinite;
`;

export default Spinner;
