"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Nav from "@/app/components/Nav";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import Bread from "../components/Bread";
import Main_card from "../components/Main_card";
import Chat from "../components/Chat";
import { useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isHidden, setIsHidden] = useState(false);

  if (session) {
    return (
      <div className="font-sans text-foreground-500 antialiased">
        <Nav isHidden={isHidden} />
        <Main_card setIsHidden={setIsHidden} />
      </div>
    );
  } else {
    router.push("/");
  }
};

export default Dashboard;
