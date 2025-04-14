import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CHat from "./pages/CHat";
import NotFound from "./pages/NotFound";
import { useEffect, useLayoutEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";




function App() {
  const { setUser, setToken, token, user } = useAuth()!;
  const navigate = useNavigate();
  // attempt to get the token again on reload



  useLayoutEffect(() => {
    // fetch the local storage

    const revalidateUser = async () => {
      const user = localStorage.getItem("users");
      console.log(user)

      try {
        if (user) {
          // set the user state , so that components can access the stored user data

          setUser(JSON.parse(user));

          // attempt to get a new token for subsequent authorized based request

          const response = await fetch(
            "http://127.0.0.1:2500/api/v1/user/auth-status",
            { credentials: "include" }
          );

          // set the token
          if (!response.ok) {
            toast.error("pleae login again");
            localStorage.removeItem('users')
            navigate("/login");

            return;
          }

          const res = await response.json();

          setToken(res.token.accessToken);
          navigate('/')

          return;
        }
      } catch (error) {
       localStorage.removeItem('users')
        navigate("/login");
      }
    };

    revalidateUser();
  }, []);
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<CHat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;