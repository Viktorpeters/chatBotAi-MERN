import React, { useEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Chatitem from "../components/chat/Chatitem";
import logo from "../../public/viktron.png";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const messageRef = useRef<HTMLDivElement | null>(null);
  const [chat, setCHat] = useState("");
  const [aiTyping, setAiIsTyping] = useState(false);
  const handleSubmit = async () => {
    console.log(chat);

    const newMessage: Message = { role: "user", content: chat };

    console.log(newMessage);

    setTimeout(() => {
      setAiIsTyping(true);
    }, 30);

    setChatMessages((prev) => [...prev, newMessage]);
    // messageRef.current?.scrollIntoView({ behavior: "smooth" });

    //

    setCHat("");
  };

  const handleDeleteChats = async () => {};

  const testData = [
    {
      role: "user",
      content: "Hey, how can I make my React code more readable?",
    },
    {
      role: "assistant",
      content:
        "Great question! Here are a few tips:\n\n1. Use consistent indentation (2 or 4 spaces).\n2. Break long JSX lines into multiple lines.\n3. Extract components if a block gets too large.\n4. Use descriptive variable and function names.\n\nWould you like a formatted example?",
    },
    {
      role: "user",
      content:
        "Yes, can you show an example with a component that renders a user profile?",
    },
    {
      role: "assistant",
      content: `Sure! Here's a simple and clean React component example:\n\n\`\`\`jsx\nfunction UserProfile({ name, avatarUrl, bio }) {\n  return (\n    <div className="user-profile">\n      <img src={avatarUrl} alt={name} className="avatar" />\n      <h2>{name}</h2>\n      <p>{bio}</p>\n    </div>\n  );\n}\n\`\`\`\n\nNotice how:\n- Props are destructured for clarity\n- Class names are descriptive\n- The layout is readable\n\nLet me know if you want to see styling tips too!`,
    },
    {
      role: "user",
      content: "How can I make the text responsive using Material UI?",
    },
    {
      role: "assistant",
      content: `You can use the \`sx\` prop with responsive font sizes like this:\n\n\`\`\`jsx\n<Typography\n  sx={{\n    fontSize: {\n      xs: '16px',\n      sm: '20px',\n      md: '24px',\n    },\n    textAlign: 'center'\n  }}\n>\n  Responsive Text\n</Typography>\n\`\`\`\n\nThis approach uses Material UI's breakpoint system to adapt font size across screen sizes.`,
    },
    {
      role: "user",
      content: "What’s the difference between useEffect and useLayoutEffect?",
    },
    {
      role: "assistant",
      content: `Both hooks run after render, but:\n\n- \`useEffect\` runs **after the browser paints** the screen\n- \`useLayoutEffect\` runs **before the paint**, blocking it until it finishes\n\nUse \`useLayoutEffect\` only when you need to measure the DOM or prevent visual flicker. Here’s a quick comparison:\n\n\`\`\`js\nuseEffect(() => {\n  console.log('Runs after paint');\n}, []);\n\nuseLayoutEffect(() => {\n  console.log('Runs before paint');\n}, []);\n\`\`\`\n\nLet me know if you want a deeper example!`,
    },
    {
      role: "user",
      content:
        "Yeah, can you give me a code sample where useLayoutEffect is needed?",
    },
    {
      role: "assistant",
      content: `Absolutely! Here's a case where you measure an element’s height after it's rendered:\n\n\`\`\`jsx\nimport { useLayoutEffect, useRef, useState } from 'react';\n\nfunction Box() {\n  const ref = useRef(null);\n  const [height, setHeight] = useState(0);\n\n  useLayoutEffect(() => {\n    if (ref.current) {\n      setHeight(ref.current.getBoundingClientRect().height);\n    }\n  }, []);\n\n  return (\n    <div>\n      <div ref={ref}>Measure me!</div>\n      <p>My height is: {height}px</p>\n    </div>\n  );\n}\n\`\`\`\n\nUsing \`useEffect\` here would cause a visual jump after paint. That’s why \`useLayoutEffect\` is preferred.`,
    },
    {
      role: "user",
      content:
        "Can you explain JavaScript loops to me? I get confused about when to use which one.",
    },
    {
      role: "assistant",
      content: `Sure! JavaScript has several types of loops. Here's a quick overview:\n\n- \`for\`: When you know how many times to loop\n- \`while\`: When you want to loop until a condition becomes false\n- \`do...while\`: Like \`while\`, but runs at least once\n- \`for...of\`: Loops over iterable values like arrays\n- \`for...in\`: Loops over object keys\n\nWould you like to see code examples of each?`,
    },
    {
      role: "user",
      content: "Yes, examples would help a lot!",
    },
    {
      role: "assistant",
      content: `Alright! Here's a breakdown with code:\n\n1. **\`for\` loop**:\n\`\`\`js\nfor (let i = 0; i < 5; i++) {\n  console.log(i);\n}\n// Logs: 0 1 2 3 4\n\`\`\`\n\n2. **\`while\` loop**:\n\`\`\`js\nlet i = 0;\nwhile (i < 5) {\n  console.log(i);\n  i++;\n}\n\`\`\`\n\n3. **\`do...while\` loop**:\n\`\`\`js\nlet i = 0;\ndo {\n  console.log(i);\n  i++;\n} while (i < 5);\n\`\`\`\n\n4. **\`for...of\` loop (arrays)**:\n\`\`\`js\nconst fruits = ['apple', 'banana', 'cherry'];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}\n\`\`\`\n\n5. **\`for...in\` loop (objects)**:\n\`\`\`js\nconst user = { name: 'Viktor', age: 28 };\nfor (const key in user) {\n  console.log(key + ': ' + user[key]);\n}\n\`\`\`\n\nLet me know if you want real-world examples of when to use each one!`,
    },
  ];

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    let messageScroll;

    messageScroll = setTimeout(() => {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    // remove the computer typing

    setAiIsTyping(false);

    return () => clearTimeout(messageScroll);
  }, [chatMessages]);

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
            height: "fit-content",
            bgcolor: "rgb(17,29,39)",
            padding: "15px 10px",
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
          >
            Vik
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to an AI - chat assistant
          </Typography>
          <Typography sx={{ fontFamily: "work sans", p: 3, fontSize: "13px" }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "400",
              borderRadius: 3,
              fontSize: "12px",
              mx: "auto",
              bgcolor: "#EE4B2B",
              ":hover": {
                bgcolor: "red",
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
            fontSize: { md: "30px", sm: "16px", xs: "14px" },
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
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
          {testData.map((chat, index) => (
            //@ts-ignore
            <Chatitem content={chat.content} role={chat.role} key={index} />
          ))}
          {aiTyping && (
            <Box
              sx={{
                display: "flex",
                p: 2,
                bgcolor: "#004d5612",
                gap: 2,
                borderRadius: 2,
                my: 1,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "white",
                  color: "black",
                  fontWeight: 700,
                  objectFit: "cover",
                }}
              >
                <img src={logo} style={{ width: "100%" }} />
              </Avatar>
              <Typography sx={{ fontSize: "20px" }}>Typing...</Typography>
            </Box>
          )}
          <div ref={messageRef}></div>
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
            onChange={(e) => setCHat(e.target.value)}
            value={chat}
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
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
