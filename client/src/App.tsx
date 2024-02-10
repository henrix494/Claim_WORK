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
import { login } from "./features/auth/auth";
import { useDispatch } from "react-redux";
import AddLogin from "./components/AddLogin/AddLogin";
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  console.log(setCookie, removeCookie);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (!cookies.jwt) {
          navigate("/login");
        } else {
          const response = await fetch(
            "https://claim-work.vercel.app/auth/profile",
            {
              credentials: "include", // Include cookies in the request
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
          if (response.ok) {
            console.log(response.ok);
            navigate("/Users");
            const data = await response;
            const json = await data.json();
            dispatch(login(json));
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
  console.log(cookies);
  return (
    <>
      <div className={` ${users && `lg:flex  lg:h-screen lg:items-center  `} `}>
        {users && <SideNav />}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Users" element={<Users />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AddUser" element={<AddUser />} />

          <Route path="/addLogin" element={<AddLogin />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
