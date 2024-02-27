import { useForm } from "react-hook-form";
import { useGetLoginInfo } from "../../helper/getLoginInfo";
import { getCookie } from "../../helper/fetchData";
interface MSGPROP {
  updateUseEffect: any;
}
export default function AddMSG({ updateUseEffect }: MSGPROP) {
  const jwt = getCookie("jwt");

  const users = useGetLoginInfo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const url =
    process.env.NODE_ENV === "production"
      ? "https://workdbackend.azurewebsites.net/postmsg"
      : "http://localhost:3000/postmsg";
  const userData = {
    name: users.user?.userName,
    UserId: users.user?.id,
    jwt: jwt,
  };

  const onSubmit = async (data: any) => {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData, ...data }),
    });
    reset();
    updateUseEffect((prev: boolean) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="  absolute bottom-0 right-0  w-full h-[200px] "
    >
      {" "}
      <input
        type="text"
        className={`  ${
          errors.message?.type && "outline-red-600"
        } w-full text-right h-[20%]  outline-none  `}
        {...register("message", { required: "שדה חובה" })}
      />
      <button className="  bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg ">
        פרסם
      </button>
    </form>
  );
}
