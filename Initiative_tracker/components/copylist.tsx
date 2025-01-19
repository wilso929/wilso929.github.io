import { Button } from "@/components/ui/button"
import { Char } from "@/lib/utils";
import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

export default function CopyList({
    chars
}: {
    chars: Char[]
}) {
    const [copyList, setCopyList] = useState<string>("");

    useEffect(() => {
        setCopyList(chars.map(a => a.name).join(" - "));
    }, [chars]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 lg:grid-cols-9 gap-4">
            <h1 className="bg-black border-4 content-center pl-4 col-span-8">{copyList}</h1>
            <Button className="col-span-1 justify-self-start"
                onClick={() => {navigator.clipboard.writeText(copyList)}}
            >
                Copy
            </Button>
        </div>
    );
}