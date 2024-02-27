import { useEffect, useState } from "react";
import { getCookie } from "../../helper/fetchData";
import { useGetLoginInfo } from "../../helper/getLoginInfo";
import AddMSG from "./AddMSG";
interface msgType {
  UserId: number;
  id: string;
  message: number;

  User: {
    id: number;
    username: string;
  };
}
export default function MSG() {
  const users = useGetLoginInfo();

  const [msgs, setMsgs] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const jwt = getCookie("jwt");
  const url =
    process.env.NODE_ENV === "production"
      ? "https://server.kapit-coffee.com/getMsg"
      : "http://localhost:3000/getMsg";
  useEffect(() => {
    const fetchMSG = async () => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jwt: jwt }),
      });
      const data = await response.json();
      setMsgs(data.data);
    };

    fetchMSG();
  }, [isSent]);
  const updateUseEffect = (data: boolean) => {
    setIsSent(data);
  };
  return (
    <div className="lg:ml-[307px] h-[80vh] border-2 w-[60vw] text-right  self-start mt-[10%] relative">
      <div>
        {msgs.map((msg: msgType) => {
          return (
            <div key={msg.id} className=" border-2">
              <p>
                <span className="font-bold">{msg.User.username} :</span> מפרסם
              </p>
              <p>{msg.message} הודעה</p>
            </div>
          );
        })}
      </div>
      {users.user?.role === "admin" && (
        <AddMSG updateUseEffect={updateUseEffect} />
      )}
    </div>
  );
}
