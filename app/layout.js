import "@/app/globals.css";
import { getServerSession } from "next-auth/next";
import { Inter } from "next/font/google";
import Provider from "./components/Provider";
import { Themes } from "./providers";
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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body className="">
        <Provider session={session}>
          <Themes>{children}</Themes>
        </Provider>
      </body>
    </html>
  );
}
