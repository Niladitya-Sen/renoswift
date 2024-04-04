"use client";

import { cn } from "@/lib/utils";

export default function ChatBot() {
    return (
        <iframe
            className={cn("h-[90svh] fixed right-0 bottom-0 z-50 w-[30rem]")}
            src="https://testapi.unomiru.com/api/Waysbot?bot=renoswift"
            title="chat-bot"
            frameBorder="0"
            width="50%"
            height="100%"
            allow="*"
        ></iframe>
    )
}
