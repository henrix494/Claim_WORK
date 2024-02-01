// App.tsx
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import SideNav from "./components/sideNav/SideNav";
import Users from "./components/users/Users";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { pushAllUsers } from "./features/allUsers/Alluseres";
import AddUser from "./components/addUser/AddUser";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:3000/getAllusers");
        const json = await data.json();

        dispatch(pushAllUsers(json));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex  h-screen items-center justify-end ">
      <SideNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/AddUser" element={<AddUser />} />
      </Routes>
    </div>
  );
};

export default App;
