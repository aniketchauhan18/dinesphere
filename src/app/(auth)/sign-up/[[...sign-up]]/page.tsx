import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-center bg-cover bg-[url('/bg/authbg-sm.svg')] sm:bg-[url('/bg/authbg-lg.svg')]">
      <SignUp fallbackRedirectUrl="/process-user" />
    </div>
  );
}
