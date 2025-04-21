/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, TextField, Typography } from "@mui/material";
import img from "../assets/signin.svg";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/context";


const Login = () => {
  const navigate = useNavigate();
  const { setIsLogged, setToken } = useAuth()!;
  const { login, isLoading } = useLogin();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await login(userDetails.email, userDetails.password);

      if (!data) {
        setUserDetails({
          email: "",
          password: "",
        });

        return;
      }

      // update the local storage.
      localStorage.setItem(
        "state",
        JSON.stringify({
          state: true,
        })
      );

      // call the getAllMEssages Hook

     

      setIsLogged(true);
      setToken(data.token.accessToken);
      navigate("/chats");
      toast.success("user logged in succesfully");
      setUserDetails({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error("cant sign up, please try again");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setUserDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column", // Stack on small screens
          md: "row", // Side-by-side on medium and up
        },
        gap: { xs: "30px", md: "15px" },
        p: { xs: 2, md: 4 },
        alignItems: "center",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          flex: 1,
          display: {
            xs: "none",
            md: "block", // Show image on medium and up
          },
        }}
      >
        <img
          src={img}
          alt="chatbot"
          style={{
            width: "90%",
            borderRadius: "10px",
            objectFit: "cover",
            maxHeight: "500px",
          }}
        />
      </Box>

      {/* Form Section */}
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
          Sign in to chat with Viktron
        </Typography>

        <TextField
          fullWidth
          label="Enter Email"
          variant="outlined"
          type="email"
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            sx: {
              borderRadius: "8px",
              color: "white",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          name="email"
          value={userDetails.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Enter Password"
          variant="outlined"
          type="password"
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            sx: {
              borderRadius: "8px",
              color: "white",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          name="password"
          value={userDetails.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          {isLoading ? "Loading..." : "Sign in"}
        </Button>
        <Typography>
          Dont have an account ?{" "}
          <Link style={{ color: "gray" }} to={"/signup"}>
            Sign up
          </Link>{" "}
          to continue
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
