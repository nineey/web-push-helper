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
  dealUrl,
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
  const [loading, setLoading] = useState(false);

  const date = new Date(sendDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // console.log(loading);

  function checkDay(inputDay) {
    const today = new Date().getDate();

    if (Number(inputDay) === today) {
      return "Heute";
    } else if (Number(inputDay) === today + 1) {
      return "Morgen";
    } else {
      return `${day}.${month}.${year}`;
    }
  }

  function checkIfDatePast(day) {
    if (new Date() > sendDate) {
      return true;
    }
    return;
  }

  function defaultDate() {
    const today = new Date();
    if (today.getHours() >= 9) {
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      if (dealType === "weekly") {
        return tomorrow.setHours(10, 0, 0, 0);
      }
      return tomorrow.setHours(9, 0, 0, 0);
    }
    if (dealType === "weekly") {
      return new Date().setHours(10, 0, 0, 0);
    }
    return new Date().setHours(9, 0, 0, 0);
  }

  function handleDescriptionByType() {
    const timeIndicator = {
      daily: "Heute für nur",
      weekly: "Diese Woche für nur",
      special: "Jetzt für nur",
    };

    function excludeCurrency(price) {
      if (price.includes("CHF")) {
        return price.slice(4);
      }
    }

    setFinalDescription(
      `${
        dealType === "daily"
          ? timeIndicator.daily
          : dealType === "weekly"
          ? timeIndicator.weekly
          : timeIndicator.special
      } ${excludeCurrency(daydealPrice)} statt ${excludeCurrency(
        originalPrice
      )} bei DayDeal.ch`
    );
  }

  useEffect(() => {
    handleDescriptionByType();
    setSendDate(defaultDate());
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
            <ImageUrl {...{ imageUrl, setImageUrl, title, finalDescription }} />
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
              ? `${process.env.NEXT_PUBLIC_TTL_MINUTES_DAILY / 60} Stunden`
              : dealType === "weekly"
              ? `${process.env.NEXT_PUBLIC_TTL_MINUTES_WEEKLY / 60} Stunden`
              : `${process.env.NEXT_PUBLIC_TTL_MINUTES_SPECIAL} Minuten`}
          </div>

          <div className="mt-3">
            <p className="font-semibold">Autohide</p>
            {dealType === "daily"
              ? `${process.env.NEXT_PUBLIC_AUTOHIDE_DAILY / 3600} Stunden`
              : dealType === "weekly"
              ? `${process.env.NEXT_PUBLIC_AUTOHIDE_WEEKLY / 86400} Tage`
              : `${process.env.NEXT_PUBLIC_AUTOHIDE_SPECIAL / 3600} Stunden`}
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

          {loading ? (
            <button className="loading btn bg-green-500 hover:bg-green-600 border-none w-full mt-5"></button>
          ) : (
            <>
              <button
                className="btn bg-green-500 hover:bg-green-600 border-none w-full mt-5"
                disabled={checkIfDatePast(day) && "disabled"}
                onClick={() => {
                  setLoading(true);
                  sendMessage(
                    title,
                    finalDescription,
                    imageUrl,
                    dealUrl,
                    isDraft,
                    sendDate,
                    dealType,
                    setError,
                    setDataSent,
                    setLoading
                  );
                }}
              >
                {checkIfDatePast(day) ? (
                  "Datum in der Zukunft wählen"
                ) : (
                  <>
                    Jetzt planen:
                    <span className="font-extrabold">
                      &nbsp;{checkDay(day)}&nbsp;
                    </span>
                    um&nbsp;
                    <span className="font-extrabold">
                      {hours}:{minutes} Uhr
                    </span>
                    {isDraft === "true" && (
                      <span className="text-black">&nbsp;(Entwurf)</span>
                    )}
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
