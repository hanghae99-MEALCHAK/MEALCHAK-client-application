import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    bold,
    bold2,
    color,
    size,
    children,
    margin,
    width,
    padding,
    _onClick,
    cursor,
    is_float,
    text_align,
  } = props;

  const styles = {
    bold: bold,
    bold2: bold2,
    color: color,
    size: size,
    margin,
    width,
    padding: padding,
    _onClick: _onClick,
    cursor,
    is_float: is_float,
    text_align: text_align,
  };

  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  children: null,
  bold: false,
  bold2: false,
  color: "#222831",
  size: "1.4rem",
  margin: false,
  width: "",
  padding: false,
  _onClick: () => {},
  cursor: "",
  is_float: "",
  text_align: "",
};

const P = styled.p`
  word-break: keep-all;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.bold2 ? `font-weight: ${props.bold2};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.cursor ? `cursor: pointer;` : "")};
  ${(props) => (props.is_float ? `float: ${props.is_float}` : "")}
  ${(props) => (props.text_align ? `text-align: ${props.text_align}` : "")}
`;

export default Text;
