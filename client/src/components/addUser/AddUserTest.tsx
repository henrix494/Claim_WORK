// import { inputTypes } from "../../types/types";
// import { useForm, SubmitHandler } from "react-hook-form";
// export default function AddUserTest() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<inputTypes>();
//   const onSubmit: SubmitHandler<inputTypes> = (data) => console.log(data);

//   console.log(errors);
//   return (
//     <div className="w-[50%] h-[80%] rounded-lg border-2 border-black overflow-x-auto  ">
//       <div className="pt-10">
//         <form
//           className="flex flex-col gap-10 "
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <div className="flex w-full justify-around ">
//             <div className="flex text-right flex-col w-[40%] ">
//               <label className="text-2xl" htmlFor="LastName">
//                 שם משפחה
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 className="rounded-lg text-right"
//                 {...register("lastName", {
//                   required: true,
//                   pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                 })}
//               />{" "}
//             </div>
//             <div className="flex text-right flex-col w-[40%]">
//               <label htmlFor="name" className=" text-2xl">
//                 שם
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 className="rounded-lg text-right"
//               />
//             </div>
//           </div>
//           <div className="flex w-full justify-around ">
//             <div className="flex text-right flex-col  ">
//               <label className="text-2xl" htmlFor="street">
//                 רחוב
//               </label>
//               <input
//                 type="text"
//                 id="street"
//                 name="street"
//                 className="rounded-lg text-right"
//               />{" "}
//             </div>
//             <div className="flex text-right flex-col ">
//               <label htmlFor="city" className=" text-2xl">
//                 עיר
//               </label>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 className="rounded-lg text-right"
//               />
//             </div>
//             <div className="flex text-right flex-col ">
//               <label htmlFor="country" className=" text-2xl">
//                 ארץ
//               </label>
//               <input
//                 type="text"
//                 id="country"
//                 name="country"
//                 className="rounded-lg text-right"
//               />
//             </div>
//           </div>
//           <div className="flex w-full justify-around ">
//             <div className="flex text-right flex-col w-[40%] ">
//               <label className="text-2xl" htmlFor="name">
//                 מספר
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 className="rounded-lg text-right"
//               />{" "}
//             </div>
//             <div className="flex text-right flex-col w-[40%]">
//               <label htmlFor="name" className=" text-2xl">
//                 מיקוד
//               </label>
//               <input
//                 type="text"
//                 id="LastName"
//                 name="LastName"
//                 className="rounded-lg text-right"
//               />
//             </div>
//           </div>
//           <div className="flex w-full justify-around ">
//             <div className="flex text-right flex-col w-[40%] ">
//               <label className="text-2xl" htmlFor="name">
//                 מייל
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 className="rounded-lg text-right"
//               />{" "}
//             </div>
//           </div>
//           <button>שלח</button>
//         </form>
//       </div>
//     </div>
//   );
// }
