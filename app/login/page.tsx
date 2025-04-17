"use client";

import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Card from "../_components/Card";
import Button from "../_components/Button";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  const handleCreateAccount = () => {
    if (!name || !email.includes("@")) {
      alert("Please enter a valid name and email address.");
      return;
    }
    localStorage.setItem("userName", name);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md text-center flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create the account
        </h2>

        <div className="flex flex-col items-start">
          <label htmlFor="name">Your name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus:outline-green-500 p-2 border-2 border-stone-300 rounded-sm w-full"
          />
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="email">Your email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:outline-green-500 p-2 border-2 border-stone-300 rounded-sm w-full"
          />
        </div>

        <Button onClick={handleCreateAccount} className="text-center py-3">
          Create account
        </Button>

        <p className="text-stone-600">or</p>

        <Button
          onClick={handleGoogleLogin}
          className="bg-stone-300 flex flex-row items-center gap-10"
        >
          <FcGoogle size={30} />
          Sign in with Google account
        </Button>
      </Card>
    </div>
  );
}
