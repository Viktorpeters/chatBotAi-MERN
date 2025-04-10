import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import useLogout from "../_hooks/useLogout";
import { useEffect } from "react";

const Header = () => {
  const { user } = useAuth()!;

  const { isLoading, logout } = useLogout();

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none",   }}
    >
      <Toolbar sx={{ display: "flex", width: '100%', bgcolor: 'red' }}>
        <Logo />
        <div className="nav_action">
          {user ? (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <button
                style={{
                  backgroundColor: "#51538f",
                  color: "white",
                  outline: "none",
                  padding: "12px 45px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={logout}
              >
                {isLoading ? "Loading..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;