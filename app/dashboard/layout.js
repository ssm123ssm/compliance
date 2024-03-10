import Head from "next/head";

export const metadata = {
  title: "Compliance Dashboard",
  description: "Neurasense",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      {children}
    </div>
  );
};

export default layout;
