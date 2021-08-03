import styled from 'styled-components';
import React from 'react';

const Image = (props) => {
  const {
    shape,
    src,
    size,
    children,
    radius,
    _onClick,
    _onMouseEnter,
    _onMouseLeave,
    cursor,
    margin,
  } = props;
  const styles = {
    src: src,
    size: size,
    radius: radius,
    cursor: cursor,
    margin: margin,
  };

  if (shape === 'circle') {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === 'circleBtn') {
    return <ButtonCircle {...styles}></ButtonCircle>;
  }

  if (shape === 'rectangle') {
    return (
      <AspectOutter>
        <AspectInner
          {...styles}
          onMouseEnter={_onMouseEnter}
          onMouseLeave={_onMouseLeave}
          onClick={_onClick}
        ></AspectInner>
      </AspectOutter>
    );
  }

  if (shape === 'main') {
    return <MainInner {...styles}>{children}</MainInner>;
  }
  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: 'circle',
  src: 'https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg',
  size: 3.6,
  radius: '',
  _onClick: () => {},
  _onMouseEnter: () => {},
  _onMouseLeave: () => {},
  cursor: '',
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}rem;
  width: var(--size);
  height: var(--size);
  background-image: url('${(props) => props.src}');
  background-position: center;
  background-size: cover;
`;

const AspectOutter = styled.div`
  width: 100%;
  min-width: 25rem;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url('${(props) => props.src}');
  background-position: center;
  background-size: cover;
  ${(props) => (props.radius ? `border-radius: 0.5rem;` : '')}
  ${(props) => (props.cursor ? `cursor: pointer;` : '')}
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')}
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}rem;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-position: center;
  /* margin: 0.4rem; */
  ${(props) => (props.margin ? `margin: ${props.margin}; ` : 'margin: 0.4rem')}
`;

const MainInner = styled.div`
  width: 100%;
  min-width: 25rem;
  position: relative;
  padding-top: 45%;
  /* overflow: hidden; */
  background-image: url('${(props) => props.src}');
  /* background-position: center; */
  background-size: cover;
`;

const ButtonCircle = styled.div`
  --size: ${(props) => props.size}rem;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: ${(props) => props.theme.color.bg40};
  ${(props) => (props.cursor ? `cursor: pointer;` : '')}

  &:hover {
    background-color: #888e95;
    transition: all 0.5s ease-in-out;
  }
`;
export default Image;
