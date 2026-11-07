import PageShell from "./PageShell";
import styles from "./SimplePage.module.css";

/** A centered page title followed by a block of copy. */
export default function SimplePage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <PageShell>
      <section className={styles.section}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.body}>
          <div className={styles.text}>{children}</div>
        </div>
      </section>
    </PageShell>
  );
}
