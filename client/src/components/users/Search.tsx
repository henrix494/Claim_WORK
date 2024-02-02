import {
  SerachUserByname,
  SerachUserByLastName,
} from "../../features/allUsers/Alluseres";
import { useDispatch } from "react-redux";
export default function Search() {
  const dispatch = useDispatch();
  const onNameSearch = (name: string) => {
    dispatch(SerachUserByname(name));
  };
  const onLastNameSearh = (name: string) => {
    dispatch(SerachUserByLastName(name));
  };
  return (
    <div className="mr-5 flex  gap-10 max-lg:flex-col max-lg:w-[200px] ">
      <div>
        <input
          name="searchByLastName"
          className="   mr-2 p-1 rounded-lg text-right "
          onChange={(e) => {
            onLastNameSearh(e.target.value);
          }}
        ></input>
        <label htmlFor="search">חפש לפי שם מישפחה</label>
      </div>
      <div>
        <input
          name="searchByName"
          className=" mr-2 p-1 rounded-lg text-right"
          onChange={(e) => {
            onNameSearch(e.target.value);
          }}
        ></input>
        <label htmlFor="search">חפש לפי שם</label>
      </div>
    </div>
  );
}
