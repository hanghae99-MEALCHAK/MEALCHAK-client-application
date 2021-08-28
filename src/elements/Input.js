import React, { forwardRef } from "react";
import styled from "styled-components";

import { Grid } from "./index";

const Input = (props) => {
  const {
    placeholder,
    _onChange,
    _onClick,
    type,
    min,
    multiLine,
    value,
    is_submit,
    onSubmit,
    length,
    border,
    bold,
    size,
    padding,
    color,
    radius,
    width,
    flex,
    height,
    rows,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        <ElTextarea
          rows={rows? rows : 15}
          height={height}
          value={value}
          color={color}
          placeholder={placeholder}
          onChange={_onChange}
          border={border}
          bold={bold}
          maxLength={length}
          size={size}
          padding={padding}        
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid display={`${flex}`}>
        {is_submit ? (
          <ElInput
            // ref={ref}
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            onClick={_onClick}
            value={value}
            bold={bold}
            border={border}
            size={size}
            padding={padding}
            radius={radius}
            min={min}
            color={color}
            maxLength={length}
            width={width}
            height={height}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
          />
        ) : (
          <ElInput
            // ref={ref}
            type={type}
            min={min}
            bold={bold}
            size={size}
            padding={padding}
            color={color}
            placeholder={placeholder}
            onChange={_onChange}
            onClick={_onClick}
            value={value}
            maxLength={length}
            border={border}
            radius={radius}
            width={width}
            height={height}
          />
        )}
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  width: "100%",
  radius: "1.2rem",
  size: "1.2rem",
  padding: "1.5rem 0",
  border: "0.1rem solid #718093",
  bold: "400",
  multiLine: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  length: 50,
  color: "#888E95",
  is_submit: false,
  flex: false,
  onSubmit: () => {},
  _onChange: () => {},
  _onClick: () => {},
};

const ElTextarea = styled.textarea`
  ${(props) => (props.border ? `border: ${props.border};` : "")};
  border-radius: 0.4rem;
  width: 100%;
  padding: 1.5rem 0;
  box-sizing: border-box;
  resize: none;
  ${(props) => (props.size ? `font-size: ${props.size};` : "1.4rem")};
  ${(props) => (props.height ? `height: ${props.height};` : "")};
  &::placeholder {
    ${(props) => (props.size ? `font-size: ${props.size};` : "1.2rem")};
    ${(props) => (props.color ? `color: ${props.color};` : "")};
    ${(props) => (props.bold ? `font-weight: ${props.bold};` : "")};
  }
  &:focus {
    outline: none;
  }
`;

const ElInput = styled.input`
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : "1.2rem")};
  width: ${(props) => (props.width ? `${props.width};` : "100%")};
  ${(props) => (props.height ? `height: ${props.height};` : "")};
  ${(props) => (props.size ? `font-size: ${props.size};` : "1.6rem")};
  ${(props) => (props.border ? `border: ${props.border};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  box-sizing: border-box;
  &::placeholder {
    ${(props) => (props.size ? `font-size: ${props.size};` : "1.6rem")};
    ${(props) => (props.bold ? `font-weight: ${props.bold};` : "")};
    ${(props) => (props.color ? `color: ${props.color};` : "")};
  }
  &:focus {
    outline: none;
    /* border: 1px solid #ff9425; */
  }
`;

export default Input;
