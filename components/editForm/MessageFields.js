import { Select } from "@chakra-ui/react";
import axios from "axios";

import { useState, useCallback } from "react";

export default function MessageFields({
  title,
  setTitle,
  imageUrl,
  setImageUrl,
}) {
  const [isDraft, setDraft] = useState(true);
  const [executeDate, setExecuteDate] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState("");

  console.log(title);

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
          className="w-1/2 border-2 border-green-600 p-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>

      <div className="mt-3">
        <p className="font-semibold">Image URL</p>
        <input
          type="text"
          className="w-1/2 border-2 border-green-600 p-1"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        ></input>
      </div>

      <div className="w-1/2 mt-3">
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

      <div className="w-1/2 mt-3">
        <p className="font-semibold">Send time</p>
      </div>

      <button
        className="mt-5 w-56 h-16 bg-red-600 hover:bg-red-500 rounded-md text-white font-bold"
        onClick={() => {
          sendMessage(title, imageUrl), setSuccessMessage("Message sent!");
        }}
      >
        Send!
      </button>
      {successMessage ? (
        <div>
          <p>{successMessage}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
