import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    is_flex2,
    is_flex3,
    flex,
    is_float,
    position,
    padding,
    margin,
    bg,
    children,
    center,
    _onClick,
    maxWidth,
    radius,
    border,
    borderBottom,
    borderTop,
    minWidth,
    shadow,
    minHeight,
    top,
    left,
    right,
    width,
    height,
    maxHeight,
    wrap,
    review_flex,
    post_flex,
    card_flex,
    is_header,
    is_border,
    text_align,
    updownborder,
  } = props;

  const styles = {
    is_flex: is_flex,
    is_flex2: is_flex2,
    is_flex3: is_flex3,
    flex: flex,
    is_float: is_float,
    review_flex: review_flex,
    post_flex: post_flex,
    position: position,
    padding: padding,
    margin: margin,
    bg: bg,
    center: center,
    maxWidth: maxWidth,
    radius: radius,
    borderBottom: borderBottom,
    borderTop: borderTop,
    minWidth: minWidth,
    shadow: shadow,
    minHeight: minHeight,
    top: top,
    left: left,
    right: right,
    width: width,
    height: height,
    maxHeight: maxHeight,
    wrap: wrap,
    border: border,
    card_flex: card_flex,
    is_header: is_header,
    is_border: is_border,
    text_align: text_align,
    updownborder: updownborder,
  };

  return (
    <React.Fragment>
      {/* styles를 GridBox의 props로 넘겨주고 있는것 */}
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  is_flex2: false,
  is_flex3: false,
  is_float: false,
  review_flex: false,
  post_flex: false,
  card_flex: false,
  flex: false,
  position: false,
  width: "100%",
  height: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  maxWidth: false,
  radius: "",
  borderBottom: false,
  borderTop: false,
  minWidth: false,
  minHeight: false,
  shadow: false,
  _onClick: () => {},
  top: false,
  left: false,
  right: false,
  maxHeight: false,
  wrap: "",
  border: "",
  is_header: "",
  is_border: "",
  text_align: "",
  updownborder: "",
};

const GridBox = styled.div`
  ${(props) => (props.width ? `width: ${props.width};` : "")};
  ${(props) => (props.height ? `height: ${props.height};` : "")};
  box-sizing: border-box;
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth};` : "")}
  ${(props) => (props.minWidth ? `min-width: ${props.minWidth};` : "")}
  ${(props) => (props.minHeight ? `min-height: ${props.minHeight};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.center ? `text-align: ${props.center};` : "")}

  ${(props) =>
    props.borderBottom ? `border-bottom: ${props.borderBottom};` : ""}
  ${(props) => (props.borderTop ? `border-top: ${props.borderTop};` : "")}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
  ${(props) =>
    props.shadow ? `box-shadow: 0.3rem 0.3rem 0.3rem #dcdde1;` : ""}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between;`
      : ""}
  ${(props) =>
    props.is_flex2
      ? `display: flex; align-items: center; justify-content: center;`
      : ""}
  ${(props) =>
    props.is_flex3
      ? `display: flex; justify-content: center;`
      : ""}
  ${(props) => (props.position ? `position: ${props.position};` : "")}
  ${(props) => (props.top ? `top: ${props.top};` : "")}
  ${(props) => (props.left ? `left: ${props.left};` : "")}
  ${(props) => (props.right ? `right: ${props.right};` : "")}
  ${(props) => (props.maxHeight ? `max-height: ${props.maxHeight};` : "")}
  ${(props) => (props.flex ? `display: flex; ` : "")}
  ${(props) =>
    props.card_flex ? `display: flex; justify-content: center;` : ""}
  ${(props) => (props.wrap ? `flex-wrap: wrap;` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.is_border ? `border: ${props.is_border};` : "")}
  ${(props) =>
    props.updownborder
      ? `border-top: ${props.updownborder}; border-bottom: ${props.updownborder}`
      : ""}

  ${(props) =>
    props.is_header ? `position: sticky; top: 0; z-index: 10;` : ""};
  ${(props) => (props.is_float ? `float: ${props.is_float}; ` : "")}
  ${(props) => (props.text_align ? `text-align: ${props.text_align}; ` : "")}
  @media (min-width: 501px) {
    ${(props) =>
      props.review_flex
        ? `display: flex; align-items: center; justify-content: space-between;`
        : ""}
  }

  @media (min-width: 510px) {
    ${(props) =>
      props.post_flex
        ? `display: flex; align-items: center; justify-content: center;`
        : ""}
  }
`;

export default Grid;
