import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import type { RootState } from "../../app/store";

import { pushAllUsers } from "../../features/allUsers/Alluseres";
import fetchData from "../../helper/fetchData";
import Search from "./Search";

import UserList from "./UserList";
import Load from "../Load/Load";
export default function Users() {
  const userLogedIn = useSelector((state: RootState) => state.user.user);

  const [isLoading, setIsLoading] = useState<null | boolean>(null);
  const [sortBy, setSortBy] = useState({
    sortByName: false,
    sortByLastName: false,
    sortByCity: false,
    sortByCounty: false,
  });
  const dispatch = useDispatch();
  const fetchDataAndDispatch = async () => {
    setIsLoading(true);
    const json = await fetchData();
    dispatch(pushAllUsers(json));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataAndDispatch();
  }, []);

  const handleSortChange = (e: any) => {
    const selectedValue = e.target.value;

    if (selectedValue === "שם") {
      setSortBy((prev) => ({
        ...prev,
        sortByCity: false,
        sortByName: true,
        sortByCounty: false,
        sortByLastName: false,
      }));
    } else if (selectedValue === "שם משפחה") {
      setSortBy((prev) => ({
        ...prev,
        sortByCity: false,
        sortByName: false,
        sortByCounty: false,
        sortByLastName: true,
      }));
    } else if (selectedValue === "עיר") {
      setSortBy((prev) => ({
        ...prev,
        sortByCity: true,
        sortByName: false,
        sortByCounty: false,
        sortByLastName: false,
      }));
    } else if (selectedValue === "ארץ") {
      setSortBy((prev) => ({
        ...prev,
        sortByCity: false,
        sortByName: false,
        sortByCounty: true,
        sortByLastName: false,
      }));
    } else if (selectedValue === "רגיל") {
      setSortBy((prev) => ({
        ...prev,
        sortByCity: false,
        sortByName: false,
        sortByCounty: false,
        sortByLastName: false,
      }));
    }
  };

  return (
    <>
      <div className="lg:w-[80%] lg:ml-[307px] shadow-2xl lg:h-[80%] rounded-lg border-2  border-[#00000052] overflow-x-auto text-right lg:mr-5  max-lg:mt-10 max-lg:border-r-0 max-lg:border-l-0 max-lg:border-b-0 bg-[white] ">
        <div className="flex justify-end items-center mt-10 gap-10 max-lg:flex-col">
          {" "}
          <div>
            <select
              className="w-[120px]  text-right border-2 border-[#656ed367]"
              name="sortOptions"
              id="sortOptions"
              onChange={handleSortChange}
            >
              <option value="" disabled selected hidden>
                סדר לפי
              </option>
              <option value="שם">שם</option>
              <option value="שם משפחה">שם משפחה</option>
              <option className=" max-lg:hidden" value="עיר">
                עיר
              </option>
              <option className=" max-lg:hidden" value="ארץ">
                ארץ
              </option>
              <option value="רגיל">רגיל</option>
            </select>
          </div>
          <Search />
        </div>
        <div
          className={` grid  lg:text-3xl pt-10  place-items-center max-lg:grid-cols-3 border-b-2 border-[#00000044] pb-2 ${
            userLogedIn?.role === "admin" ? "grid grid-cols-9" : "grid-cols-8"
          } `}
        >
          {userLogedIn?.role === "admin" ? <div>פעולה</div> : ""}
          <div className=" max-lg:hidden">
            <p>ארץ</p>
          </div>
          <div className=" max-lg:hidden">
            <button className=" absolute bottom-5 left-4"></button>
            <p>עיר</p>
          </div>
          <div className=" max-lg:hidden">
            {" "}
            <p>רחוב</p>
          </div>
          <div className=" max-lg:hidden">
            <p>מיקוד</p>
          </div>{" "}
          <div className=" max-lg:hidden">
            <p>מספר</p>
          </div>{" "}
          <div className=" max-lg:hidden">
            <p>אמייל</p>
          </div>{" "}
          <div className=" relative">
            <button className=" absolute bottom-6 right-12"></button>
            <p>שם משפחה</p>
          </div>
          <div className=" relative">
            <button className=" absolute bottom-6 right-3"></button>
            <p>שם</p>
          </div>
        </div>{" "}
        {isLoading ? <Load /> : <UserList sortBy={sortBy} />}
      </div>
    </>
  );
}
