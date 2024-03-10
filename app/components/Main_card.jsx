"use client";

import { createContext } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  CardFooter,
  Divider,
  Link,
  Image,
  SelectSection,
} from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";

import Chat from "./Chat";
import Bread from "./Bread";
import { useState, useEffect } from "react";
import Db_switch from "./Db_switch";
import Select_db from "./Select_db";
import Chat_dummy from "./Chat_dummy";

export const KgContext = createContext();

const Main_card = ({ setIsHidden }) => {
  const [isConnected, setIsConnected] = useState("connecting");
  const [selectedDb, setSelectedDb] = useState();
  const [fullHeight, setFullHeight] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Checking processor status...");
      console.log(isConnected);
      try {
        const res = await fetch("api/status");
        const data = await res.json();
        if (data.status === 200) {
          setIsConnected(() => "connected");
        } else if (data.status === 500) {
          setIsConnected(() => "not connected");
        }
      } catch (err) {
        setIsConnected("not connected");
        console.error(err);
      }
    };
    //const intervalId = setInterval(fetchData, 50000);
    fetchData();
  }, []);

  return (
    <KgContext.Provider
      value={{
        isConnected: isConnected,
        database: selectedDb,
        fullHeight: fullHeight,
        setFullHeight: setFullHeight,
        setIsHidden: setIsHidden,
      }}
    >
      <Bread isHidden={fullHeight} />
      <div
        className={`flex w-full flex-col items-center justify-center ${
          !fullHeight ? "h-[calc(100dvh-0px)]" : ""
        }`}
      >
        <Select_db onDatabaseSet={setSelectedDb} isHidden={fullHeight} />
        <Card
          className={`max-w-[400px] m-auto mt-5 h-full ${
            fullHeight ? " w-[85%]" : "w-[95%]"
          }`}
        >
          <CardHeader className="flex justify-between">
            <div className="flex justify-between w-full">
              <div className="flex gap-3">
                <Image
                  alt="neurasense logo"
                  height={40}
                  radius="sm"
                  src="Logomark.svg"
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md">Compliance</p>
                  <p className="text-small text-default-500">neurasense.io</p>
                </div>
              </div>

              <div>
                <Chip
                  color={
                    isConnected == "connected"
                      ? "success"
                      : isConnected == "connecting"
                      ? "warning"
                      : "danger"
                  }
                  variant="dot"
                >
                  <p className="text-small text-default-500">{isConnected}</p>
                </Chip>
              </div>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex justify-between flex-col gap-3 h-full">
              {<Chat type={true} database={selectedDb} />}
              {/*<Chat_dummy />*/}
            </div>
          </CardBody>
          <Divider />
        </Card>
      </div>
    </KgContext.Provider>
  );
};

export default Main_card;
