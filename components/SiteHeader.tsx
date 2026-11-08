import Link from "next/link";
import styles from "./SiteHeader.module.css";

export const NAV_LINKS = [{ href: "/donate/", label: "Donate" }];

export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={`${styles.header} ${overlay ? styles.overlay : ""}`}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            src="/images/logo-64.webp"
            srcSet="/images/logo-64.webp 1x, /images/logo-128.webp 2x"
            alt=""
            width={44}
            height={44}
          />
          <span className={styles.brandName}>MASQ Foundation</span>
        </Link>
        <nav aria-label="Main" className={styles.nav}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.link}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
