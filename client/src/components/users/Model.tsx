import fetchData from "../../helper/fetchData";
import { useDispatch } from "react-redux";
import { pushAllUsers, DelOneUser } from "../../features/allUsers/Alluseres";
interface userProps {
  id: any;
  closeModel: (con: boolean) => void;
}
export default function Model({ id, closeModel }: userProps) {
  const dispatch = useDispatch();

  const delUserHandler = async (id: number) => {
    fetch("http://localhost:3000/deleteUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: id }),
    });

    dispatch(DelOneUser(id));
    closeModel(false);
    console.log(`deleting ${id}`);
  };
  const noBtn = () => {
    closeModel(false);
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
