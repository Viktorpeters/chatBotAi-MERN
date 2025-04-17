import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import img from "../assets/signup.svg"; // Replace with your actual image path
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 3, md: 4 },
        p: { xs: 2, md: 4 },
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      {/* Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
        }}
      >
        <img
          src={img}
          alt="chatbot"
          style={{
            width: "100%",
            borderRadius: "10px",
            objectFit: "cover",
            maxHeight: "500px",
          }}
        />
      </Box>

      {/* Form */}
      <Box
        component="form"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
          maxWidth: "500px",
          width: "100%",
          mx: "auto",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            textAlign: "center",
            fontSize: { xs: "20px", sm: "26px", md: "30px" },
            color: "white",
          }}
        >
          Create your account
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          type="text"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ sx: { borderRadius: "8px", color: "white" } }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
        />

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ sx: { borderRadius: "8px", color: "white" } }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ sx: { borderRadius: "8px", color: "white" } }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
        />
      <Typography>
              Already have an account ? <Link style={{color: 'grey'}} to={"/login"}>Login</Link> to continue
      </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
