import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const {
    shape,
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
    borderBottom,
    is_float,
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

  if (shape === 'large') {
    return (
      <React.Fragment>
        <LargeButton {...styles} onClick={_onClick} onClose={_onClose}>
          {children}
        </LargeButton>
      </React.Fragment>
    );
  }

  if (shape === 'smallLight') {
    return (
      <React.Fragment>
        <SmallLightButton {...styles} onClick={_onClick} onClose={_onClose}>
          {children}
        </SmallLightButton>
      </React.Fragment>
    );
  }

  if (shape === 'smallDark') {
    return (
      <React.Fragment>
        <SmallDarkButton {...styles} onClick={_onClick} onClose={_onClose}>
          {children}
        </SmallDarkButton>
      </React.Fragment>
    );
  }

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton {...styles} onClick={_onClick}>
          {children}
        </FloatButton>
      </React.Fragment>
    );
  }

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
  width: '100%',
  height: '100%',
  size: '',
  padding: false,
  bg: '',
  color: '',
  radius: '',
  shadow: false,
  cursor: '',
  border: '',
  ctg: '',
  bold: '',
  borderBottom: '',
  is_float: false,
};

const FloatButton = styled.button`
  width: 320px;
  height: 50px;
  ${(props) => (props.size ? `font-size: ${props.size};` : '')}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
  ${(props) => (props.color ? `color: ${props.color};` : '')}
  box-sizing: border-box;
  position: fixed;
  bottom: 0.8rem;
  right: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  border-radius: 12px;
`;

const ElButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => (props.size ? `font-size: ${props.size};` : '')}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
  ${(props) => (props.color ? `color: ${props.color};` : '')}
  box-sizing: border-box;
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : '')}
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) =>
    props.shadow ? `box-shadow: 0.5rem 0.5rem 0.5rem #dcdde1;` : ''}
  ${(props) => (props.cursor ? `cursor: pointer;` : '')};
  ${(props) => (props.border ? `border: ${props.border};` : '')}
  ${(props) => (props.bold ? `font-weight: ${props.bold};` : '')}
  ${(props) =>
    props.borderBottom ? `border-bottom: ${props.borderBottom};` : ''}
  ${(props) =>
    props.ctg
      ? `&:hover {
      background-color: white;
      border: 0.1rem solid #78e08f;
    }`
      : ''}
`;

const LargeButton = styled.button`
  width: 320px;
  height: 50px;
  background: ${(props) => props.theme.color.bg80};
  color: #ffffff;
  border: none;
  outline: none;
  border-radius: 12px;
`;

const SmallLightButton = styled.button`
  margin: 8px;
  width: 152px;
  height: 44px;
  background: ${(props) => props.theme.color.bg40};
  color: #ffffff;
  border: none;
  outline: none;
  border-radius: 12px;
`;

const SmallDarkButton = styled.button`
  margin: 8px;
  width: 152px;
  height: 44px;
  background: ${(props) => props.theme.color.bg80};
  color: #ffffff;
  border: none;
  outline: none;
  border-radius: 12px;
`;

export default Button;
