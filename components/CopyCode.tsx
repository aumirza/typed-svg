import React from "react";

interface CopyCodeProps {
  width?: string;
  height?: string;
  children: React.ReactNode;
}

export const CopyCode: React.FC<CopyCodeProps> = ({
  width,
  height,
  children,
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyHandler = () => {
    if (!children) return;
    navigator.clipboard.writeText(children.toString());
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div
      style={{
        width: width,
        height: height,
      }}
      className="flex flex-col items-center my-1 bg-gray-800 p-4 rounded relative w-72 md:w-96 max-w-[95vw] overflow-auto"
    >
      <button
        onClick={copyHandler}
        className="absolute top-3 right-3 bg-white text-gray-900 p-1 rounded-md"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre>
        <code className="text-white min-w-max">{children}</code>
      </pre>
    </div>
  );
};
