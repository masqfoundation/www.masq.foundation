import { DiscordIcon, GitHubIcon, InstagramIcon, TwitterIcon } from "./icons";
import styles from "./SiteFooter.module.css";

const SOCIAL_LINKS = [
  { href: "https://twitter.com/MASQFoundation", label: "Twitter", Icon: TwitterIcon },
  { href: "https://github.com/masqfoundation", label: "GitHub", Icon: GitHubIcon },
  { href: "https://discord.gg/WSacbme", label: "Discord", Icon: DiscordIcon },
  { href: "https://www.instagram.com/masqfoundation/", label: "Instagram", Icon: InstagramIcon },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandColumn}>
            <div className={styles.title}>MASQ Foundation</div>
            <div className={styles.connect}>
              <div className={styles.white}>Connect with us</div>
              <div className={styles.socials}>
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a key={href} className={styles.social} href={href} target="_blank" rel="noopener" aria-label={label}>
                    <Icon className={styles.socialIcon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.white}>Find us on </div>
          <a href="https://opencollective.com/masqfoundation" target="_blank" rel="noopener">
            Open Collective
          </a>
        </div>
        <div className={styles.row}>
          <div className={styles.copyright}>
            © MASQ Foundation. All rights reserved. Site proudly built with{" "}
            <a href="https://www.plasmic.app?ref=ryscheng" target="_blank" rel="noopener">
              Plasmic
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}
