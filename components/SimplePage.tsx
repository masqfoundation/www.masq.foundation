import PageShell from "./PageShell";
import styles from "./SimplePage.module.css";
import ui from "./ui.module.css";

/** A page title followed by a block of copy. */
export default function SimplePage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <PageShell>
      <section className={styles.section}>
        <p className={`${ui.eyebrow} ${ui.eyebrowLarge}`}>MASQ Foundation</p>
        <h1 className={ui.pageTitle}>{title}</h1>
        <div className={styles.text}>{children}</div>
      </section>
    </PageShell>
  );
}
