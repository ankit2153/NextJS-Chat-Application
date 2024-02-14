"use client";

import useConversation from "@/app/(hooks)/userConversation";
import axios from "axios";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";

import MessageInput from "./MessageInput";

import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={() => {
          handleUpload;
        }}
        uploadPreset="xggo2kp4"
      >
        <HiPhoto size={32} className="text-sky-500" />
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center gap-2 lg:gap-4"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 hover:bg-sky-600 cursor-pointer"
        >
          <HiPaperAirplane className="text-white " />
        </button>
      </form>
    </div>
  );
};

export default Form;
