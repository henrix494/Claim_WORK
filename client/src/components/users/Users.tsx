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
  }, []);

  const delUserHandler = async (id: number) => {
    setSelctedForDel(id);
    isModel(true);
    console.log(users);
  };
  const closeModel = (data: boolean) => {
    isModel(data);
    setSelctedForDel(0);
  };

  let usersToMap;

  if (filterUsers && filterUsers.length > 0) {
    usersToMap = sortBy.sortByLastName
      ? [...filterUsers].sort((a, b) => {
          const collator = new Intl.Collator("he");
          return collator.compare(a.firstName, b.firstName);
        })
      : filterUsers;
  } else if (sortBy.sortByName) {
    usersToMap = [...users].sort((a, b) => {
      const collator = new Intl.Collator("he");
      return collator.compare(a.firstName, b.firstName);
    });
  } else {
    usersToMap = users;
  }

  return (
    <div className="w-[85%] h-[80%] rounded-lg border-2 border-black overflow-x-auto text-right mr-5  ">
      <Search />
      <div className=" grid grid-cols-8 text-3xl pt-10  place-items-center ">
        <div>פעולה</div>
        <div>
          <p>ארץ</p>
        </div>
        <div>
          <p>עיר</p>
        </div>
        <div>
          <p>מיקוד</p>
        </div>{" "}
        <div>
          <p>מספר</p>
        </div>{" "}
        <div>
          <p>אמייל</p>
        </div>{" "}
        <div className=" relative">
          <button
            className=" absolute bottom-4 right-3"
            onClick={() => {
              setSortBy((prev) => ({
                ...prev,
                sortByName: !prev.sortByLastName,
              }));
            }}
          >
            ^
          </button>
          <p>שם משפחה</p>
        </div>
        <div className=" relative">
          <button
            className=" absolute bottom-4 right-3"
            onClick={() => {
              setSortBy((prev) => ({ ...prev, sortByName: !prev.sortByName }));
            }}
          >
            ^
          </button>
          <p>שם</p>
        </div>
      </div>{" "}
      <form className="  text-xl pt-10    " onSubmit={handleSubmit(onSubmit)}>
        {usersToMap.map((user) => (
          <div
            key={user.id}
            className={` grid grid-cols-8  place-items-center mb-5 ${
              selctedForDel === user.id
                ? "border-2  border-[red]"
                : " border-none"
            } `}
          >
            <div className="flex gap-8">
              <button
                onClick={() => {
                  delUserHandler(user.id);
                }}
                type="button"
                className=" bg-red-500 text-white rounded-lg p-2"
              >
                מחק
              </button>
              <button
                onClick={() => editBtn(user.id)}
                type="button"
                className="bg-blue-500 text-white rounded-lg p-2"
              >
                ערוך
              </button>{" "}
            </div>
            <div>
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
            <input type="hidden" {...register("id")} value={user.id} />

            <div>
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
            <div>
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
            <div>
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
            <div className="ml-10">
              {editStates[user.id] ? (
                <input
                  {...register(`email_${user.id}`, {
                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
            <div className="ml-8">
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
            className="   absolute top-10 left-72 bg-blue-500 text-white rounded-lg p-2 w-[20%]"
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
            className="   absolute top-10 left-[40%] bg-blue-500 text-white rounded-lg p-2 w-[20%]"
          >
            בטל
          </button>
        )}
      </form>
      {model && <Model id={selctedForDel} closeModel={closeModel} />}
    </div>
  );
}
