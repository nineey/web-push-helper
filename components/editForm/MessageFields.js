import { Select } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

// https://www.npmjs.com/package/react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MessageFields({
  title,
  setTitle,
  imageUrl,
  setImageUrl,
}) {
  const [isDraft, setDraft] = useState(true);
  const [sendDate, setSendDate] = useState(new Date().setHours(9, 0, 0, 0));
  const toast = useToast();

  const sendMessage = async (title, imageUrl) => {
    console.log(title);
    console.log(imageUrl);
    const data = (
      await axios.post("/api/getback", {
        title: title,
        imageUrl: imageUrl,
        isDraft: isDraft,
      })
    ).data;
    console.log(data);
  };

  return (
    <>
      <div>
        <p className="font-semibold">Title</p>
        <input
          type="text"
          className="w-full lg:w-1/2 border border-green-600 p-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>

      <div className="mt-3">
        <p className="font-semibold">Image URL</p>
        <input
          type="text"
          className="w-full lg:w-1/2 border border-green-600 p-1"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        ></input>
        <img src={imageUrl} width="300" className="mt-5"></img>
      </div>

      <div className="w-56 mt-3">
        <p className="font-semibold">Draft?</p>

        <Select
          borderColor="green.400"
          onChange={(e) => setDraft(e.target.value)}
        >
          <option value="true" selected>
            Yes
          </option>
          <option value="false">Nope</option>
        </Select>
      </div>

      <div className="w-56 mt-3">
        <p className="font-semibold">Time to send</p>

        <div className="border border-green-600 p-2 border-rounded-5">
          {" "}
          <DatePicker
            selected={sendDate}
            onChange={(date) => setSendDate(date)}
            showTimeSelect
            dateFormat="dd.MM.yyyy – hh:mm aa"
          />
        </div>
      </div>

      <button
        className="mt-5 w-56 h-16 text-xl bg-red-600 hover:bg-red-500 rounded-md text-white font-bold"
        onClick={() => {
          sendMessage(title, imageUrl),
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
