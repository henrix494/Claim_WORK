// App.tsx
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import SideNav from "./components/sideNav/SideNav";
import Users from "./components/users/Users";
import { useGetLoginInfo } from "./helper/getLoginInfo";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AddUser from "./components/addUser/AddUser";
import Login from "./components/Login/Login";
import { useEffect } from "react";
import { login, userData } from "./features/auth/auth";
import { useDispatch } from "react-redux";
import AddLogin from "./components/AddLogin/AddLogin";
import MSG from "./components/MSG/MSG";
const url =
  process.env.NODE_ENV === "production"
    ? "https://workdbackend.azurewebsites.net/auth/profile"
    : "http://localhost:3000/auth/profile";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies();
  console.log(cookies);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (!cookies.jwt) {
          navigate("/login");
        } else {
          const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const data = response;
            const json = await data.json();

            dispatch(login(true));
            navigate("/Users");
            console.log(json);
            dispatch(userData(json));
          } else if (response.status === 401) {
            // Token verification failed (unauthorized)
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        // Handle error appropriately (e.g., show error message)
      }
    };

    verifyUser();
  }, [cookies.jwt]);
  const users = useGetLoginInfo();
  return (
    <>
      <div
        className={` ${
          users.loggedIn && `lg:flex  lg:h-screen lg:items-center  `
        } `}
      >
        {users.loggedIn && <SideNav />}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Users" element={<Users />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/MSG" element={<MSG />} />
          <Route path="/addLogin" element={<AddLogin />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
