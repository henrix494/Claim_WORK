import { useEffect, useState } from "react";
import { getCookie } from "../../helper/fetchData";
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
  const [msgs, setMsgs] = useState([]);
  const jwt = getCookie("jwt");

  useEffect(() => {
    const fetchMSG = async () => {
      const response = await fetch(
        "https://workdbackend.azurewebsites.net/getMsg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jwt: jwt }),
        }
      );
      const data = await response.json();
      setMsgs(data.data);
    };
    fetchMSG();
  }, []);
  msgs.map((msg: any) => {
    console.log(msg);
  });
  return (
    <div className="lg:ml-[307px] h-[80vh] border-2 w-[60vw] text-right  self-start mt-[10%]">
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
    </div>
  );
}
