"use client";

import { useId, useState } from "react";
import styles from "./page.module.css";

type Amount = { label: string; href: string };

const TABS: { id: "monthly" | "once"; label: string; amounts: Amount[] }[] = [
  {
    id: "monthly",
    label: "Donate Monthly",
    amounts: [
      { label: "$5", href: "https://buy.stripe.com/aEU8zx4a2dhad0c4gk" },
      { label: "$15", href: "https://buy.stripe.com/14keXVcGydhad0c9AD" },
      { label: "$25", href: "https://buy.stripe.com/3csdTR7mea4Y2ly146" },
      { label: "$50", href: "https://buy.stripe.com/bIYcPNeOG0uo9O0dQR" },
      { label: "$100", href: "https://buy.stripe.com/fZeaHFbCu5OI2ly288" },
    ],
  },
  {
    id: "once",
    label: "Donate Once",
    amounts: [
      { label: "$25", href: "https://buy.stripe.com/00g5nl5e61ys6BOfZ4" },
      { label: "$75", href: "https://buy.stripe.com/7sI7vteOG4KE9O0aEL" },
      { label: "$125", href: "https://buy.stripe.com/cN2dTReOG6SMgco14c" },
      { label: "$250", href: "https://buy.stripe.com/5kAbLJ5e65OI9O08wF" },
      { label: "$500", href: "https://buy.stripe.com/4gweXV4a2dha4tGbIS" },
      { label: "Other", href: "https://buy.stripe.com/aEU6rpeOGdhaaS43ch" },
    ],
  },
];

export default function DonateTabs() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const current = TABS[active];

  return (
    <>
      <div className={styles.tabList} role="tablist" aria-label="Donation frequency">
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            id={`${baseId}-${tab.id}-tab`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`${baseId}-panel`}
            className={styles.tab}
            onClick={() => setActive(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`${baseId}-panel`}
        className={styles.amounts}
        role="tabpanel"
        aria-labelledby={`${baseId}-${current.id}-tab`}
      >
        {current.amounts.map(({ label, href }) => (
          <a key={href} className={styles.amount} href={href} target="_blank" rel="noopener">
            {label}
          </a>
        ))}
      </div>
    </>
  );
}
