import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const useGetLoginInfo = () => {
  const loggedIn = useSelector((state: RootState) => state.user.isLogged);
  const user = useSelector((state: RootState) => state.user.user);
  return { loggedIn, user };
};

export default useGetLoginInfo;
