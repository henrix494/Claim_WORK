// App.tsx
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import SideNav from "./components/sideNav/SideNav";
import Users from "./components/users/Users";

import AddUser from "./components/addUser/AddUser";

const App = () => {
  return (
    <div className="lg:flex  lg:h-screen lg:items-center lg:justify-end  ">
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
