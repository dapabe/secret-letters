"use client";
import { Fragment, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Tab = {
  title: string;
  body: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  className?: string;
};

export function Tabs({ tabs, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div role="tablist" className={twMerge("tabs tabs-lifted", className)}>
      {tabs.map((tab, i) => (
        <Fragment key={tab.title}>
          <input
            type="radio"
            name={tab.title.split(" ").join("_")}
            role="tab"
            className="tab"
            onChange={() => setActiveTab(i)}
            checked={activeTab === i}
            aria-label={tab.title}
          />
          <div
            role="tabpanel"
            className="tab-content rounded-lg border-base-300 p-2"
          >
            {tab.body}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
