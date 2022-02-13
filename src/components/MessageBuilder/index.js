import { useEffect, useState } from "react";
import DatePickerForm from "./forms/DatePicker";
import sendMessage from "../../utils/sendMessage";

import FormTitle from "./forms/FormTitle";
import SelectDraft from "./forms/SelectDraft";
import ImageUrl from "./forms/ImageUrl";
import SelectDealType from "./forms/SelectDealType";
import FormDescription from "./forms/FormDescription";

export default function MessageBuilder({
  title,
  setTitle,
  imageUrl,
  setImageUrl,
  daydealPrice,
  originalPrice,
  setDataSent,
}) {
  // message relevant content
  const [isDraft, setDraft] = useState(false);
  const [dealType, setDealType] = useState("daily");
  const [finalDescription, setFinalDescription] = useState("");
  const [sendDate, setSendDate] = useState(defaultDate());
  const [error, setError] = useState("");

  const date = new Date(sendDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  function defaultDate() {
    const today = new Date();
    if (today.getHours() >= 9) {
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      return tomorrow.setHours(9, 0, 0, 0);
    }
    return new Date().setHours(9, 0, 0, 0);
  }

  function handleDescriptionByType() {
    const timeIndicator = {
      daily: "Heute für nur",
      weekly: "Diese Woche für nur",
      special: "Jetzt für nur",
    };

    // function excludeCurrency(price) {
    //   if (price.includes("CHF")) {
    //     return price.slice(-4);
    //   }
    // }

    setFinalDescription(
      `${
        dealType === "daily"
          ? timeIndicator.daily
          : dealType === "weekly"
          ? timeIndicator.weekly
          : timeIndicator.special
      } ${daydealPrice} statt ${originalPrice} bei DayDeal.ch`
    );
  }

  useEffect(() => {
    handleDescriptionByType();
  }, [dealType, daydealPrice, originalPrice]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
        {/* left */}
        <div>
          <div className="mt-3">
            <SelectDealType {...{ setDealType }} />
          </div>
          <div className="mt-3">
            <FormTitle {...{ title, setTitle }} />
          </div>
          <div className="mt-3">
            <FormDescription
              {...{
                finalDescription,
                setFinalDescription,
              }}
            />
          </div>

          <div className="mt-3">
            <ImageUrl {...{ imageUrl, setImageUrl }} />
          </div>
        </div>
        {/* right */}
        <div>
          <div className="w-56 mt-3">
            <SelectDraft {...{ isDraft, setDraft }} />
          </div>

          <div className="flex items-center">
            <div className="w-56 mt-3">
              <DatePickerForm {...{ sendDate, setSendDate }} />
            </div>
          </div>
          <div className="mt-3">
            <p className="font-semibold">Empfänger-Segment</p>
            {dealType === "daily" || dealType === "weekly"
              ? "Tages- und Wochendeals"
              : "Special-Deals"}
          </div>

          <div className="mt-3">
            <p className="font-semibold">Time-to-live</p>
            {dealType === "daily"
              ? "3 Stunden"
              : dealType === "weekly"
              ? "3 Tage"
              : "45 Minuten"}
          </div>

          {error && (
            <div className="alert alert-error w-68 mt-5">
              <div className="flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 mx-2 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  ></path>
                </svg>
                <label>API error. Please try again.</label>
              </div>
            </div>
          )}

          <button
            className="btn bg-green-500 hover:bg-green-600 border-none w-full mt-5"
            onClick={() => {
              sendMessage(
                title,
                finalDescription,
                imageUrl,
                isDraft,
                sendDate,
                dealType,
                setError,
                setDataSent
              );
            }}
          >
            Jetzt planen am
            <span className="font-extrabold">
              &nbsp; {day}.{month}.{year} &nbsp;
            </span>
            um &nbsp;
            <span className="font-extrabold">
              {hours}:{minutes} Uhr
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
