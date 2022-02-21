import Link from "next/link";
import { signOut } from "next-auth/react";
import { BsFillBellFill } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";
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
          <FiHelpCircle className="text-2xl" />
        </label>
        <input type="checkbox" id="modal-credits" className="modal-toggle" />
        <div className="modal text-slate-800">
          <div className="modal-box">
            <h2 className="font-bold text-xl">Credits</h2>
            <p className="mb-5">
              This tool was built by Nicolas while drinking tea on some free
              evenings. Hope it makes your everyday life a little bit easier.{" "}
            </p>
            <div>
              <h2 className="font-bold text-xl">Do you have an issue?</h2>
            </div>
            <p className="">
              You can reach me at:&nbsp;
              <a href="mailto:dev@nicolasneeser.ch">dev@nicolasneeser.ch</a>
            </p>
            <div className="modal-action">
              <label htmlFor="modal-credits" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>

        <div className="flex-none">
          {/* <Link href="/api/auth/signout"> */}
          <button
            className="btn btn-square btn-ghost"
            onClick={(e) => {
              // e.preventDefault();
              signOut();
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
