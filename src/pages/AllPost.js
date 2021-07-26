import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import GwPost from '../components/GwPost';

import { actionCreators as postActions } from '../redux/modules/post';

const AllPost = () => {
  const dispatch = useDispatch();

  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  React.useEffect(() => {
    dispatch(postActions.getAllPostDB());
  }, []);

  return (
    <React.Fragment>
      <GridBox padding="50px">
        <GridWhite>
          {post_list.map((p, idx) => {
            return <GwPost key={p.id} {...p} />;
          })}
        </GridWhite>
      </GridBox>
    </React.Fragment>
  );
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding}` : '')};
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ''}
  ${(props) => (props.center ? `text-align: center;` : '')}
`;

const GridWhite = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding}` : '')};
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
  /* background-color: #ffffff; */
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ''}
  ${(props) => (props.center ? `text-align: center;` : '')}
`;

export default AllPost;
