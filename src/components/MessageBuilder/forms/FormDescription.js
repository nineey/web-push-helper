import { useState, useEffect } from "react";

export default function FormDescription({
  finalDescription,
  setFinalDescription,
}) {
  const [textLength, setTextLength] = useState(0);

  const timeIndicator = {
    daily: "Heute für nur",
    weekly: "Diese Woche für nur",
    special: "Jetzt für nur",
  };

  useEffect(() => {
    setTextLength(finalDescription.length);
  }, [finalDescription]);

  return (
    <>
      {" "}
      <p className="font-semibold">
        Body{" "}
        <span
          className={`text-sm font-normal ${
            textLength > 170 ? "text-rose-600" : ""
          }`}
        >
          ({textLength}/170)
        </span>
      </p>
      <div className="flex flew-row items-center">
        <input
          type="text"
          className="input input-bordered w-full h-8"
          value={finalDescription}
          onChange={(e) => setFinalDescription(e.target.value)}
        ></input>
      </div>
    </>
  );
}
