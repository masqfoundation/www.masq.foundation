"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
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

// useLayoutEffect warns during static prerendering; it only matters in the browser.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function DonateTabs() {
  const [active, setActive] = useState(0);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const [animate, setAnimate] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const measure = useCallback(() => {
    const tab = tabRefs.current[active];
    if (tab) setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth });
  }, [active]);

  useIsomorphicLayoutEffect(measure, [measure]);

  useEffect(() => {
    // Only animate moves between tabs, not the first placement.
    const frame = requestAnimationFrame(() => setAnimate(true));
    const observer = new ResizeObserver(measure);
    tabRefs.current.forEach((tab) => tab && observer.observe(tab));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [measure]);

  const current = TABS[active];

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist" aria-label="Donation frequency">
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
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
        {indicator && (
          <div
            className={styles.tabIndicator}
            style={{ left: indicator.left, width: indicator.width, transition: animate ? "0.4s" : "none" }}
            aria-hidden="true"
          />
        )}
      </div>
      <div
        id={`${baseId}-panel`}
        className={styles.tabPanel}
        role="tabpanel"
        aria-labelledby={`${baseId}-${current.id}-tab`}
      >
        <div className={styles.amountsWrap}>
          <div className={styles.amounts}>
            {current.amounts.map(({ label, href }) => (
              <a key={href} className={styles.amount} href={href} target="_blank" rel="noopener">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
