import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <>
      <div className="mb-5 h-50 pt-1 pb-5 bg-green-600">
        <div className="container mx-auto mt-5">
          <h1 className="text-3xl font-bold text-white">
            DayDeal Web Push Handler
          </h1>
        </div>
      </div>
      <ul>
        {!session && (
          <li>
            <Link href="/api/auth/signin">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Login
              </a>
            </Link>
          </li>
        )}
        {session && (
          <li>
            <Link href="/api/auth/signout">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Logout
              </a>
            </Link>
          </li>
        )}
      </ul>
    </>
  );
}
