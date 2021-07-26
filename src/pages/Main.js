import React from "react";

import Post from "../components/Post";
import { Grid, Text } from "../elements";

import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../redux/configureStore";

const Main = (props) => {
  const dispatch = useDispatch();

  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);
  React.useEffect(() => {
    dispatch(postActions.getPostAX());
  }, []);

  return (
    <React.Fragment>
      <Grid width="50rem" minHeight="50rem" margin="0 auto">
        <Grid is_float="left">
          <Text>#오늘의 인기 메뉴</Text>
          <Grid bg="green" minHeight="15rem"></Grid>
        </Grid>
        <Grid is_flex2 text_align="center">
          <Grid
            bg="gray"
            width="7rem"
            height="4.5rem"
            radius="0.5rem"
            margin="0 2rem"
          >
            <Text>#전체</Text>
          </Grid>
          <Grid
            bg="gray"
            width="7rem"
            height="4.5rem"
            radius="0.5rem"
            margin="0 2rem"
          >
            <Text>#한식</Text>
          </Grid>
          <Grid
            bg="gray"
            width="7rem"
            height="4.5rem"
            radius="0.5rem"
            margin="0 2rem"
          >
            <Text>#중식</Text>
          </Grid>
          <Grid
            bg="gray"
            width="7rem"
            height="4.5rem"
            radius="0.5rem"
            margin="0 2rem"
          >
            <Text>#일식</Text>
          </Grid>
        </Grid>
        {post_list.map((p, idx) => {
          return <Post {...p} key={p.post_id} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

Main.defaultProps = {};

export default Main;
