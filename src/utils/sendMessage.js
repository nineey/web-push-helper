import axios from "axios";

const sendMessage = async (
  title,
  description,
  imageUrl,
  isDraft,
  sendDate,
  dealType,
  setError,
  setDataSent
) => {
  try {
    const data = (
      await axios.post("/api/getback", {
        title: title,
        description: description,
        imageUrl: imageUrl,
        isDraft: isDraft,
        sendDate: sendDate,
        dealType: dealType,
      })
    ).data;
    setDataSent({ status: true, data: data });
  } catch (e) {
    console.error(e);
    setError("Connection failed");
  }
};

export default sendMessage;
