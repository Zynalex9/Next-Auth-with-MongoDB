"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSignUp(e: React.FormEvent) {
    e.preventDefault(); // Prevent page reload
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user); // Added `/` at the start
      console.log("Sign up succeeded:", response.data);

      // Display success toast and redirect to login
      toast.success("Sign up successful!");
      router.push("/login");
    } catch (err: any) {
      console.error("Error during sign up:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [user]);

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="flex flex-col gap-2 border-2 p-12 rounded-3xl"
        onSubmit={onSignUp} // Use onSubmit for form submission
      >
        <h1 className="text-center text-3xl my-4">
          {loading ? "Processing..." : "Sign Up"}
        </h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          className="rounded-lg px-2 py-2 border-white border-2 focus:outline-none bg-transparent"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor="email">Email</label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="rounded-lg px-2 py-2 border-white border-2 focus:outline-none bg-transparent"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="rounded-lg px-2 py-2 border-white border-2 focus:outline-none bg-transparent"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          type="submit" // Ensure button type is "submit" for form submission
          className={`bg-blue-500 py-2 px-4 ${
            disabledBtn ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={disabledBtn}
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>
        <Link href={"/login"} className="px-4 py-2 bg-slate-600 text-center">
          Visit Login Page
        </Link>
      </form>
    </div>
  );
};

export default SignUpPage;
