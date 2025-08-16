"use client";

import { useRef, useState } from "react";
import { CreateNewPassword } from "./CreateNewPassword";
import { ResetPassword } from "./ResetPassword";
import { VerifyEmail } from "./VerifyEmail";

export const ForgotPasswordPage = () => {
  const [page, setPage] = useState(0);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleNextPage = () => {
    if (page >= 0 && page < 2) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const ForgotPassWordArray = [
    <ResetPassword
      key="resetPassword"
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      emailInputRef={emailInputRef}
    />,
    <VerifyEmail
      key="verifyEmail"
      emailInputRef={emailInputRef}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
    />,
    <CreateNewPassword
      key="createNewPassword"
      handlePreviousPage={handlePreviousPage}
    />,
  ];

  return <div>{ForgotPassWordArray[page]}</div>;
};
