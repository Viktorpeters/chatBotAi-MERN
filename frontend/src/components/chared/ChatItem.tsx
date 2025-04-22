import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import img from "../../assets/aipics.avif";
import { useAuth } from "../../context/context";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  return (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//") ||
    str.includes("*") ||
    str.includes("**")
  );
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "model";
}) => {
  const { nameInitials } = useAuth()!;
  const messageBlocks = extractCodeFromString(content);

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: role === "model" ? "#004d5612" : "#004d56",
        gap: 2,
        borderRadius: 2,
        my: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      <Avatar
        sx={{ ml: 0, bgcolor: role === "user" ? "black" : "transparent" }}
      >
        {role === "model" ? (
          <img src={img} alt="openai" width={"30px"} />
        ) : (
          nameInitials
        )}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "18px" }}>{content}</Typography>
        )}

        {messageBlocks?.map((block, index) =>
          isCodeBlock(block) ? (
            <Box
              key={index}
              sx={{
                width: "100%",
                overflowX: "auto",
                borderRadius: 2,
                backgroundColor: "#282c34",
                mt: 2,
              }}
            >
              <SyntaxHighlighter
                language="javascript"
                style={oneDark}
                customStyle={{
                  fontSize: "14px",
                  margin: 0,
                  padding: "16px",
                  minWidth: "fit-content",
                }}
                wrapLines={true}
                wrapLongLines={true}
              >
                {block}
              </SyntaxHighlighter>
            </Box>
          ) : (
            <Typography key={index} sx={{ fontSize: "18px", my: 1 }}>
              {block}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};

export default ChatItem;
