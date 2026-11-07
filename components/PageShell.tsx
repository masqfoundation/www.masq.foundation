import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import styles from "./PageShell.module.css";

type PageShellProps = {
  children: React.ReactNode;
  /** Home page: the header floats over the full-bleed hero. */
  overlayHeader?: boolean;
};

export default function PageShell({ children, overlayHeader = false }: PageShellProps) {
  return (
    <div className={styles.page}>
      <SiteHeader fixed={overlayHeader} />
      <main className={styles.main}>
        <div className={`${styles.content} ${overlayHeader ? styles.fullWidth : ""}`}>
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
