export default function handleDescriptionByType(
  dealType,
  setFinalDescription,
  daydealPrice,
  originalPrice
) {
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

  if (dealType === "daily") {
    setFinalDescription(
      `${timeIndicator.daily} ${daydealPrice} statt ${originalPrice} bei DayDeal.ch`
    );
  }
  if (dealType === "weekly") {
    setFinalDescription(
      `${timeIndicator.weekly} ${daydealPrice} statt ${originalPrice} bei DayDeal.ch`
    );
  }
  if (dealType === "special") {
    setFinalDescription(
      `${timeIndicator.special} ${daydealPrice} statt ${originalPrice} bei DayDeal.ch`
    );
  }
}
