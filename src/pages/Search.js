import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Post from '../components/Post';

import { Grid, Input } from '../elements';

import { actionCreators as searchActions } from '../redux/modules/search';

const Search = () => {
  const dispatch = useDispatch();
  const [food, setFood] = React.useState('');

  const search_list = useSelector((state) => state.search.search_list);

  const onChange = (e) => {
    setFood(e.target.value);
  };

  const search = () => {
    dispatch(searchActions.getSearchListDB(food));
    setFood('');
  };

  return (
    <React.Fragment>
      <div>검색창</div>
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

      <div>포스트 리스트s</div>
      {search_list.map((p, idx) => {
        return <Post {...p} key={p.id} />;
      })}
    </React.Fragment>
  );
};

export default Search;
