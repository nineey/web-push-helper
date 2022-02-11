import { useState, useEffect } from "react";

export default function FormTitle({ title, setTitle }) {
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    setTextLength(title.length);
  }, [title]);

  return (
    <>
      {" "}
      <p className="font-semibold">
        Titel{" "}
        <span
          className={`text-sm font-normal ${
            textLength > 96 ? "text-rose-600" : ""
          }`}
        >
          ({textLength}/96)
        </span>
      </p>
      <div className="flex flex-row items-center">
        <input
          type="text"
          className="input input-bordered w-full h-8"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
    </>
  );
}
