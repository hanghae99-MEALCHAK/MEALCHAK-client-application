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
    window.scrollTo(0, 0);
    setIsActive(!isActive);
  };
  const { color, fontSize } = theme;

  const post_address = useSelector((state) => state.loc.post_address?.address);

  return (
    <React.Fragment>
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
        </div>
      </div>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
        style={{
          // minWidth: "36rem",
          width: "36rem",
          backgroundColor: "transparent",
          cursor: "pointer",
          zIndex: "1",
          top: 0,
          // margin: "0 35rem 0 auto",
          position: "absolute",
        }}
      >
        <PostAddress close={onClick} />
      </nav>
    </React.Fragment>
  );
};

DropDown.defaultProps = {};
export default DropDown;
