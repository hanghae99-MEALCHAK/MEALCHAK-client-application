import React from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { Post, Header } from '../components/';
import { Grid, Input, Text } from '../elements';

import { actionCreators as searchActions } from '../redux/modules/search';

import theme from '../styles/theme';

const Search = (props) => {
  const { border } = theme;

  const dispatch = useDispatch();
  const [food, setFood] = React.useState('');
  let search_list = useSelector((state) => state.search.list);
  const is_food = useSelector((state) => state.search.is_food);

  const onChange = (e) => {
    setFood(e.target.value);
  };

  const search = () => {
    dispatch(searchActions.getSearchListDB(food));
  };

  const foodReset = () => {
    setFood('');
    dispatch(searchActions.food_check(false));
  };

  React.useEffect(() => {
    dispatch(searchActions.food_check(false));
  }, []);
  return (
    <React.Fragment>
      <Grid
        width="36rem"
        minHeight="100vh"
        margin="0 auto"
        border={border.line1}
      >
        <Grid shape="container">
          <Header {...props} shape="검색">
            검색
          </Header>
        </Grid>
        <Grid
          is_flex4="t"
          height="4.4rem"
          margin="1.6rem auto 1.8rem auto"
          bg="#ffffff"
        >
          <Grid width="32rem" margin="auto">
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
          </Grid>

          {food ? (
            <svg
              style={{
                marginTop: '0.5rem',
                marginLeft: '28rem',
                fontSize: '1.9rem',
                position: 'absolute',
                cursor: 'pointer',
              }}
              width="2rem"
              height="2rem"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                foodReset();
              }}
            >
              <circle cx="10" cy="10" r="8" fill="#CECAC7" />
              <path
                d="M7.14307 7.14282L12.8574 12.8571"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M7.14307 12.8572L12.8574 7.14289"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <></>
          )}

          <svg
            style={{
              marginTop: '0.5rem',
              marginLeft: '30.5rem',
              fontSize: '1.9rem',
              position: 'absolute',
              cursor: 'pointer',
            }}
            width="2.4rem"
            height="2.4rem"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              search();
            }}
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
        <Grid is_flex2 width="32rem" margin="1.5rem auto">
          <Grid>
            <Text size="1.3rem" color="#9A9896" bold2="500">
              정렬 기준
            </Text>
          </Grid>
          <Grid flex justify_content="flex-end">
            <Text size="1.3rem" color="#ff9425" bold>
              마감임박순
            </Text>
            <Text size="1.3rem" color="#cecac7" bold margin="0 0 0 1rem">
              최신순
            </Text>
          </Grid>
        </Grid>
        {is_food ? (
          <Grid>
            {search_list.length === 0 ? (
              <Grid maxWidth="30rem" margin="5rem auto">
                <ZeroImg />
              </Grid>
            ) : (
              <Grid>
                {search_list.map((p, idx) => {
                  return <Post {...p} key={p.post_id} />;
                })}
              </Grid>
            )}
          </Grid>
        ) : (
          <Grid maxWidth="30rem" margin="5rem auto">
            <SearchLogoImg />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

Search.defaultProps = {};

const SearchLogoImg = styled.div`
  width: 28rem;
  height: 25.8rem;
  border-radius: 2rem;
  background-image: url('/illust/whatDoIeat_3x.png');
  background-size: 28rem 25.8rem;
  margin: 0 auto;
`;

const ZeroImg = styled.div`
  width: 14.3rem;
  height: 26.4rem;
  border-radius: 2rem;
  background-image: url('/illust/Group182_3x.png');
  background-size: 14.3rem 26.4rem;
  margin: 0 auto;
`;

export default Search;
