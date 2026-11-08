import Link from "next/link";
import PageShell from "@/components/PageShell";
import ParticleField from "@/components/ParticleField";
import { ChevronDownIcon } from "@/components/icons";
import ui from "@/components/ui.module.css";
import styles from "./page.module.css";

const PROGRAMS = [
  { name: "Research / Grants", detail: "To create the digital and physical institutions of the future." },
  { name: "Fiscal sponsorship", detail: "For mission-aligned non-profit projects." },
  { name: "Education", detail: "Classes, conferences, and documentation." },
];

function Chapter({ id, wide = false, children }: { id?: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        <div className={`${ui.glass} ${wide ? styles.cardWide : styles.card}`}>{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageShell overlayHeader background={<ParticleField />}>
      <section className={`${styles.section} ${styles.hero}`}>
        <p className={`${ui.eyebrow} ${ui.eyebrowLarge}`}>Machines and Security Quest</p>
        <h1 className={ui.display}>MASQ Foundation</h1>
        <p className={`${ui.lead} ${styles.heroLead}`}>
          Building a more secure and private future for all, online and in the places we live.
        </p>
        <a className={styles.scrollCue} href="#where-we-live">
          <span>Scroll to begin</span>
          <ChevronDownIcon />
        </a>
      </section>

      <Chapter id="where-we-live">
        <p className={`${ui.eyebrow} ${ui.steel}`}>01 — Where we live now</p>
        <h2 className={ui.heading}>The spaces we live in are increasingly owned by others.</h2>
        <p className={ui.body}>
          We spend our lives in shared spaces, both the digital platforms we use every day and the physical places we
          call home. Too often, both are owned by others whose goals differ from our own.
        </p>
        <p className={ui.body}>
          Our data and our communication sit on servers we don&apos;t control, and secure, affordable housing is out of
          reach for too many families.
        </p>
      </Chapter>

      <Chapter id="vision">
        <p className={ui.eyebrow}>02 — Our vision</p>
        <h2 className={ui.heading}>Every person deserves a space of their own.</h2>
        <p className={ui.body}>
          Online, a private space where you can be true to yourself, think freely, communicate safely with friends and
          family, and act independently, free from undue influence.
        </p>
        <p className={ui.body}>Offline, a secure and affordable home where you and your community can put down roots.</p>
        <p className={ui.body}>Our liberty, our human dignity, and a healthy civil society depend on it.</p>
      </Chapter>

      <Chapter id="mission">
        <p className={`${ui.eyebrow} ${ui.cyan}`}>03 — Our mission</p>
        <h2 className={ui.heading}>Power, decentralized among many.</h2>
        <p className={ui.body}>
          The MASQ Foundation supports security, privacy, and decentralization for the public good, in both the digital
          and physical worlds.
        </p>
        <p className={ui.body}>
          We research, engineer, and promote widely-accessible technologies, and we support housing and community
          spaces, including low-income housing, that empower individuals and local communities.
        </p>
        <p className={ui.body}>
          We believe decentralizing both software and ownership can spur new economic, coordination, and governance
          models that out-innovate the extractive companies of today.
        </p>
      </Chapter>

      <Chapter id="goals" wide>
        <p className={ui.eyebrow}>04 — Our goals</p>
        <h2 className={ui.heading}>Three programs that reinforce each other.</h2>
        <ol className={styles.programs}>
          {PROGRAMS.map(({ name, detail }, index) => (
            <li key={name} className={styles.program}>
              <span className={styles.programNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <div className={styles.programName}>{name}</div>
                <div className={ui.body}>{detail}</div>
              </div>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter id="join" wide>
        <p className={ui.eyebrow}>05 — The quest</p>
        <h2 className={ui.heading}>Come join us on this quest.</h2>
        <p className={ui.body}>Get updates on our grants, projects, and events.</p>
        <form
          className={styles.subscribe}
          action="https://masqfoundation.substack.com/api/v1/free?nojs=true"
          method="post"
          target="_blank"
        >
          <label htmlFor="subscribe-email" className="visually-hidden">
            Email address
          </label>
          <input
            id="subscribe-email"
            className={styles.email}
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          <button className={ui.button} type="submit">
            Subscribe
          </button>
        </form>
        <Link className={`${ui.ghostButton} ${styles.support}`} href="/donate/">
          Support our mission
        </Link>
      </Chapter>
    </PageShell>
  );
}
