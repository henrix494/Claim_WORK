import { sideNavBtn } from "../../const/const";
import SideBtn from "../ui/SideBtn";
import { Link, useLocation } from "react-router-dom";
import React from "react";

export default function SideNav() {
  let location = useLocation().pathname;
  console.log(location);
  return (
    <nav className="h-screen fixed left-0 w-[10%]">
      <div className="flex items-center justify-center flex-col gap-20 h-full">
        {sideNavBtn.map((item, index) => (
          <React.Fragment key={index}>
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
          </React.Fragment>
        ))}

        <div></div>
      </div>
    </nav>
  );
}
