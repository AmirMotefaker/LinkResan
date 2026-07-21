"use client";

import { useState, ReactNode } from "react";

export default function Tooltip({ text, children }: { text: string; children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 z-[9999] whitespace-nowrap rounded-lg bg-gray-900 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-white shadow-xl pointer-events-none transition-opacity duration-200">
          {text}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-700"></div>
        </div>
      )}
    </div>
  );
}