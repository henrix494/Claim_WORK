import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { useState } from "react";
import { EditLocalUser } from "../../features/allUsers/Alluseres";
import { inputTypes } from "../../types/types";
import { useForm, SubmitHandler } from "react-hook-form";

interface MobileModelProps {
  getidFromMobile: any;
  userId: number;
}

export default function MobileModel({
  getidFromMobile,
  userId,
}: MobileModelProps) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<inputTypes>();
  const [edit, setEdit] = useState(false);
  const resetId = () => {
    getidFromMobile(null);
  };
  const users = useSelector((state: RootState) => state.pushUsers.value);
  const idUser = users.filter((user) => user.id === userId);
  const usersLogedIn = useSelector((state: RootState) => state.user.user);

  const edithandler = () => {
    setEdit((prev) => !prev);
  };

  const handleInputChange = (field: string, value: string, userId: number) => {
    setValue(field, value);
    return userId;
  };

  const onSubmit: SubmitHandler<inputTypes> = async (data) => {
    const nonEmptyData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );
    try {
      // Include the user ID in the data
      const userChangesData = {
        id: userId,
        ...nonEmptyData,
      };

      // Update user on the server

      const response = await fetch(
        `https://workdbackend.azurewebsites.net/editUser`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify([userChangesData]), // Wrap the changes in an array as your backend expects an array of contacts
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user on the server");
      }

      // Dispatch the action to update the user in the local state
      dispatch(EditLocalUser({ id: userId, ...nonEmptyData }));
      setEdit(false);
      // Close the edit mode
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle the error as needed
    }
  };
  return (
    <div className="fixed top-10 bg-[white] w-screen h-screen flex flex-row-reverse lg:hidden">
      <div className="absolute left-5 top-3 text-2xl" onClick={resetId}>
        x
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1 mt-12 mr-5 text-right">
          <div className="">
            <p className="font-bold">שם</p>
            {edit ? (
              <input
                {...register(`firstName`)}
                className="border-2 h-[20px] w-[150px] text-right"
                onChange={(e) =>
                  handleInputChange(`firstName`, e.target.value, userId)
                }
                placeholder={idUser[0]?.firstName}
              />
            ) : (
              <p>{idUser[0]?.firstName}</p>
            )}
          </div>
          <div>
            <p className="font-bold">שם משפחה</p>
            {edit ? (
              <input
                {...register(`lastName`)}
                className="border-2 h-[20px] w-[150px] text-right"
                onChange={(e) =>
                  handleInputChange(`lastName`, e.target.value, userId)
                }
                placeholder={idUser[0]?.lastName}
              />
            ) : (
              <p>{idUser[0]?.lastName}</p>
            )}
          </div>{" "}
          <div>
            <p className="font-bold">ארץ</p>
            {edit ? (
              <input
                {...register(`country`)}
                className="border-2 h-[20px] w-[150px] text-right"
                placeholder={idUser[0]?.country}
                onChange={(e) =>
                  handleInputChange(`country`, e.target.value, userId)
                }
              />
            ) : (
              <p>{idUser[0]?.country}</p>
            )}
          </div>{" "}
          <div>
            <p className="font-bold">עיר</p>
            {edit ? (
              <input
                {...register(`city`)}
                className="border-2 h-[20px] w-[150px] text-right"
                placeholder={idUser[0].city}
                onChange={(e) =>
                  handleInputChange(`city`, e.target.value, userId)
                }
              />
            ) : (
              <p>{idUser[0]?.city}</p>
            )}
          </div>{" "}
          <div>
            <p className="font-bold">רחוב</p>
            {edit ? (
              <input
                {...register(`street`)}
                className="border-2 h-[20px] w-[150px] text-right"
                placeholder={idUser[0].street}
                onChange={(e) =>
                  handleInputChange(`street`, e.target.value, userId)
                }
              />
            ) : (
              <p>{idUser[0]?.street}</p>
            )}
          </div>{" "}
          <div>
            <p className="font-bold">מיקוד</p>
            {edit ? (
              <input
                {...register(`zipcode`)}
                className="border-2 h-[20px] w-[150px] text-right"
                placeholder={idUser[0].zipcode}
                onChange={(e) =>
                  handleInputChange(`zipcode`, e.target.value, userId)
                }
              />
            ) : (
              <p>{idUser[0]?.zipcode}</p>
            )}
          </div>{" "}
          <div>
            <p className="font-bold">מספר</p>
            {edit ? (
              <input
                {...register(`phone`)}
                className="border-2 h-[20px] w-[150px] text-right"
                onChange={(e) =>
                  handleInputChange(`phone`, e.target.value, userId)
                }
                placeholder={idUser[0].phone}
              />
            ) : (
              <p>{idUser[0]?.phone}</p>
            )}
          </div>{" "}
          <div>
            <p className="font-bold">מייל</p>
            {edit ? (
              <input
                {...register(`email`, {
                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                })}
                className="border-2 h-[20px] w-[150px] text-right"
                onChange={(e) =>
                  handleInputChange(`email`, e.target.value, userId)
                }
                placeholder={idUser[0].email}
              />
            ) : (
              <p>{idUser[0]?.email}</p>
            )}
          </div>
        </div>
        {usersLogedIn?.role === "admin" && (
          <div className="mb-5 text-white px-5 rounded-md flex mt-5">
            {edit ? (
              <button
                className="bg-blue-500 text-white px-5 rounded-md mr-5"
                onClick={edithandler}
                type="button"
              >
                סגור
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-5 rounded-md mr-5"
                onClick={edithandler}
                type="button"
              >
                ערוך
              </button>
            )}
            {edit && (
              <button
                className="bg-blue-500 text-white px-5 rounded-md"
                type="submit"
              >
                שמור
              </button>
            )}{" "}
            <p className="mr-10 mt-10 animate-bounce">שדות ריקים לא יעודכנו*</p>
          </div>
        )}

        {errors.email?.type === "pattern" && (
          <p className=" text-red-500 mr-10">מייל לא חוקי</p>
        )}
      </form>
    </div>
  );
}
