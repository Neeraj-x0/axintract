"use client";
import React from "react";
import { SignIn } from "@clerk/nextjs";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn
        routing="path"
        path="/login"
        appearance={{
          elements: {
            formButtonPrimary: "bg-black text-white hover:bg-gray-800",
          },
        }}
        signUpFallbackRedirectUrl="/user/home"
        signInFallbackRedirectUrl="/user/home"
        signInRedirectUrl="/user/home"
        signInSuccessUrl="/user/home"
        signUpUrl="/sign-up"
        forceRedirectUrl="/user/home"
        fallbackRedirectUrl="/user/home"
      />
    </div>
  );
};

export default AuthPage;
