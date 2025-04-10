import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import img from '../../../public/viktron.png'
const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src={img}
          alt="openai"
          width={"50px"}
          height={"50px"}
          className="image-inverted"
        />
      </Link>{" "}
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "20px" }}>viktron</span>-AI-Assistant
      </Typography>
    </div>
  );
};

export default Logo;
