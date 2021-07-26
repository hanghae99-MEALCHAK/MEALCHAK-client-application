import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    _onClick,
    _onClose,
    children,
    margin,
    width,
    height,
    padding,
    bg,
    color,
    radius,
    shadow,
    size,
    cursor,
    border,
    ctg,
    bold,
    borderBottom
  } = props;

  const styles = {
    margin: margin,
    width: width,
    height: height,
    padding: padding,
    bg: bg,
    color: color,
    radius: radius,
    shadow: shadow,
    size: size,
    cursor: cursor,
    border: border,
    ctg: ctg,
    bold: bold,
    borderBottom: borderBottom,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick} onClose={_onClose}>
        {children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  _onClick: () => {},
  _onClose: () => {},
  margin: false,
  width: "100%",
  height: "100%",
  size: "",
  padding: false,
  bg: "",
  color: "",
  radius: "",
  shadow: false,
  cursor: "",
  border: "",
  ctg: "",
  bold: "",
  borderBottom: "",
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => (props.size ? `font-size: ${props.size};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.color ? `color: ${props.color};` : "")}
  box-sizing: border-box;
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) =>
    props.shadow ? `box-shadow: 0.5rem 0.5rem 0.5rem #dcdde1;` : ""}
  ${(props) => (props.cursor ? `cursor: pointer;` : "")};
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.bold ? `font-weight: ${props.bold};` : "")}
  ${(props) => (props.borderBottom ? `border-bottom: ${props.borderBottom};` : "")}
  ${(props) =>
    props.ctg
      ? `&:hover {
      background-color: white;
      border: 0.1rem solid #78e08f;
    }`
      : ""}
`;

export default Button;
