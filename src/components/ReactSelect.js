import React from "react";
import Select, { components } from "react-select";

import theme from "../styles/theme";
import { IoChevronDown } from "react-icons/io5";
const { color, fontSize, radius } = theme;

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

const customStyles2 = {
  // select 부분
  control: (provided, state) => ({
    ...provided,
    border: "none",
    padding: "0 1rem",
    height: "5rem",
    color: color.bg40,
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

const customTheme2 = (theme) => {
  return {
    ...theme,
    borderRadius: radius.button,
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

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <IoChevronDown color={color.bg100} />
    </components.DropdownIndicator>
  );
};

export const HeadSelect = (props) => {
  return (
    <React.Fragment>
      <div style={styles.app}>
        <Select
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
          }}
          options={props.options}
          placeholder={props.headCount? `${props.headCount}명`: "모집할 인원 수를 선택해주세요."}
          onChange={(e) => {
            props.setPostInfo({
              ...props.post_info,
              headCount: e.value,
            });
            props.onChange({ headCount: e.value });
          }}
          styles={customStyles2}
          theme={customTheme2}
        />
      </div>
    </React.Fragment>
  );
};

export const CTGSelect = (props) => {
  return (
    <React.Fragment>
      <div style={styles.app}>
        <Select
        menuPlacement="top"
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
          }}
          options={props.options}
          placeholder={props.foodCategory? `${props.foodCategory}`: "음식 카테고리를 선택해주세요."}
          onChange={(e) => {
            props.setPostInfo({
              ...props.post_info,
              foodCategory: e.value,
            });
            props.onChange({ foodCategory: e.value });
          }}
          styles={customStyles2}
          theme={customTheme2}
        />
      </div>
    </React.Fragment>
  );
};

export default ReactSelect;
