"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import styles from "./SiteHeader.module.css";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/grants/", label: "Grants" },
  { href: "/donate/", label: "Donate" },
];

export default function SiteHeader({ fixed = false }: { fixed?: boolean }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  return (
    <header className={`${styles.header} ${fixed ? styles.fixed : ""}`}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            src="/images/logo-64.webp"
            srcSet="/images/logo-64.webp 1x, /images/logo-128.webp 2x"
            alt=""
            width={64}
            height={64}
          />
          <span className={styles.brandName}>MASQ Foundation</span>
        </Link>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
        <nav id={menuId} className={`${styles.menu} ${open ? styles.menuOpen : ""}`}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.link} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
