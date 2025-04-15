// // import { ChevronLeft } from "lucide-react";

// import { InputContainer } from "@/app/components/InputContainer";

// // export const CreateAccount = () => {
// //   return (
// //     <div className="pl-[100px] flex flex-col gap-[24px]">
// //       {/* <ChevronLeft /> */}
// //       <h3 className="text-[#09090B] text-[24px] font-semibold">
// //         Create your account
// //       </h3>
// //       <p className="text-[#71717A] text-[16px] ">
// //         Sign up to explore your favorite dishe s.
// //       </p>
// //       <input
// //         placeholder="Enter your email address"
// //         className="w-[416px] h-[36px] px-[8px] py-[12px] border border-[#E4E4E7]"
// //       />
// //       <button className="text-[#FAFAFA] text-[14px] font-medium w-[416px] h-[36px] py-0 px-[32px] bg-[#18181B] rounded-xl">
// //         Let's Go
// //       </button>
// //       <div className="flex w-[416px] justify-center gap-3">
// //         <p className="text-[#71717A] text-[16px] ">Already have an account?</p>
// //         <p className="text-[#2563EB] text-[16px]">Log in</p>
// //       </div>
// //     </div>
// //   );
// // };

// export const CreateAccount = ({
//   handleOnChange = () => {},
//   errors = {},
//   formValues = {},
// }) => {
//   const fields = [
//     {
//       title: "Create your account",
//       titleText: "Sign up to explore your favorite dishes."
//       type: "text",
//       errorText: "Invalid email. Use a format like example@email.com",
//     },
//   ];

//   return (
//     <div className="flex flex-col gap-3">
//       {fields.map(({ title, type, errorText }) => (
//         <InputContainer
//           key={name}
//           title={title}
//           id={name}
//           type={type}
//           placeholder="Enter your email address"
//           errorText={errorText}

//         />
//       ))}
//     </div>
//   );
// };
