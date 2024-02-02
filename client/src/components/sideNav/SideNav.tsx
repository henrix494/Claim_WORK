import { sideNavBtn } from "../../const/const";
import SideBtn from "../ui/SideBtn";
import { Link, useLocation } from "react-router-dom";

export default function SideNav() {
  let location = useLocation().pathname;
  console.log(location);
  return (
    <nav className="lg:h-screen lg:fixed lg:left-0 lg:w-[10%]   ">
      <div className="lg:justify-center  lg:gap-20 lg:h-full   lg:flex-col flex justify-center items-center">
        {sideNavBtn.map((item, index) => (
          <div className=" mr-4 mt-5" key={index}>
            {item.link !== undefined && (
              <Link to={item.link}>
                <SideBtn
                  className={`pb-2 ${
                    location === item.link && " border-b-2 border-black "
                  }`}
                >
                  {item.name}
                </SideBtn>
              </Link>
            )}
          </div>
        ))}

        <div></div>
      </div>
    </nav>
  );
}
