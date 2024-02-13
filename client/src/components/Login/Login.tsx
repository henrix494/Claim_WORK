import { useState } from "react";
import { useCookies } from "react-cookie";
import Load from "../Load/Load";
export default function Login() {
  const [username, setUSerName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(
        "https://claim-work-lo46.vercel.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCookie("jwt", data.jwt, { path: "/" });
        setLoading(false);
      } else {
        // Login failed
        setError("שם משתמש או סיסמה לא נכונים");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className=" w-screen h-screen flex items-center max-lg:flex-col   ">
      <div className="w-[80%]  h-[60vh] flex flex-col max-lg:h-screen max-lg:justify-center">
        {" "}
        <div>
          <h3 className=" text-center font-bold">ברוכים הבאים</h3>
          <form
            onSubmit={(e) => handleLogin(e)}
            className="  flex items-center flex-col justify-center gap-10 relative  "
          >
            <div className=" flex-col flex  items-end justify-center mt-5">
              <label htmlFor="userName">שם משתמש</label>
              <input
                className="text-right p-2 rounded-lg w-[400px] mt-2 border-2 outline-none border-[#656ed367] max-lg:w-[80vw]"
                type="text"
                name="userName"
                id="userName"
                onChange={(e) => setUSerName(e.target.value)}
              />
            </div>
            <div className=" flex-col flex items-end">
              <label htmlFor="userName">סיסמה</label>
              <input
                className="text-right p-2 rounded-lg w-[400px] mt-2 border-2 outline-none border-[#656ed367] max-lg:w-[80vw]"
                type="password"
                name="passWord"
                id="passWord"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className=" bg-[#656ED3] w-[400px] text-white rounded-lg py-2 max-lg:w-[80vw]"
            >
              כניסה
            </button>

            {error && <p className="text-red-500 ">{error}</p>}
            {loading && (
              <div className="   ">
                {" "}
                <Load />
              </div>
            )}
          </form>
        </div>
      </div>{" "}
      <div className="w-1/2  h-[90vh] relative z-20 ">
        <img src="./logIN.png" alt="" />
      </div>{" "}
      <div className=" absolute w-[30%] h-screen right-0 z-10 bg-[#AFB3FF] max-lg:hidden"></div>
      <img
        className=" absolute left-0 bottom-0 max-lg:hidden"
        src="./Rectangle 6.png"
        alt=""
      />
    </div>
  );
}
