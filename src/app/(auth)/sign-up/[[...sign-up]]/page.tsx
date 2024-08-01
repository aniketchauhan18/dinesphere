import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url(/bg/authbg.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <SignUp fallbackRedirectUrl="/process-user" />
    </div>
  );
}
