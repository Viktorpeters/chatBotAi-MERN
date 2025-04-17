import { Box, TextField, Typography } from "@mui/material";
import img from "../assets/signin.svg";
import { Link } from "react-router-dom";

const Login = () => {
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
        />
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
