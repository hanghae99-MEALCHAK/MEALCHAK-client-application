import React from 'react';
import Select from 'react-select';

import theme from '../styles/theme';
const { color, fontSize } = theme;

// const options = [
//   { value: 'chocolate', label: '최고예요!' },
//   { value: 'strawberry', label: '좋아요~' },
//   { value: 'vanilla', label: '별로예요:(' },
// ];

const styles = {
  // select, option 전체
  app: {
    fontSize: fontSize.base,
    fontWeight: '400',
  },
};

const customStyles = {
  // select 부분
  control: (provided, state) => ({
    ...provided,
    padding: '0.5rem',
  }),
  // options 부분
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? color.brand100 : color.bg100,
    backgroundColor: state.isFocused ? color.brand20 : color.bg0,
    borderRadius: '1rem',
    height: '100%',
    padding: '1rem',
  }),
};

const customTheme = (theme) => {
  return {
    ...theme,
    borderRadius: '1rem',
    colors: {
      ...theme.colors,
      primary25: color.brand20,
      primary: color.bg40,
    },
  };
};
const ReactSelect = (props) => {
  console.log(props);

  return (
    <React.Fragment>
      <div style={styles.app}>
        <Select
          //   value={props.value}
          options={props.options}
          onChange={props.onChange}
          styles={customStyles}
          theme={customTheme}
        />
      </div>
    </React.Fragment>
  );
};

export default ReactSelect;
