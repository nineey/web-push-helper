import { useEffect, useState, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import DatePickerForm from "./forms/DatePicker";
import sendMessage, { handleDescriptionByType } from "./helpers";

import FormTitle from "./forms/FormTitle";
import SelectDraft from "./forms/SelectDraft";
import ImageUrl from "./forms/ImageUrl";
import SelectDealType from "./forms/SelectDealType";
import FormDescription from "./forms/FormDescription";

export default function MessageFields({
  title,
  setTitle,
  imageUrl,
  setImageUrl,
}) {
  const toast = useToast();

  // message relevant content
  const [isDraft, setDraft] = useState(true);
  const [dealType, setDealType] = useState("daily");
  const [description, setDescription] = useState("");
  const price = "149.–";
  const [sendDate, setSendDate] = useState(new Date().setHours(9, 0, 0, 0));

  useEffect(() => {
    handleDescriptionByType(dealType, setDescription, price);
  }, [dealType]);

  return (
    <>
      <SelectDealType {...{ setDealType }} />
      <FormTitle {...{ title, setTitle }} />
      <FormDescription {...{ description, setDescription }} />

      <div className="mt-3">
        <ImageUrl {...{ imageUrl, setImageUrl }} />
      </div>

      <div className="w-56 mt-3">
        <SelectDraft {...{ isDraft, setDraft }} />
      </div>

      <div className="w-56 mt-3">
        <DatePickerForm {...{ sendDate, setSendDate }} />
      </div>

      <button
        className="mt-5 w-56 h-16 text-xl bg-red-600 hover:bg-red-500 rounded-md text-white font-bold"
        onClick={() => {
          sendMessage(title, description, imageUrl, isDraft, sendDate),
            console.log(title, description, imageUrl, isDraft, sendDate);
          toast({
            title: `Notification sent`,
            position: "top-right",
            isClosable: true,
            status: "success",
          });
        }}
      >
        Schedule now!
      </button>
    </>
  );
}
