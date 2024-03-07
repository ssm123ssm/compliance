"use client";

import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { Textarea, Avatar } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Markdown from "react-markdown";
import { useSession } from "next-auth/react";
import { Snippet } from "@nextui-org/react";

export default function Chat({ type }) {
  console.log(type);
  const { data: session } = useSession();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: type ? "/api/kg" : "/api/chat",
  });

  const chatContainerRef = useRef(null);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      handleSubmit(e);
    }
  };
  useEffect(() => {
    // Scroll to the bottom of the chat container when messages update
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-3">
      <div className="h-[200px] overflow-auto" ref={chatContainerRef}>
        <div className="">
          {messages.map((m, index) => (
            <div key={index} className="flex text-small my-3 text-default-600">
              {m.role === "user" ? (
                <div className="flex gap-3 justify-start w-full">
                  <div className="w-10">
                    <Avatar src={session?.user?.image} size="sm" />
                  </div>
                  <div className="bg-default/40 p-2 rounded-lg w-[70%]">
                    {" "}
                    <Markdown className="antialiased">{m.content}</Markdown>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 justify-end w-full">
                  <div className="bg-default/20 p-2 rounded-lg w-[70%] pr-4">
                    <Markdown className="antialiased text-end">
                      {m.content}
                    </Markdown>
                  </div>

                  <div className="w-10">
                    <Avatar src={"Logomark.svg"} size="sm" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <Textarea
            label="Description"
            placeholder="Enter your question"
            className="w-full"
            value={input}
            onChange={handleInputChange}
            maxRows={3}
            rows={3}
            onKeyDown={handleKeyDown}
          />

          <button
            type="submit"
            className="absolute top-2 text-default-500 text-sm right-5 hover:cursor-pointer hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
}
