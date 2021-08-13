import React from "react";
import Select, { components } from "react-select";

import theme from "../styles/theme";
import { IoChevronDown } from "react-icons/io5";

import { useSelector } from "react-redux";
import logger from "../shared/Console";

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
  placeholder: (provided, state) => ({
    ...provided,
    color: color.bg80,
  }),
};

const customTheme2 = (theme) => {
  return {
    ...theme,
    borderRadius: radius.button,
    colors: {
      ...theme.colors,
      primary25: color.brand40,
      primary: color.brand100,
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
          placeholder={
            props.headCount
              ? `${props.headCount}명`
              : "모집할 인원 수를 선택해주세요."
          }
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
          placeholder={
            props.foodCategory
              ? `${props.foodCategory}`
              : "음식 카테고리를 선택해주세요."
          }
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

export const GenderSelect = (props) => {
  const user_info = useSelector((state) => state.user.user);
  const gender = user_info.user_gender === "female" ? "여성" : "남성";
  return (
    <React.Fragment>
      <div style={styles.app}>
        <Select
          isDisabled={user_info.user_gender ? true : false}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
          }}
          options={props.options}
          placeholder={
            user_info.user_gender ? `${gender}` : "성별을 선택해주세요"
          }
          onChange={(e) => {
            props.setProfile({
              ...props.editProfile,
              gender: e.value,
            });
          }}
          styles={customStyles2}
          theme={customTheme2}
        />
      </div>
    </React.Fragment>
  );
};

export const AgeSelect = (props) => {
  const user_info = useSelector((state) => state.user.user);
  const age = () => {
    if (user_info.user_age === "10~19") {
      return "10대";
    }
    if (user_info.user_age === "20~29") {
      return "20대";
    }
    if (user_info.user_age === "30~39") {
      return "30대";
    }
    if (user_info.user_age === "40~49") {
      return "40대";
    }
    if (user_info.user_age === "50~59") {
      return "50대";
    }
    return;
  };
  return (
    <React.Fragment>
      <div style={styles.app}>
        <Select
          isDisabled={user_info.user_age ? true : false}
          menuPlacement="top"
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
          }}
          options={props.options}
          placeholder={
            user_info.user_age ? `${age()}` : "연령대를 선택해주세요."
          }
          onChange={(e) => {
            logger("연령 이벤트", e.value);
            props.setProfile({
              ...props.editProfile,
              age: e.value,
            });
          }}
          styles={customStyles2}
          theme={customTheme2}
        />
      </div>
    </React.Fragment>
  );
};

export default ReactSelect;
