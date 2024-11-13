"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CommentInput from "./CommentInput";
//import useListing from "@/app/hooks/useListing";
import toast from "react-hot-toast";

interface FormProps {
  listingId: string;
}

const Form: React.FC<FormProps> = ({ listingId }) => {
  //const { listingId } = useListing();

  console.log(listingId);

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
    <div className="mb-2 p-4 border shadow-md rounded-md shadow-gray-400">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommentInput
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
