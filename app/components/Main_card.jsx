"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";

import Chat from "./Chat";
import { useState, useEffect } from "react";
import Db_switch from "./Db_switch";

const Main_card = (props) => {
  const [isConnected, setIsConnected] = useState("connecting");

  useEffect(() => {
    // fetch data from a REST API, from localhost:5000/status with try catch
    console.log("Checking processor status...");
    const fetchData = async () => {
      try {
        const res = await fetch("api/status");
        const data = await res.json();
        if (data.status === 200) {
          setIsConnected("connected");
        }
        if (data.status === 500) {
          setIsConnected("not connected");
        }
        console.log(data);
      } catch (err) {
        setIsConnected("not connected");
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex mt-10 w-full flex-col items-center justify-center">
      <Tabs aria-label="Options" className="flex">
        <Tab
          key="chat"
          title="Chat"
          className="flex w-full items-center flex-col"
        >
          <Divider className="mb-5 w-[80%]" />
          <Card className="max-w-[400px] w-[90%] m-auto mt-5">
            <CardHeader className="flex justify-between">
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
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex justify-between flex-col gap-3">
                <p className="text-small text-default-500">
                  Knowledgebase status
                </p>
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

                <Chat type={false} />
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
  );
};

export default Main_card;
