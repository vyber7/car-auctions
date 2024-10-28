"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./MessageInput";

const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("comment", "", { shouldValidate: true });
    console.log(data);
    axios.post("/api/comment", data);
  };

  return (
    <div className="mb-2 p-4 border shadow-md rounded-md shadow-gray-400">
      <form onSubmit={handleSubmit(onSubmit)}>
        <MessageInput
          id="comment"
          register={register}
          errors={errors}
          required
          placeholder="Leave a comment"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
