import styled from "styled-components";
import Image from "next/image";

export default function ImageUrl({
  imageUrl,
  setImageUrl,
  title,
  finalDescription,
}) {
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
      <MessageFrame>
        <div className="flex flew-col flex-g">
          <IconFrame className="flex-none">
            <Image src="/webpushdaydealicon.jpg" width="45" height="45" />
          </IconFrame>
          <div>
            <Title>{title}</Title>
            <BodyText>{finalDescription}</BodyText>
            <InfoText>Google Chrome • www.daydeal.ch</InfoText>
          </div>
        </div>
      </MessageFrame>
      <ButtonFrame>
        <Button>Jetzt bestellen</Button>
      </ButtonFrame>
    </>
  );
}

const ImageFrame = styled.div`
  width: 300px;
`;

const IconFrame = styled.div`
  width: 60px;
`;

const MessageFrame = styled.div`
  width: 300px;
  background-color: #464646;
  height: 100%;
  font-family: "Roboto", sans-serif;
  padding: 20px 10px;
`;

const ButtonFrame = styled.div`
  width: 300px;
  background-color: #464646;
  height: 100%;
  padding: 0px 15px 15px 30px;
  display: flex;
  justify-content: right;
  font-family: "Roboto", sans-serif;
`;

const Button = styled.div`
  background-color: #6b6b6b;
  padding: 7px 3px;
  color: #fff;
  text-align: center;
  width: 120px;
  font-size: 14px;
  font-weight: 400;
`;

const Title = styled.p`
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  overflow: hidden;
  margin-top: -3px;
`;

const BodyText = styled.p`
  color: #b5b5b5;
  font-size: 14px;
  line-height: 1.3;
  margin-bottom: 5px;
  font-weight: 500;
  overflow: hidden;
`;

const InfoText = styled.p`
  color: #b5b5b5;
  font-size: 12px;
  font-weight: 500;
`;
