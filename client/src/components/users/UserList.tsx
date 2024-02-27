import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { EditLocalUser } from "../../features/allUsers/Alluseres";
import Model from "./Model";
import { useForm, SubmitHandler } from "react-hook-form";
import { inputTypes } from "../../types/types";
import MobileModel from "./MobileModel";

type SortByState = {
  sortByName: boolean;
  sortByLastName: boolean;
  sortByCity: boolean;
  sortByCounty: boolean;
};

// Define the props interface for the UserList component
interface UserListProps {
  sortBy: SortByState;
}
export default function UserList({ sortBy }: UserListProps) {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://server.kapit-coffee.com/editUser"
      : "http://localhost:3000/editUser";
  const dispatch = useDispatch();
  const userLogedIn = useSelector((state: RootState) => state.user.user);
  console.log(userLogedIn);
  const delUserHandler = async (id: number) => {
    setSelctedForDel(id);
    isModel(true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<inputTypes>();

  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});
  const [userChanges, setUserChanges] = useState<{ [key: string]: any }[]>([]);
  const [selctedForDel, setSelctedForDel] = useState<number | null>();
  const [userId, setUserID] = useState<number | null>();
  const [model, isModel] = useState(false);

  const users = useSelector((state: RootState) => state.pushUsers.value);
  const handleInputChange = (field: string, value: string, userId: Number) => {
    const updatedChanges = userChanges.map((change) =>
      change.id === userId ? { ...change, [field]: value } : change
    );
    setUserChanges(updatedChanges);

    setValue(field, value);
  };
  const filterUsers = useSelector(
    (state: RootState) => state.pushUsers.filteredValue
  );
  const onSubmit: SubmitHandler<inputTypes> = async () => {
    const nonEmptyChanges = userChanges.filter((change) =>
      Object.values(change).every((value) => value !== "")
    );
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ data: nonEmptyChanges }),
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
  const editBtn = (id: number) => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [id]: true,
    }));

    if (!userChanges.find((change) => change.id === id)) {
      setUserChanges((prev) => [...prev, { id }]);
    }
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
  const closeModelHandler = (data: boolean) => {
    isModel(data);
    setSelctedForDel(null);
  };
  const getidFromMobile = (Idnumber: number | null) => {
    setUserID(Idnumber);
  };
  return (
    <div className=" mt-10   ">
      <form onSubmit={handleSubmit(onSubmit)}>
        {usersToMap.map((user) => (
          <div
            key={user.id}
            className={` grid max-lg:grid-cols-3  place-items-center mb-5 ${
              userLogedIn?.role === "admin" ? "grid-cols-9" : "grid-cols-8"
            }   ${
              selctedForDel === user.id
                ? "border-2  border-[red]"
                : " border-b-2  border-[black] p-2"
            } `}
          >
            {userLogedIn?.role === "admin" ? (
              <div className="flex gap-8 max-lg:flex-col  max-lg:hidden  ">
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
                <div className=" lg:hidden bg-purple-500 text-white rounded-lg px-4 ">
                  {" "}
                </div>
              </div>
            ) : (
              <></>
            )}
            <button
              className=" lg:hidden"
              onClick={() => {
                setUserID(user.id);
              }}
            >
              הצג עוד פרטים
            </button>
            <div className=" max-lg:hidden">
              {editStates[user.id] ? (
                <input
                  {...register(`country_${user.id}`)}
                  type="text"
                  className="w-[80%] border-2"
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
                  className="w-[80%] border-2"
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
                  className=" w-[40%] border-2 "
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
                  className="w-[80%] border-2"
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
                  className="w-[80%] mr-5 border-2"
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
                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  })}
                  type="text"
                  className={`border-2 outline-none  ${
                    errors[`email_${user.id}`]?.type === "pattern"
                      ? "border-2 border-red-500"
                      : "border-2 border-black"
                  }`}
                  placeholder={user.email}
                  onChange={(e) =>
                    handleInputChange(`email`, e.target.value, user.id)
                  }
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>
            <div className="ml-8 text-xl ">
              {editStates[user.id] ? (
                <input
                  {...register(`lastName_${user.id}`)}
                  type="text"
                  className=" w-[60%] border-2 "
                  placeholder={user.lastName}
                  onChange={(e) =>
                    handleInputChange(`lastName`, e.target.value, user.id)
                  }
                />
              ) : (
                <p>{user.lastName}</p>
              )}
            </div>
            <div className="text-xl">
              {editStates[user.id] ? (
                <input
                  {...register(`firstName_${user.id}`)}
                  type="text"
                  className=" w-[60%]  border-2"
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
        ))}
        {Object.values(editStates).length > 0 && (
          <button
            type="submit"
            className="   absolute top-10 left-80 bg-blue-500 text-white rounded-lg p-2 w-[20%] max-lg:fixed max-lg:w-[30%] max-lg:left-0"
          >
            שמור שינויים
          </button>
        )}
        {Object.values(editStates).length > 0 && (
          <button
            onClick={() => {
              setEditStates({});
            }}
            type="button"
            className="absolute top-10 left-[40%] bg-blue-500 text-white rounded-lg p-2 w-[20%] max-lg:fixed"
          >
            בטל
          </button>
        )}
      </form>

      {Object.values(editStates).length > 0 && (
        <p className="   absolute top-10 left-[60%]   rounded-lg p-2 w-[20%] max-lg:fixed text-black animate-bounce">
          שדות ריקים לא יעודכנו*
        </p>
      )}

      {model && (
        <Model id={selctedForDel} closeModelHandler={closeModelHandler} />
      )}
      {userId && (
        <MobileModel getidFromMobile={getidFromMobile} userId={userId} />
      )}
    </div>
  );
}
