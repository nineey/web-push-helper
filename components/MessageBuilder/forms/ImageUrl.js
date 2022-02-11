import styled from "styled-components";

export default function ImageUrl({ imageUrl, setImageUrl }) {
  return (
    <>
      <p className="font-semibold">Image URL</p>
      <input
        type="text"
        className="input input-bordered w-full h-8"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      ></input>
      <ImageFrame className="border mt-5">
        <img src={imageUrl} width="300"></img>
      </ImageFrame>
    </>
  );
}

const ImageFrame = styled.div`
  width: 300px;
`;
