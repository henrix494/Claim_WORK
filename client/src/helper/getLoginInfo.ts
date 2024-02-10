import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const useGetLoginInfo = () => {
  const users = useSelector((state: RootState) => state.user.user);
  return users;
};
