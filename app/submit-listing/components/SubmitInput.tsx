"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SubmitInputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const SubmitInput: React.FC<SubmitInputProps> = ({
  label,
  id,
  type = "text",
  required = false,
  register,
  errors,
  disabled = false,
}) => {
  return (
    <div className="lg:w-[32%] w-full mb-4">
      <label
        htmlFor={id}
        className="
        block
        text-sm
        font-medium
        leading-6
        text-gray-900
       pb-2
        "
      >
        {label}
      </label>
      <div className="">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
          form-input
          block
          w-full
          rounded-md
          py-1.5
          text-gray-900
          shadow-sm
          
          
          focus:border-transparent
          border-gray-300
          focus:ring
          focus:ring-gray-500
          
          placeholder:text-gray-400
          hover:ring hover:ring-gray-500
          sm:text-sm
          sm:leading-6
          `,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        ></input>
      </div>
    </div>
  );
};

export default SubmitInput;
