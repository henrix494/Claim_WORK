import { inputTypes } from "../../types/types";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { formFields } from "../../const/const";
import { getCookie } from "../../helper/fetchData";
import { useState } from "react";
import Load from "../Load/Load";
export default function AddUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const jwt = getCookie("jwt");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<inputTypes>();
  const onSubmit: SubmitHandler<inputTypes> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://workdbackend.azurewebsites.net/addNewUser",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, jwt }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to add new user. Status: ${response.status}`);
      } else {
        setMsg("המשתמש נוסף בהצלחה");
      }

      reset();
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error adding new user:", error.message);
    }
  };

  return (
    <div className="lg:w-[50%] lg:ml-[307px] h-[80%] rounded-lg border-2 border-black overflow-x-auto mr-40 w-screen max-lg:mt-10 max-lg:h-screen shadow-2xl">
      <div className="pt-10 px-4">
        <form
          className="flex flex-col gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-4">
            {formFields.map((field, index) => (
              <div key={index} className="flex text-right flex-col">
                <label className="text-2xl" htmlFor={field.id}>
                  {field.label}
                </label>
                <input
                  type="text"
                  id={field.id}
                  className={`rounded-lg text-right ${
                    field.name === field.name && errors[field.name]
                      ? "border-[red] border-2 "
                      : ""
                  }
                  `}
                  {...register(field.name, {
                    required: `${field.label} חובה להזין`,
                    ...(field.name !== "email" && {
                      maxLength: {
                        value: 10,
                        message: `${field.label} יכול לכלול מקסימום 10 תווים`,
                      },
                    }),

                    ...(field.name === "email" && {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "מייל לא חוקי",
                      },
                      maxLength: 50,
                    }),
                  })}
                />
                {errors[field.name] && (
                  <span>{errors[field.name]?.message}</span>
                )}
              </div>
            ))}
          </div>

          <button className="mt-4 bg-blue-500 text-white rounded-lg p-2 w-[40%] self-center">
            שלח
          </button>
          {isLoading && (
            <div className=" self-center ">
              <Load />
            </div>
          )}
          <div className="flex flex-col gap-3">
            {" "}
            <p className="text-2xl text-center text-green-400">{msg}</p>
            {msg && <button onClick={() => setMsg("")}>סגור </button>}
          </div>
        </form>
      </div>
    </div>
  );
}
