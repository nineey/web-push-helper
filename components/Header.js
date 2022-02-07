import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Header() {
  return (
    <>
      <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box mb-10">
        <div class="flex-1 px-2 mx-2 lg:flex">
          <span class="text-lg font-bold">Web Push Helper</span>
        </div>

        <div class="flex-none">
          <Link href="/api/auth/signout">
            <button
              class="btn btn-square btn-ghost"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-current"
              >
                <path
                  stroke-width="0"
                  d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-16-7v20h14v-2h-12v-16h12v-2h-14"
                ></path>
              </svg>
            </button>
          </Link>
        </div>

        <div class="flex-none">
          <div class="avatar">
            <div class="rounded-full w-10 h-10 m-1">
              <img src="https://i.pravatar.cc/500?img=32"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
