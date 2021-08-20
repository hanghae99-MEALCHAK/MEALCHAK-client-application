import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'Spoqa Han Sans Neo';

  }

  body {
    font-family: 'Spoqa Han Sans Neo';
    line-height: 1.5;
  }

  h2, p {
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }

  input, textarea, button { 
    appearance: none; 
    -moz-appearance: none; 
    -webkit-appearance: none; 
    border-radius: 0; 
    -webkit-border-radius: 0; 
    -moz-border-radius: 0; 
  }

  select {
    appearance: none; 
    -moz-appearance: none; 
    -webkit-appearance: none; 
    background: url("https://image.flaticon.com/icons/png/512/32/32195.png") no-repeat 98% 50% #fff;
    background-size: 1rem;
  }

  select::-ms-expand{
    display: none;
  }
`;

export default GlobalStyle;
