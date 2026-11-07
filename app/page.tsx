import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import { ChevronDownIcon } from "@/components/icons";
import styles from "./page.module.css";

type Card = {
  title: string;
  image: { src: string; width: number; height: number };
  body: React.ReactNode;
  spaced?: boolean;
};

const CARDS: Card[] = [
  {
    title: "Our Mission",
    image: { src: "/images/mission.webp", width: 1900, height: 1188 },
    body: "The MASQ Foundation supports security, privacy, and decentralization for the public good. We research, engineer, and promote widely-accessible technologies that empower individual users and local communities. Our goal is to make both the digital and physical worlds more secure, respect privacy, and decentralized in power, while spurring new economic, coordination, and governance models. We believe that decentralization can lead to a world that out-innovates the extractive companies of today.\n",
  },
  {
    title: "Our Vision",
    image: { src: "/images/vision.webp", width: 700, height: 500 },
    body: "As a society, shared digital spaces are where we spend the majority of our time now. Yet, we are left with the poor false choice of spaces owned by others, who have different goals from our own. Every person on this planet deserves a private personal space where they can be true to themselves, think freely, communicate safely with friends and family, act independently, and exercise their free will, free from undue influence. Our liberty, our human dignity, and a healthy civil society depends on it. \n",
  },
  {
    title: "Our Goals",
    image: { src: "/images/goals.webp", width: 700, height: 500 },
    spaced: true,
    body: (
      <>
        {"The MASQ Foundation supports a number of programs that advance our mission, including:\n\n"}
        <ul className={styles.cardList}>
          <li>(1) grant programs for developers who build open source technologies</li>
          <li>(2) fiscal sponsorship for mission-aligned non-profit projects</li>
          <li>(3) educational programs, including classes, conferences, and documentation</li>
        </ul>
      </>
    ),
  },
];

export default function Home() {
  return (
    <PageShell overlayHeader>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>{"MASQ\nFoundation"}</h1>
            <div className={`${styles.eyebrow} ${styles.tagline}`}>Machines and Security Quest</div>
          </div>
          <div className={styles.scrollCue}>
            <a className={styles.scrollLink} href="#subscribe" aria-label="Scroll to content">
              <ChevronDownIcon className={styles.chevron} />
            </a>
          </div>
        </div>
      </section>
      <div id="subscribe" />
      <div className={styles.content}>
        <section className={styles.intro}>
          <h2 className={`${styles.eyebrow} ${styles.introHeading}`}>
            Building a more secure and private future for all
          </h2>
          <div className={styles.cardsWrap}>
            <div className={styles.cards}>
              {CARDS.map((card) => (
                <Reveal key={card.title} className={styles.card}>
                  <div className={`${styles.cardInner} ${card.spaced ? styles.cardInnerSpaced : ""}`}>
                    <div className={styles.cardMedia}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className={styles.cardImage}
                        src={card.image.src}
                        width={card.image.width}
                        height={card.image.height}
                        style={{ aspectRatio: `${card.image.width} / ${card.image.height}` }}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.cardText}>
                        <h3 className={styles.cardTitle}>{card.title}</h3>
                        <div>{card.body}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <div className={styles.join}>
          <div className={styles.joinCard}>
            <h2 className={`${styles.eyebrow} ${styles.joinHeading}`}>Come join us on this quest</h2>
            <iframe
              className={styles.joinFrame}
              src="https://masqfoundation.substack.com/embed"
              title="Subscribe to the MASQ Foundation newsletter"
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
