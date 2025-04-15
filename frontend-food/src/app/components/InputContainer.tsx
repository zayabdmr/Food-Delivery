// import { InputError } from ".";

// export const InputContainer = ({
//   title,
//   titleText,
//   type = "text",
//   placeholder = "",
//   formTitle,
//   errorText,
//   errors,
//   onChange,
//   className = "",
// }) => {
//   const inputClasses = `
//   w-[416px] h-[36px] px-[8px] py-[12px] border border-[#E4E4E7]
//     ${errors ? "border-red-500" : "border-[#8B8E95]"}
//     rounded-[8px]
//     p-3
//     ${className}
//   `;

//   return (
//     <div className="pl-[100px] flex flex-col gap-[24px]">
//       <h3 className="text-[#09090B] text-[24px] font-semibold">{title}</h3>
//       <p className="text-[#71717A] text-[16px] ">{titleText}</p>
//       <input
//         type={type}
//         placeholder={placeholder}
//         onChange={onchange}
//         className={inputClasses}
//       />
//       {errors && <InputError errorText={errorText} />}

//       <button className="text-[#FAFAFA] text-[14px] font-medium w-[416px] h-[36px] py-0 px-[32px] bg-[#18181B] rounded-xl">
//         Let's Go
//       </button>
//       <div className="flex w-[416px] justify-center gap-3">
//         <p className="text-[#71717A] text-[16px] ">Already have an account?</p>
//         <p className="text-[#2563EB] text-[16px]">{formTitle}</p>
//       </div>
//     </div>
//   );
// };
