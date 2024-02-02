import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface props {
  getidFromMobile: any;
  userId: number;
}
export default function MobileModel({ getidFromMobile, userId }: props) {
  const resetId = () => {
    getidFromMobile(null);
  };
  const users = useSelector((state: RootState) => state.pushUsers.value);
  const idUser = users.filter((user) => {
    return user.id === userId;
  });
  idUser.map((item) => {
    console.log(item.city);
  });
  return (
    <div className=" fixed top-10  bg-[white] w-screen h-[40vh] flex flex-row-reverse">
      <div className=" absolute left-5 top-3" onClick={resetId}>
        x
      </div>

      <div className=" flex-col items-center  justify-center  mt-10">
        <div>
          {" "}
          <p>מייל</p>
        </div>
        <div>
          {" "}
          <p>מספר</p>
        </div>
        <div>
          {" "}
          <p>מיקוד</p>
        </div>
        <div>
          {" "}
          <p>רחוב</p>
        </div>
        <div>
          {" "}
          <p>עיר</p>
        </div>
        <div>
          {" "}
          <p>ארץ</p>
        </div>
        <div>
          {" "}
          <p>שם</p>
        </div>
        <div>
          {" "}
          <p>שם משפחה</p>
        </div>
      </div>
      <div className=" mt-10 mr-5  ">
        {idUser.map((item) => (
          <div>
            <p>{item.email}</p>
            <p>{item.phone}</p>
            <p>{item.zipcode}</p>
            <p>{item.street}</p>
            <p>{item.city}</p>
            <p>{item.country}</p>
            <p>{item.firstName}</p>
            <p>{item.lastName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
