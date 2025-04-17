/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import img from "../assets/signup.svg"; // Replace with your actual image path
import { Link, useNavigate } from "react-router-dom";
import useSignUpHook from "../hooks/useSIgnUp";
import toast from "react-hot-toast";

const SignUp = () => {
  const { isLoading, signup } = useSignUpHook();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await signup(
        userDetails.email,
        userDetails.name,
        userDetails.password
      );
    } catch (error) {
      toast.error("cant sign up, please try again");
    }
  };
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
        onSubmit={handleSubmit}
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
          name="name"
          value={userDetails.name}
          onChange={handleInputChange}
        />

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={userDetails.email}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ sx: { borderRadius: "8px", color: "white" } }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          onChange={handleInputChange}
        />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ sx: { borderRadius: "8px", color: "white" } }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          name="password"
          value={userDetails.password}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained">
          {isLoading ? "Loading..." : "Signup"}
        </Button>
        <Typography>
          Already have an account ?{" "}
          <Link style={{ color: "grey" }} to={"/login"}>
            Login
          </Link>{" "}
          to continue
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
