import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useRef } from "react";
import ChatItem from "../components/chared/ChatItem";

type chatType = {
  parts: [{ text: string }];
  role: "user" | "model";
};

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<chatType[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const chatHistory = [
    {
      role: "user",
      parts: [
        {
          text: "Hey, can you show me some JavaScript syntax examples?",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Sure! Here are a few common JavaScript syntax examples:\n\n1. **Variable Declaration**\n```js\nlet name = 'John';\nconst age = 25;\nvar isStudent = true;\n```\n\n2. **Function Declaration**\n```js\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```\n\n3. **Arrow Functions**\n```js\nconst add = (a, b) => a + b;\n```\n\n4. **Array and Object**\n```js\nconst fruits = ['apple', 'banana', 'orange'];\nconst user = { name: 'Alice', email: 'alice@example.com' };\n```\n\nLet me know if you'd like examples of loops, classes, or async/await too!",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Cool. Can you show me how a for loop works in JS?",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Absolutely! Here's a basic example of a `for` loop in JavaScript:\n\n```js\nfor (let i = 0; i < 5; i++) {\n  console.log('Iteration:', i);\n}\n```\n\nThis will print numbers 0 through 4. Let me know if you want other loop types like `while` or `forEach`!",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Yeah, how about forEach?",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Good choice! Here's how you can use `forEach` with an array:\n\n```js\nconst fruits = ['apple', 'banana', 'cherry'];\n\nfruits.forEach((fruit, index) => {\n  console.log(`${index}: ${fruit}`);\n});\n```\n\nThis iterates over each item in the array and logs its index and value.",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Thanks! How do I write an async function?",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Great question! Here’s how you write an `async` function in JavaScript:\n\n```js\nasync function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Error fetching data:', error);\n  }\n}\n\nfetchData();\n```\n\nThe `async` keyword allows you to use `await` inside the function, making asynchronous code easier to read and write.",
        },
      ],
    },
  ];

  const startCoonversation = () => {
    if (inputRef.current) {
      inputRef?.current.focus();
    }
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      console.log("here");
    }
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        height: "100%",
        mt: 3,
        gap: { xs: 2, md: 3 },
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: 0.3,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
              width: 60,
              height: 60,
            }}
          />
          <Typography
            variant="h6"
            sx={{ mx: "auto", fontFamily: "work sans", textAlign: "center" }}
          >
            You are talking to a ChatBOT
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              my: 3,
              p: 2,
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            You can ask questions related to Knowledge, Business, Advice,
            Education, etc. Avoid sharing personal info.
          </Typography>
          <Button
            fullWidth
            sx={{
              mt: "auto",
              color: "white",
              fontWeight: 700,
              borderRadius: 3,
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      {/* Chat Area */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          px: { xs: 1, md: 2 },
          maxWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "20px", sm: "24px", md: "28px", lg: "30px" },
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: 600,
            textAlign: "center",
            px: 1,
          }}
        >
          Gemini 2.5 - Flash
        </Typography>

        <Box
          sx={{
            width: "100%",
            flex: 1,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            scrollBehavior: "smooth",
            backgroundColor: "rgba(255,255,255,0.03)",
            p: { xs: 1, sm: 2 },
            mb: 2,
            boxSizing: "border-box",
          }}
        >
          {chatMessages.length === 0 && (
            <Typography
              sx={{
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                backgroundColor: "white",
                color: "black",
                textTransform: "uppercase",
                textAlign: "center",
                padding: "12px",
                borderRadius: 2,
                cursor: "pointer",
                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
              onClick={startCoonversation}
            >
              Start a conversation
            </Typography>
          )}
          {chatHistory.map((chat, index) => (
            <ChatItem
              content={chat.parts[0].text}
              role={chat.role}
              key={index}
            />
          ))}
          <div ref={lastMessageRef} />
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            width: "100%",
            borderRadius: 2,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1,
            boxSizing: "border-box",
          }}
        >
          <input
            type="text"
            placeholder="Type your message..."
            style={{
              flex: 1,
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "16px",
            }}
            ref={inputRef}
          />
          <IconButton sx={{ color: "white", ml: 1 }}>
            <IoMdSend />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
