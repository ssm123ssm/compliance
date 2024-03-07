"use client";
import React from "react";
import Login_component from "@/app/components/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/dashboard");
  }
  return (
    <div className="justify-center items-center grid grid-cols-1 md:grid-cols-3  bg-cover h-lvh">
      <div className="col-span-1 md:col-span-3">
        <Login_component />
      </div>
    </div>
  );
};

export default Login;
