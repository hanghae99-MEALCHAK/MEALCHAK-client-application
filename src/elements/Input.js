import React from 'react';
import styled from 'styled-components';

import { Grid } from './index';

const Input = (props) => {
  const {
    placeholder,
    _onChange,
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
  } = props;

  if (multiLine) {
    return (
      <Grid>
        <ElTextarea
          rows={15}
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
      <Grid>
        {is_submit ? (
          <ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            bold={bold}
            border={border}
            size={size}
            padding={padding}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSubmit(e);
              }
            }}
          />
        ) : (
          <ElInput
            type={type}
            min={min}
            bold={bold}
            size={size}
            padding={padding}
            color={color}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            maxLength={length}
            border={border}
          />
        )}
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  size: '1.2rem',
  padding: '1.5rem 0',
  border: '0.1rem solid #718093',
  bold: '400',
  multiLine: false,
  placeholder: '텍스트를 입력해주세요.',
  type: 'text',
  value: '',
  length: 50,
  color: '#888E95',
  is_submit: false,
  onSubmit: () => {},
  _onChange: () => {},
};

const ElTextarea = styled.textarea`
  ${(props) => (props.border ? `border: ${props.border};` : '')};
  border-radius: 0.4rem;
  width: 100%;
  padding: 1.5rem 0;
  box-sizing: border-box;
  resize: none;
  ${(props) => (props.size ? `font-size: ${props.size};` : '1.4rem')};
  &::placeholder {
    ${(props) => (props.size ? `font-size: ${props.size};` : '1.2rem')};
    ${(props) => (props.color ? `color: ${props.color};` : '')};
    ${(props) => (props.bold ? `font-weight: ${props.bold};` : '')};
  }
  &:focus {
    outline: none;
  }
`;

const ElInput = styled.input`
  border-radius: 1.2rem;
  width: 100%;
  ${(props) => (props.size ? `font-size: ${props.size};` : '1.6rem')};
  ${(props) => (props.border ? `border: ${props.border};` : '')};
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')};
  box-sizing: border-box;
  &::placeholder {
    ${(props) => (props.size ? `font-size: ${props.size};` : '1.6rem')};
    ${(props) => (props.bold ? `font-weight: ${props.bold};` : '')};
    ${(props) => (props.color ? `color: ${props.color};` : '')};
  }
  &:focus {
    outline: none;
  }
`;

export default Input;
