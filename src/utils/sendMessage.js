import axios from "axios";

const sendMessage = async (
  title,
  finalDescription,
  imageUrl,
  dealUrl,
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
        description: finalDescription,
        imageUrl: imageUrl,
        isDraft: isDraft,
        sendDate: sendDate,
        dealType: dealType,
        dealUrl: dealUrl,
      })
    ).data;
    setDataSent({ status: true, data: data });
  } catch (e) {
    console.error(e);
    setError("Connection failed");
  }
};

export default sendMessage;
