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
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          ></Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
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
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "15px",
              sm: "17px",
              md: "27px",
              lg: "30px",
            },
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Gemini 2.5 - flash
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.length === 0 && (
            <Typography
              sx={{
                backgroundColor: "white",
                color: "black",
                textTransform: "uppercase",
                textAlign: "center",
                padding: "10px 0",
                cursor: "pointer",
                fontSize: {
                  xs: "15px",
                  sm: "17px",
                  md: "27px",
                  lg: "30px",
                },
              }}
              onClick={startCoonversation}
            >
              Start a conversation
            </Typography>
          )}
          {chatMessages.map((chat, index) => (
            <ChatItem
              content={chat.parts[0].text}
              role={chat.role}
              key={index}
            />
          ))}
          <div ref={lastMessageRef} />
        </Box>

        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          <input
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
            ref={inputRef}
          />
          <IconButton sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
