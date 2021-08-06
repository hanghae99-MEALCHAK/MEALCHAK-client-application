import React from "react";
import Select from "react-select";

import theme from "../styles/theme";
const { color, fontSize } = theme;

const styles = {
  // select, option 전체
  app: {
    fontSize: fontSize.base,
    // fontSize: fontSize.small,
    fontWeight: "400",
  },
};

const customStyles = {
  // select 부분
  control: (provided, state) => ({
    ...provided,
    padding: "0.5rem",
  }),
  // options 부분
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? color.brand100 : color.bg100,
    backgroundColor: state.isFocused ? color.brand20 : color.bg0,
    borderRadius: "1rem",
    height: "100%",
    padding: "1rem",
  }),
};

const customTheme = (theme) => {
  return {
    ...theme,
    borderRadius: "1rem",
    colors: {
      ...theme.colors,
      primary25: color.brand20,
      primary: color.bg40,
    },
  };
};
const ReactSelect = (props) => {
  return (
    <React.Fragment>
      <div style={styles.app}>
        <Select
          //   value={props.value}
          options={props.options}
          placeholder="해당 사용자의 평가를 선택해주세요"
          onChange={(e) => {
            props.changeManner(e.label);
          }}
          styles={customStyles}
          theme={customTheme}
        />
      </div>
    </React.Fragment>
  );
};

export default ReactSelect;
