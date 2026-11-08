import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import styles from "./PageShell.module.css";

type PageShellProps = {
  children: React.ReactNode;
  /** Home page: the header floats over the full-screen hero. */
  overlayHeader?: boolean;
  /** Drawn behind the header, content and footer (the home page's particle field). */
  background?: React.ReactNode;
};

export default function PageShell({ children, overlayHeader = false, background }: PageShellProps) {
  return (
    <div className={styles.page}>
      {background}
      <SiteHeader overlay={overlayHeader} />
      <main className={styles.main}>{children}</main>
      <SiteFooter />
    </div>
  );
}
