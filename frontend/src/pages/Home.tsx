import React from "react";
import Login from "./Login";
import { Box, Typography } from "@mui/material";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Box>
        <Typography
          variant="h4"
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 1, sm: 2 },
            display: "flex",
            alignItems: "center",
            gap: { xs: "6px", sm: "10px", md: "14px" },
            mt: { xs: 2, sm: 3 },
            fontSize: {
              xs: "16px", // extra small screens
              sm: "20px", // small
              md: "24px", // medium
              lg: "28px", // large
              xl: "32px", // extra-large
            },
            fontWeight: 600,
          }}
        >
          BORED?
          <span style={{ color: "grey", fontWeight: 400 }}>
            <Typewriter
              options={{
                strings: [
                  "Chat with me",
                  "Tell me anything!",
                  "I am fun to chat with",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </Typography>
      </Box>
      <Login />
      <footer>
        <div
          style={{
            width: "100%",
            minHeight: "20vh",
            maxHeight: "30vh",
            marginTop: 60,
          }}
        >
          <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
            Built With love by
            <span>
              <Link style={{ color: "white" }} className="nav-link" to={""}>
                Viktro Ajayi
              </Link>
            </span>
            💘
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
