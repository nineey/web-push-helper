import Link from "next/link";
import { signOut } from "next-auth/react";
import { BsFillBellFill } from "react-icons/bs";
import { FaSmileWink } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <>
      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box mb-10">
        <div className="flex-1 px-2 mx-2 lg:flex">
          <span className="text-lg font-bold ">
            Web Push Helper <BsFillBellFill className="inline" />
          </span>
        </div>

        <label
          htmlFor="modal-credits"
          className="btn btn-ghost modal-button hidden md:flex"
        >
          Version 1.0
        </label>
        <input type="checkbox" id="modal-credits" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <p className="text-slate-800	">
              This tool was built by Nicolas while drinking tea on some free
              evenings. Hope it makes your everyday life a little bit easier.{" "}
              <FaSmileWink className="inline" />
            </p>
            <div className="modal-action">
              <label htmlFor="modal-credits" className="btn">
                Thanks!
              </label>
            </div>
          </div>
        </div>

        <button className="btn btn-ghost px-2 mr-3">
          <a href="mailto:dev@nicolasneeser.ch">Help?</a>
        </button>
        <div className="flex-none">
          {/* <Link href="/api/auth/signout"> */}
          <button
            className="btn btn-square btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              // router.push("/api/auth/signin");
              signOut({ callbackUrl: "http://localhost:3000/api/auth/signin" });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeWidth="0"
                d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-16-7v20h14v-2h-12v-16h12v-2h-14"
              ></path>
            </svg>
          </button>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
}
