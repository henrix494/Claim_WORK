import { useDispatch } from "react-redux";
import { DelOneUser } from "../../features/allUsers/Alluseres";

interface userProps {
  id: any;
  closeModelHandler: (con: boolean) => void;
}
export default function Model({ id, closeModelHandler }: userProps) {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://server.kapit-coffee.com/deleteUser"
      : "http://localhost:3000/deleteUser";

  const dispatch = useDispatch();

  const delUserHandler = async (id: number) => {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userID: id }),
    });

    dispatch(DelOneUser(id));

    console.log(`deleting user with id ${id}`);
    closeModelHandler(false);
  };
  const noBtn = () => {
    closeModelHandler(false);
  };
  return (
    <div className="   left-1/2 top-1/2 w-[300px] h-[200px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-[white] flex items-center flex-col fixed">
      <h1>?אתה בטוח לימחוק</h1>
      <h4>!השורה המסומנת תימחק לצמיתות</h4>
      <div className="flex gap-10 mt-10">
        <button onClick={() => delUserHandler(id)}>כן</button>
        <button onClick={noBtn}>לא</button>
      </div>
    </div>
  );
}
