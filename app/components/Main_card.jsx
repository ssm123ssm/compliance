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
import { useState, useEffect } from "react";
import Db_switch from "./Db_switch";
import Select_db from "./Select_db";

export const KgContext = createContext();

const Main_card = (props) => {
  const [isConnected, setIsConnected] = useState("connecting");
  const [selectedDb, setSelectedDb] = useState("none");

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
    const intervalId = setInterval(fetchData, 5000);
  }, []);

  return (
    <KgContext.Provider
      value={{ isConnected: isConnected, database: selectedDb }}
    >
      <div className="flex mt-10 w-full flex-col items-center justify-center">
        <h1>{selectedDb}</h1>
        <Select_db onDatabaseSet={setSelectedDb} />
        <Tabs aria-label="Options" className="flex">
          <Tab
            key="chat"
            title="Chat"
            className="flex w-full items-center flex-col"
          >
            <Divider className="mb-5 w-[80%]" />
            <Card className="max-w-[400px] w-[90%] m-auto mt-5">
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
                      <p className="text-small text-default-500">
                        neurasense.io
                      </p>
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
                      <p className="text-small text-default-500">
                        {isConnected}
                      </p>
                    </Chip>
                  </div>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex justify-between flex-col gap-3">
                  <Chat type={true} database={selectedDb} />
                </div>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link isExternal showAnchorIcon href="#">
                  Knowledgebase settings
                </Link>
              </CardFooter>
            </Card>
          </Tab>
          <Tab
            key="kb"
            title="Knowledge"
            className="flex w-full items-center flex-col"
          >
            <Divider className="mb-5 w-[80%]" />
            <p className="m-auto"></p>
          </Tab>
          <Tab
            key="config"
            title="Config"
            className="flex w-full items-center flex-col"
          >
            <Divider className="mb-5 w-[80%]" />
            <p className="m-auto"></p>
          </Tab>
        </Tabs>
      </div>
    </KgContext.Provider>
  );
};

export default Main_card;
