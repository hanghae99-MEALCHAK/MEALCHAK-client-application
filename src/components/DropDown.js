import React from "react";
import "./style.css";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { Button, Text, Grid, Input } from "../elements";
import PostAddress from "./PostAddress";
import theme from "../styles/theme";
import { useSelector } from "react-redux";

const DropDown = (props) => {
  const dropdownRef = React.useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => {
    setIsActive(!isActive);
  };
  console.log(props);
  const { color, fontSize } = theme;

  const post_address = useSelector((state) => state.loc.post_address?.address);

  return (
    <div className="container">
      <div className="menu-container">
        <Grid>
          <Button
            width="7rem"
            border="1px solid #C7C8CE"
            padding="0.3rem 0 0.3rem 0"
            margin="1.5rem 0 0 1rem"
            radius="1.2rem"
            color="white"
            size="1.3rem"
            bg="gray"
            _onClick={onClick}
            className="menu-trigger"
            cursor="t"
          >
            주소 찾기
          </Button>
        </Grid>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
          style={{
            width: "100%",
            backgroundColor: "transparent",
            cursor: "pointer",
            zIndex: "1",
            top: 57,
          }}
        >
          <PostAddress
            close={onClick}
          />
        </nav>
      </div>
    </div>
  );
};

DropDown.defaultProps = {};
export default DropDown;
