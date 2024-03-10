import "@/app/globals.css";
import { getServerSession } from "next-auth/next";
import { Inter } from "next/font/google";
import Provider from "./components/Provider";
import { Themes } from "./providers";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = {
  title: "Compliance | login",
  description: "Please log in",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  console.log(session);
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <body className="">
        <Provider session={session}>
          <Themes>{children}</Themes>
        </Provider>
      </body>
    </html>
  );
}
