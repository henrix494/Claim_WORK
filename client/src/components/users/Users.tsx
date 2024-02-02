import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { useState, useEffect } from "react";
import { pushAllUsers, EditLocalUser } from "../../features/allUsers/Alluseres";
import { useForm, SubmitHandler } from "react-hook-form";
import { inputTypes } from "../../types/types";
import fetchData from "../../helper/fetchData";
import Search from "./Search";
import Model from "./Model";
export default function Users() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<inputTypes>();
  const [userChanges, setUserChanges] = useState<{ [key: string]: any }[]>([]);
  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});
  const [model, isModel] = useState(false);
  const [selctedForDel, setSelctedForDel] = useState<number>();
  const [sortBy, setSortBy] = useState({
    sortByName: false,
    sortByLastName: false,
    sortByCity: false,
    sortByCounty: false,
  });

  const onSubmit: SubmitHandler<inputTypes> = async () => {
    const nonEmptyChanges = userChanges.filter((change) =>
      Object.values(change).every((value) => value !== "")
    );
    fetch("http://localhost:3000/editUser", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nonEmptyChanges),
    });
    userChanges.forEach((change) => {
      const { id, ...nonEmptyChanges } = change;
      dispatch(
        EditLocalUser({
          id,
          ...nonEmptyChanges,
        })
      );
    });

    setEditStates({});
  };

  const users = useSelector((state: RootState) => state.pushUsers.value);
  const filterUsers = useSelector(
    (state: RootState) => state.pushUsers.filteredValue
  );

  const dispatch = useDispatch();

  const editBtn = (id: number) => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [id]: true,
    }));

    if (!userChanges.find((change) => change.id === id)) {
      setUserChanges((prev) => [...prev, { id }]);
    }
  };

  const handleInputChange = (field: string, value: string, userId: Number) => {
    const updatedChanges = userChanges.map((change) =>
      change.id === userId ? { ...change, [field]: value } : change
    );

    setUserChanges(updatedChanges);

    setValue(field, value);
  };
  const fetchDataAndDispatch = async () => {
    const json = await fetchData();
    dispatch(pushAllUsers(json));
  };

  useEffect(() => {
    fetchDataAndDispatch();
    setEditStates({});
  }, []);

  const delUserHandler = async (id: number) => {
    setSelctedForDel(id);
    isModel(true);
  };
  const closeModel = (data: boolean) => {
    isModel(data);
    setSelctedForDel(0);
  };

  let usersToMap;

  const collator = new Intl.Collator("he");

  if (filterUsers && filterUsers.length > 0) {
    usersToMap = [...filterUsers];
  } else {
    usersToMap = [...users].sort((a, b) => {
      if (
        sortBy.sortByLastName &&
        a.lastName !== undefined &&
        b.lastName !== undefined
      ) {
        return collator.compare(a.lastName, b.lastName);
      } else if (
        sortBy.sortByName &&
        a.firstName !== undefined &&
        b.firstName !== undefined
      ) {
        return collator.compare(a.firstName, b.firstName);
      } else if (
        sortBy.sortByCounty &&
        a.country !== undefined &&
        b.country !== undefined
      ) {
        return collator.compare(a.country, b.country);
      } else if (
        sortBy.sortByCity &&
        a.city !== undefined &&
        b.city !== undefined
      ) {
        return collator.compare(a.city, b.city);
      }

      return 0;
    });
  }
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
      <div className="lg:w-[85%] lg:h-[80%] rounded-lg border-2 border-black overflow-x-auto text-right lg:mr-5  max-lg:mt-10 ">
        <div className="flex justify-end items-center mt-10 gap-10 max-lg:flex-col">
          {" "}
          <div>
            <select
              className="w-[120px]  text-right"
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
        <div className=" grid grid-cols-9 lg:text-3xl pt-10  place-items-center max-lg:grid-cols-3 ">
          <div>פעולה</div>
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
        <form
          className="  lg:text-xl pt-10    "
          onSubmit={handleSubmit(onSubmit)}
        >
          {usersToMap.map((user) => (
            <div
              key={user.id}
              className={` grid grid-cols-9 max-lg:grid-cols-3  place-items-center mb-5 ${
                selctedForDel === user.id
                  ? "border-2  border-[red]"
                  : " border-b-2  border-[black] p-2"
              } `}
            >
              <div className="flex gap-8 max-lg:flex-col  ">
                <button
                  onClick={() => {
                    delUserHandler(user.id);
                  }}
                  type="button"
                  className=" bg-red-500 text-white rounded-lg p-2 max-lg:p-0"
                >
                  מחק
                </button>
                <button
                  onClick={() => editBtn(user.id)}
                  type="button"
                  className="bg-blue-500 text-white rounded-lg p-2 max-lg:p-0"
                >
                  ערוך
                </button>{" "}
                <div className=" lg:hidden ">
                  {" "}
                  <button>הצג עוד פרטים</button>
                </div>
              </div>
              <div className=" max-lg:hidden">
                {editStates[user.id] ? (
                  <input
                    {...register(`country_${user.id}`)}
                    type="text"
                    className="w-[80%] "
                    placeholder={user.country}
                    onChange={(e) =>
                      handleInputChange(`country`, e.target.value, user.id)
                    }
                  />
                ) : (
                  <p>{user.country}</p>
                )}
              </div>

              <div className=" max-lg:hidden">
                {editStates[user.id] ? (
                  <input
                    {...register(`city_${user.id}`)}
                    type="text"
                    className="w-[80%] "
                    placeholder={user.city}
                    onChange={(e) =>
                      handleInputChange(`city`, e.target.value, user.id)
                    }
                  />
                ) : (
                  <p>{user.city}</p>
                )}
              </div>
              <div className=" max-lg:hidden">
                {editStates[user.id] ? (
                  <input
                    {...register(`street_${user.id}`)}
                    type="text"
                    className=" w-[40%]  "
                    placeholder={user.firstName}
                    onChange={(e) =>
                      handleInputChange(`street`, e.target.value, user.id)
                    }
                  />
                ) : (
                  <p>{user.street}</p>
                )}
              </div>
              <div className=" max-lg:hidden">
                {editStates[user.id] ? (
                  <input
                    {...register(`zipcode_${user.id}`)}
                    type="text"
                    className="w-[80%] "
                    placeholder={user.zipcode}
                    onChange={(e) =>
                      handleInputChange(`zipcode`, e.target.value, user.id)
                    }
                  />
                ) : (
                  <p>{user.zipcode}</p>
                )}
              </div>
              <div className=" max-lg:hidden">
                {editStates[user.id] ? (
                  <input
                    {...register(`phone${user.id}`)}
                    type="text"
                    className="w-[80%] mr-5 "
                    placeholder={user.phone}
                    onChange={(e) =>
                      handleInputChange(`phone`, e.target.value, user.id)
                    }
                  />
                ) : (
                  <p>{user.phone}</p>
                )}
              </div>
              <div className="ml-10 max-lg:hidden">
                {editStates[user.id] ? (
                  <input
                    {...register(`email_${user.id}`, {
                      pattern:
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    })}
                    type="text"
                    className=" "
                    placeholder={user.email}
                    onChange={(e) =>
                      handleInputChange(`email`, e.target.value, user.id)
                    }
                  />
                ) : (
                  <p>{user.email}</p>
                )}
              </div>
              <div className="ml-8 ">
                {editStates[user.id] ? (
                  <input
                    {...register(`lastName_${user.id}`)}
                    type="text"
                    className=" w-[30%] "
                    placeholder={user.lastName}
                    onChange={(e) =>
                      handleInputChange(`lastName`, e.target.value, user.id)
                    }
                  />
                ) : (
                  <p>{user.lastName}</p>
                )}
              </div>
              <div className="">
                {editStates[user.id] ? (
                  <input
                    {...register(`firstName_${user.id}`)}
                    type="text"
                    className=" w-[40%]  "
                    placeholder={user.firstName}
                    onChange={(e) =>
                      handleInputChange(`firstName`, e.target.value, user.id)
                    }
                  />
                ) : (
                  <p>{user.firstName}</p>
                )}
              </div>
            </div>
          ))}{" "}
          {Object.values(editStates).length > 0 && (
            <button
              type="submit"
              className="   absolute top-10 left-72 bg-blue-500 text-white rounded-lg p-2 w-[20%] max-lg:fixed max-lg:w-[30%] max-lg:left-0"
            >
              שמור שינויים
            </button>
          )}
          {Object.values(editStates).length > 0 && (
            <button
              onClick={() => {
                setEditStates({});
              }}
              type="submit"
              className="   absolute top-10 left-[40%] bg-blue-500 text-white rounded-lg p-2 w-[20%] max-lg:fixed"
            >
              בטל
            </button>
          )}
        </form>
        {model && <Model id={selctedForDel} closeModel={closeModel} />}
        <span className=" absolute top-0 right-1/2  ">{errors.city?.type}</span>
      </div>
    </>
  );
}
