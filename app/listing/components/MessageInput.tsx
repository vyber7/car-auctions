"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  type?: string;
  required?: boolean;
  placeholder?: string;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  register,
  type,
  required,
  placeholder,
  errors,
}) => {
  return (
    <input
      id={id}
      autoComplete={id}
      {...register(id, { required })}
      type={type}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-md"
    />
  );
};

export default MessageInput;
