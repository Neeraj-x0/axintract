import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        signInFallbackRedirectUrl="/user/home"
        signUpFallbackRedirectUrl="/user/home"
        forceRedirectUrl="/user/home"
        fallbackRedirectUrl="/user/home"
        signInRedirectUrl="/user/home"
        signInSuccessUrl="/user/home"
        signUpUrl="/sign-up"
        signUpSuccessUrl="/user/home"
        signUpRedirectUrl="/user/home"
      />
    </div>
  );
}
