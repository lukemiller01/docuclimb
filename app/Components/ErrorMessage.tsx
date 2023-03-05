import React from "react";

interface Error {
  error: string;
}

const ErrorMessage = ({ error }: Error) => {
  return (
    <div className="flex items-center mx-auto justify-center">
      <p className=" flex border rounded-md bg-climb-red/20 text-climb-red text-sm py-2 px-8 font-bold whitespace-pre leading-7">
        {error}
      </p>
    </div>
  );
};

export default ErrorMessage;
