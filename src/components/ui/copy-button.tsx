"use client";
import { useState } from "react";
import { CopyIcon, CheckCheckIcon } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [buttonState, setButtonState] = useState<boolean>(false);

  const copyToClipboard = async () => {
    try {
      // clipboard api to copy text
      await navigator.clipboard.writeText(text);
      setButtonState((prev) => !prev);
      console.log("copied to clipboard");
    } catch (err) {
      console.log("Failed to copy error");
    }
  };

  return (
    <div className="flex items-center">
      {buttonState ? (
        <button onClick={copyToClipboard} title="copy">
          <CopyIcon className="w-3 cursor-pointer h-3 text-neutral-500" />
        </button>
      ) : (
        <button onClick={() => setButtonState((prev) => !prev)} title="copied">
          <CheckCheckIcon
            className="w-4 cursor-pointer h-4 text-neutral-500"
          />
        </button>
      )}
    </div>
  );
}
