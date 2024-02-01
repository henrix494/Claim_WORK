import { SerachUser } from "../../features/allUsers/Alluseres";
import { UseDispatch, useDispatch } from "react-redux";
export default function Search() {
  const dispatch = useDispatch();
  const onNameSearch = (name: string) => {
    dispatch(SerachUser(name));
  };
  return (
    <div className="mr-5">
      <input
        name="search"
        className=" mt-10  mr-2 p-1 rounded-lg text-right"
        onChange={(e) => {
          onNameSearch(e.target.value);
        }}
      ></input>
      <label htmlFor="search">חפש</label>
    </div>
  );
}
