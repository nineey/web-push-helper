import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <>
      <div className="mb-5 h-14 bg-gray-600">
        <div className="container mx-auto px-4 h-full flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Web Push Helper</h1>
          <div className="content-center">
            <Link href="/api/auth/signout">
              <a
                className="hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Logout
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
