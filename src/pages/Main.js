import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";

// style
import { Button, Grid, Text } from "../elements";

const Main = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);

  return (
    <React.Fragment>
      <div>시작...!</div>
      {user_info && (
        <Grid width="12rem">
          <Button
            _onClick={() => {
              dispatch(userAction.logOut());
            }}
          >
            <Text margin="0" size="1.6rem">
              로그아웃
            </Text>
          </Button>
        </Grid>
      )}
    </React.Fragment>
  );
};

Main.defaultProps = {};

export default Main;
