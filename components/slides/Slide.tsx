import React, { ReactNode } from "react";

function Slide({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div
      className={`min-h-[750px] [@media(max-height:1000px)]:min-h-screen w-full relative pt-32 ${className}`}
    >
      {children}
    </div>
  );
}

export default Slide;
