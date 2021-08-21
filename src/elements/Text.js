import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  const {
    bold,
    bold2,
    color,
    size,
    children,
    margin,
    width,
    minWidth,
    height,
    padding,
    _onClick,
    _onChange,
    cursor,
    is_float,
    text_align,
    shadow,
    line_height,
    text_overflow,
    overflow,
    white_space,
    display,
    webkit_line,
    webkit_box_orient,
    border_bottom,
    bg,
    radius,
    word_break,
    text_decoration,
    letter_spacing,
  } = props;

  const styles = {
    bold: bold,
    bold2: bold2,
    color: color,
    size: size,
    margin,
    width,
    minWidth,
    height,
    padding: padding,
    _onClick: _onClick,
    _onChange: _onChange,
    cursor,
    is_float: is_float,
    text_align: text_align,
    shadow: shadow,
    line_height: line_height,
    text_overflow: text_overflow,
    overflow: overflow,
    white_space: white_space,
    display: display,
    webkit_line: webkit_line,
    webkit_box_orient: webkit_box_orient,
    border_bottom: border_bottom,
    bg: bg,
    radius: radius,
    word_break: word_break,
    text_decoration: text_decoration,
    letter_spacing: letter_spacing,
  };

  return (
    <P {...styles} onClick={_onClick} onChange={_onChange}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  text_decoration: "",
  word_break: '',
  children: null,
  bold: false,
  bold2: false,
  color: '#222831',
  size: '1.4rem',
  margin: false,
  width: '',
  minWidth: '',
  height: '',
  padding: false,
  _onClick: () => {},
  _onChange: () => {},
  cursor: '',
  is_float: '',
  text_align: '',
  text_overflow: '',
  overflow: '',
  white_space: '',
  display: '',
  webkit_line: '',
  webkit_box_orient: '',
  border_bottom: '',
  bg: false,
  radius: '',
  letter_spacing: '',
};

const P = styled.p`
  /* word-break: keep-all; */
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  ${(props) => (props.bold2 ? `font-weight: ${props.bold2};` : '')}
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
  ${(props) => (props.width ? `width: ${props.width};` : '')}
  ${(props) => (props.minWidth ? `min-width: ${props.minWidth};` : '')}
  ${(props) => (props.height ? `height: ${props.height};` : '')}
  ${(props) => (props.cursor ? `cursor: pointer;` : '')};
  ${(props) => (props.is_float ? `float: ${props.is_float};` : '')}
  ${(props) => (props.text_align ? `text-align: ${props.text_align};` : '')}
  ${(props) => (props.shadow ? `text-shadow: ${props.shadow};` : '')}
  ${(props) => (props.line_height ? `line-height: ${props.line_height};` : '')}
  ${(props) =>
    props.text_overflow ? `text-overflow: ${props.text_overflow};` : ''}
  ${(props) => (props.overflow ? `overflow: ${props.overflow};` : '')}
  ${(props) => (props.white_space ? `white-space: ${props.white_space};` : '')}
  ${(props) => (props.display ? `display: ${props.display};` : '')}
  ${(props) =>
    props.webkit_line ? `-webkit-line-clamp: ${props.webkit_line};` : ''}
  ${(props) =>
    props.webkit_box_orient
      ? `-webkit-box-orient: ${props.webkit_box_orient};`
      : ''}
  ${(props) =>
    props.border_bottom ? `border-bottom: ${props.border_bottom};` : ''}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : '')}
  ${(props) => (props.word_break ? `word-break: ${props.word_break};` : '')}
  ${(props) => (props.text_decoration ? `text-decoration: ${props.text_decoration};` : '')}
  ${(props) => (props.letter_spacing ? `letter-spacing: ${props.letter_spacing};` : '')}
  

`;

export default Text;
