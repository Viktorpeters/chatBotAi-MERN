import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Chat from "./pages/Chats";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Home />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
