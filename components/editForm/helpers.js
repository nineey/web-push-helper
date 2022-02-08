import axios from "axios";

const sendMessage = async (title, description, imageUrl, isDraft, sendDate) => {
  try {
    const data = (
      await axios.post("/api/getback", {
        title: title,
        description: description,
        imageUrl: imageUrl,
        isDraft: isDraft,
        sendDate: sendDate,
      })
    ).data;
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

export function handleDescriptionByType(dealType, setDescription, price) {
  const timeIndicator = {
    daily: "Heute für nur",
    weekly: "Diese Woche für nur",
    special: "Jetzt für nur",
  };

  if (dealType === "daily") {
    setDescription(
      `${timeIndicator.daily} ${price} statt ${price} bei DayDeal.ch`
    );
  }
  if (dealType === "weekly") {
    setDescription(
      `${timeIndicator.weekly} ${price} statt ${price} bei DayDeal.ch`
    );
  }
  if (dealType === "special") {
    setDescription(
      `${timeIndicator.special} ${price} statt ${price} bei DayDeal.ch`
    );
  }
}

export default sendMessage;
