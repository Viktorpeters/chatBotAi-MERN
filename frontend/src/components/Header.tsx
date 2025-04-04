import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";

const Header = () => {
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar>
        <Logo />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
