import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  const isValidUrl = (url) => {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }
    return true;
  };

  if (!isValidUrl(url)) {
    console.error("Invalid URL");
  }

  const sourcecode = (await axios.get(url)).data;

  // Title
  function sliceTitle() {
    const sliceStart =
      sourcecode.indexOf(`<meta property="og:description" content="`) + 41;
    const sliceEnd = sourcecode.indexOf(`<meta property="og:image"`) - 4;
    const sliced = sourcecode.slice(sliceStart, sliceEnd);
    return sliced;
  }

  //Image URL
  function sliceImageUrl() {
    const sliceStart =
      sourcecode.indexOf(`<meta property="og:image" content="`) + 35;
    const sliceEnd = sourcecode.indexOf(`<meta property="twitter:url"`) - 5;
    const sliced = sourcecode.slice(sliceStart, sliceEnd);
    return sliced;
  }

  const finalRes = { title: sliceTitle(), imageUrl: sliceImageUrl() };

  res.status(200).json(finalRes);
}
