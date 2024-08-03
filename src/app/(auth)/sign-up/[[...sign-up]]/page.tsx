import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  // forceRedirect url here
  return (
    <div className="min-h-screen flex justify-center items-center bg-center bg-cover bg-[url('/bg/authbg-sm.svg')] sm:bg-[url('/bg/authbg-lg.svg')]">
      <SignUp forceRedirectUrl="/process-user" />
    </div>
  );
}
