import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Triangle } from "react-loader-spinner";

export default function FullScreenSpinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Triangle color="#18181B" height={50} width={50} />{" "}
    </div>
  );
}
