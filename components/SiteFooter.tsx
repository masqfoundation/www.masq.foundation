import { DiscordIcon, GitHubIcon, InstagramIcon, OpenCollectiveIcon, TwitterIcon } from "./icons";
import styles from "./SiteFooter.module.css";

const SOCIAL_LINKS = [
  { href: "https://twitter.com/MASQFoundation", label: "Twitter", Icon: TwitterIcon },
  { href: "https://github.com/masqfoundation", label: "GitHub", Icon: GitHubIcon },
  { href: "https://discord.gg/WSacbme", label: "Discord", Icon: DiscordIcon },
  { href: "https://www.instagram.com/masqfoundation/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://opencollective.com/masqfoundation", label: "Open Collective", Icon: OpenCollectiveIcon },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.socials}>
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a key={href} className={styles.social} href={href} target="_blank" rel="noopener" aria-label={label}>
              <Icon className={styles.icon} />
            </a>
          ))}
        </div>
        <div>© MASQ Foundation. All rights reserved.</div>
      </div>
    </footer>
  );
}
