"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CommentInput from "./CommentInput";
import { MdSend } from "react-icons/md";

import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface FormProps {
  listingId: string;
}

const Form: React.FC<FormProps> = ({ listingId }) => {
  const { data } = useSession();

  console.log(data);

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
    axios
      .post("/api/comments", { ...data, listingId })
      .then((res) => {
        console.log(res);
      })
      .catch(() => toast.error("Something went wrong!"));
    //.finally(() => setIsLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative border flex border-gray-300 rounded-md mb-2 md:mb-4 has-[:focus]:ring has-[:focus]:ring-blue-500 hover:ring hover:ring-blue-500"
    >
      <CommentInput
        id="comment"
        register={register}
        errors={errors}
        required
        placeholder="Leave a comment"
      />
      {data ? (
        <button
          type="submit"
          className="px-2 text-blue-500 hover:text-blue-600"
        >
          <MdSend className="text-2xl" />
        </button>
      ) : (
        <>
          <button
            type="submit"
            className="px-2 text-blue-500 hover:text-blue-600 peer"
            disabled
          >
            <MdSend className="text-2xl" />
          </button>
          <div className="hidden absolute right-0 top-[-40px] text-rose-500 peer-hover:block">
            Please, log in
          </div>
        </>
      )}
    </form>
  );
};

export default Form;
