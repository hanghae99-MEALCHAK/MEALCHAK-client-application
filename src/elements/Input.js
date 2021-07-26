import React from "react";
import styled from "styled-components";

import { Grid } from "./index";

const Input = (props) => {
  const {
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
    length,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        <ElTextarea
          rows={7}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
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
            onKeyPress={(e) => {
              if(e.key === "Enter"){
                onSubmit(e);
              }
            }}
          />
        ) : (
          <ElInput type={type} placeholder={placeholder} onChange={_onChange} value={value} maxLength={length}/>
        )}
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  length: 50,
  is_submit: false,
  onSubmit: () => {},
  _onChange: () => {},
};

const ElTextarea = styled.textarea`
  border: 0.1rem solid #718093;
  border-radius: 0.4rem;
  width: 100%;
  padding: 1.2rem 0.4rem;
  box-sizing: border-box;
  resize: none;
  font-size: 1.6rem;
  &::placeholder{
    font-size: 1.2rem;
  }
`;

const ElInput = styled.input`
  border: 0.1rem solid #718093;
  border-radius: 0.4rem;
  width: 100%;
  padding: 1.2rem 0.4rem;
  box-sizing: border-box;
  &::placeholder{
    font-size: 1.2rem;
  }
`;

export default Input;
