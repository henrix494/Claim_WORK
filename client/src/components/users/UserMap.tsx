// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { inputTypes } from "../../types/types";
// import { RootState } from "../../app/store";
// import { pushAllUsers, EditLocalUser } from "../../features/allUsers/Alluseres";

// interface UserMapProps {
//   delUserHandler: (id: number) => void;
//   editBtn: (id: number) => void;
//   handleInputChange: (field: string, value: string, userId: number) => void;
//   userChanges: { [key: string]: any }[];
//   sortBy: {
//     sortByName: boolean;
//     sortByLastName: boolean;
//     sortByCity: boolean;
//     sortByCounty: boolean;
//   };
// }

// export default function UserMap({
//   editBtn,
//   delUserHandler,
//   userChanges,
// }: UserMapProps) {
//   const [selctedForDel, setSelctedForDel] = useState<number>();

//   const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});

//   const users = useSelector((state: RootState) => state.pushUsers.value);
//   const filterUsers = useSelector(
//     (state: RootState) => state.pushUsers.filteredValue
//   );
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm<inputTypes>();
//   const onSubmit: SubmitHandler<inputTypes> = async () => {
//     const nonEmptyChanges = userChanges.filter((change) =>
//       Object.values(change).every((value) => value !== "")
//     );
//     fetch("http://localhost:3000/editUser", {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(nonEmptyChanges),
//     });
//     userChanges.forEach((change) => {
//       const { id, ...nonEmptyChanges } = change;
//       dispatch(
//         EditLocalUser({
//           id,
//           ...nonEmptyChanges,
//         })
//       );
//     });

//     setEditStates({});
//   };
//   let usersToMap;

//   const collator = new Intl.Collator("he");

//   if (filterUsers && filterUsers.length > 0) {
//     usersToMap = [...filterUsers];
//   } else {
//     usersToMap = [...users].sort((a, b) => {
//       if (sortBy.sortByLastName) {
//         return collator.compare(a.lastName, b.lastName);
//       } else if (sortBy.sortByName) {
//         return collator.compare(a.firstName, b.firstName);
//       } else if (sortBy.sortByCounty) {
//         return collator.compare(a.country, b.country);
//       } else if (sortBy.sortByCity) {
//         return collator.compare(a.city, b.city);
//       }

//       return [...users];
//     });
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {" "}
//       {usersToMap.map((user) => (
//         <div
//           key={user.id}
//           className={` grid grid-cols-9  place-items-center mb-5 ${
//             selctedForDel === user.id
//               ? "border-2  border-[red]"
//               : " border-none"
//           } `}
//         >
//           <div className="flex gap-8">
//             <button
//               onClick={() => {
//                 delUserHandler(user.id);
//               }}
//               type="button"
//               className=" bg-red-500 text-white rounded-lg p-2"
//             >
//               מחק
//             </button>
//             <button
//               onClick={() => editBtn(user.id)}
//               type="button"
//               className="bg-blue-500 text-white rounded-lg p-2"
//             >
//               ערוך
//             </button>{" "}
//           </div>
//           <div>
//             {editStates[user.id] ? (
//               <input
//                 {...register(`country_${user.id}`)}
//                 type="text"
//                 className="w-[80%] "
//                 placeholder={user.country}
//                 onChange={(e) =>
//                   handleInputChange(`country`, e.target.value, user.id)
//                 }
//               />
//             ) : (
//               <p>{user.country}</p>
//             )}
//           </div>
//           <input type="hidden" {...register("id")} value={user.id} />

//           <div>
//             {editStates[user.id] ? (
//               <input
//                 {...register(`city_${user.id}`)}
//                 type="text"
//                 className="w-[80%] "
//                 placeholder={user.city}
//                 onChange={(e) =>
//                   handleInputChange(`city`, e.target.value, user.id)
//                 }
//               />
//             ) : (
//               <p>{user.city}</p>
//             )}
//           </div>
//           <div>
//             {editStates[user.id] ? (
//               <input
//                 {...register(`zipcode_${user.id}`)}
//                 type="text"
//                 className="w-[80%] "
//                 placeholder={user.zipcode}
//                 onChange={(e) =>
//                   handleInputChange(`zipcode`, e.target.value, user.id)
//                 }
//               />
//             ) : (
//               <p>{user.zipcode}</p>
//             )}
//           </div>
//           <div>
//             {editStates[user.id] ? (
//               <input
//                 {...register(`phone${user.id}`)}
//                 type="text"
//                 className="w-[80%] mr-5 "
//                 placeholder={user.phone}
//                 onChange={(e) =>
//                   handleInputChange(`phone`, e.target.value, user.id)
//                 }
//               />
//             ) : (
//               <p>{user.phone}</p>
//             )}
//           </div>
//           <div className="ml-10">
//             {editStates[user.id] ? (
//               <input
//                 {...register(`email_${user.id}`, {
//                   pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                 })}
//                 type="text"
//                 className=" "
//                 placeholder={user.email}
//                 onChange={(e) =>
//                   handleInputChange(`email`, e.target.value, user.id)
//                 }
//               />
//             ) : (
//               <p>{user.email}</p>
//             )}
//           </div>
//           <div className="ml-8">
//             {editStates[user.id] ? (
//               <input
//                 {...register(`lastName_${user.id}`)}
//                 type="text"
//                 className=" w-[30%] "
//                 placeholder={user.lastName}
//                 onChange={(e) =>
//                   handleInputChange(`lastName`, e.target.value, user.id)
//                 }
//               />
//             ) : (
//               <p>{user.lastName}</p>
//             )}
//           </div>
//           <div className="">
//             {editStates[user.id] ? (
//               <input
//                 {...register(`firstName_${user.id}`)}
//                 type="text"
//                 className=" w-[40%]  "
//                 placeholder={user.firstName}
//                 onChange={(e) =>
//                   handleInputChange(`firstName`, e.target.value, user.id)
//                 }
//               />
//             ) : (
//               <p>{user.firstName}</p>
//             )}
//           </div>
//           <div className="">
//             {editStates[user.id] ? (
//               <input
//                 {...register(`street_${user.id}`)}
//                 type="text"
//                 className=" w-[40%]  "
//                 placeholder={user.firstName}
//                 onChange={(e) =>
//                   handleInputChange(`street`, e.target.value, user.id)
//                 }
//               />
//             ) : (
//               <p>{user.street}</p>
//             )}
//           </div>
//         </div>
//       ))}
//       {Object.values(editStates).length > 0 && (
//         <button
//           type="submit"
//           className="   absolute top-10 left-72 bg-blue-500 text-white rounded-lg p-2 w-[20%]"
//         >
//           שמור שינויים
//         </button>
//       )}
//       {Object.values(editStates).length > 0 && (
//         <button
//           onClick={() => {
//             setEditStates({});
//           }}
//           type="submit"
//           className="   absolute top-10 left-[40%] bg-blue-500 text-white rounded-lg p-2 w-[20%]"
//         >
//           בטל
//         </button>
//       )}{" "}
//     </form>
//   );
// }
