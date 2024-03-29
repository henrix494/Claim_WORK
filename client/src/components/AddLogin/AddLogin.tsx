import { useForm } from "react-hook-form";
import { useState } from "react";
import { getCookie } from "../../helper/fetchData";
export default function AddLogin() {
  const [responseMSG, setresponseMSG] = useState<string | null>();
  const [OkMSG, setOkMSG] = useState<string | null>();
  const { register, handleSubmit, reset } = useForm();
  const SubmitHandler = async (data: any) => {
    const url =
      process.env.NODE_ENV === "production"
        ? "https://server.kapit-coffee.com/createUser"
        : "http://localhost:3000/createUser";
    const jwt = getCookie("jwt");
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ ...data, jwt }), // Include the JWT token in the body
      });

      if (!response.ok) {
        const message = await response.json();
        setresponseMSG(message);
        throw new Error(`Failed to add new user. Status: ${response.status}`);
      } else {
        setresponseMSG(null);
        setOkMSG("משתמש נוצר בהצלחה");
      }

      reset();
    } catch (error: any) {
      console.error("Error adding new user:", error.message);
    }
  };
  return (
    <div className="  border-2 lg:w-[40vw] max-lg:mt-10 h-[80vh] lg:ml-[307px]   ">
      <form
        onSubmit={handleSubmit(SubmitHandler)}
        className="flex justify-center gap-10 flex-col items-center"
      >
        <div className="flex flex-col text-right">
          <label htmlFor="userName">שם משתמש</label>
          <input
            {...register("userName")}
            type="text"
            name="userName"
            id="UserName"
          />
        </div>
        <div className="flex flex-col items-end">
          <label htmlFor="passWord">סיסמה</label>
          <input
            {...register("passWord")}
            className=" text-right"
            type="passWord"
            name="passWord"
            id="password"
          />
          <label htmlFor="Repassword">חזור על הסיסמה</label>
          <input
            className=" text-right"
            type="password"
            name="Repassword"
            id="Repassword"
          />
        </div>
        <div>
          <select {...register("role")} name="role" id="role">
            <option value="" disabled selected hidden>
              הרשאה
            </option>
            <option value="admin">מנהל</option>
            <option value="user">משתמש</option>
          </select>
        </div>
        <button className=" bg-blue-600 text-white px-5 rounded-lg">שלח</button>
      </form>
      {<p className="text-[red] text-center">{responseMSG}</p>}
      {<p className="text-[green] text-center">{OkMSG}</p>}
    </div>
  );
}
