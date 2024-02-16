import { sideNavBtn } from "../../const/const";
import SideBtn from "../ui/SideBtn";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/auth";
import { useGetLoginInfo } from "../../helper/getLoginInfo";
export default function SideNav() {
  const [, , removeCookie] = useCookies();
  const dispatch = useDispatch();
  const users = useGetLoginInfo();
  let location = useLocation().pathname;

  let filteredSideNavBtn = sideNavBtn;
  if (users?.user?.role === "user") {
    filteredSideNavBtn = sideNavBtn.slice(0, -1); // remove the last element
  }

  return (
    <nav className="lg:h-screen lg:fixed lg:left-0 lg:w-[16%] bg-[#283342] text-white  ">
      <div className="lg:justify-center  lg:gap-14 lg:h-full   lg:flex-col flex justify-center items-center">
        {filteredSideNavBtn.map((item, index) => (
          <div
            className={` py-2  w-[100%]  text-center  ${
              location === item.link && " bg-[#009099] "
            }`}
            key={index}
          >
            {item.link !== undefined && (
              <Link to={item.link}>
                <SideBtn
                  className={`pb-2 max-lg:text-sm lg:text-xl  w-[100%] `}
                >
                  {item.name}
                </SideBtn>
              </Link>
            )}
          </div>
        ))}
        {users && (
          <button
            className=" lg:absolute lg:bottom-4 max-lg:text-xs  "
            onClick={() => {
              removeCookie("jwt");
              dispatch(login(false));
            }}
          >
            התנתק
          </button>
        )}
      </div>
    </nav>
  );
}
