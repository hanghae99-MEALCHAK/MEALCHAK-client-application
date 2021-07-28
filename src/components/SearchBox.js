import React from 'react';

import { useDispatch } from 'react-redux';

import { Grid, Input } from '../elements';

import { actionCreators as searchActions } from '../redux/modules/search';

const SearchBox = () => {
  const dispatch = useDispatch();
  const [food, setFood] = React.useState('');

  const onChange = (e) => {
    setFood(e.target.value);
  };

  const search = () => {
    dispatch(searchActions.getSearchListDB(food));
    setFood('');
  };

  return (
    <React.Fragment>
      <Input
        padding="1.4rem 1.6rem"
        border="0.1rem solid #EBE9E8"
        placeholder="어떤 음식을 배달시킬까?"
        size="1.6rem"
        value={food}
        _onChange={onChange}
        onSubmit={search}
        is_submit
      ></Input>
      <Grid
        top="4.2%"
        left="85%"
        position="fixed"
        _onClick={() => {
          search();
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="6" stroke="#36373C" strokeWidth="2" />
          <path
            d="M16 16C17.1716 17.1716 19 19 19 19"
            stroke="#36373C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Grid>
    </React.Fragment>
  );
};

SearchBox.defaultProps = {};

export default SearchBox;
