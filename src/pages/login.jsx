import React, { useState } from "react";
import { useAuthContext } from "@/providers/auth-provider";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ArrowRight({ className, size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      width={size}
      height={size}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-centerpx-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-2xl font-bold leading-tight ">
          Sign in to your account
        </h2>
        <p className="mt-2text-sm text-gray-600 ">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            title=""
            className="font-semibold text-black transition-all duration-200 hover:underline"
          >
            Create a free account
          </a>
        </p>
        <form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            console.log({
              email,
              password,
            });
            login(email, password).then((data) => navigate("/"));
          }}
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="" className="text-base font-medium text-gray-900">
                {" "}
                Email address{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                ></input>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Password{" "}
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                ></input>
              </div>
            </div>
            <div>
              <Button type="submit" className="w-full">
                Get started <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
