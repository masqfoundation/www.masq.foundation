import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ui from "@/components/ui.module.css";
import DonateTabs from "./DonateTabs";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Donate" };

const WALLETS = [
  { label: "ENS", address: "masqfoundation.eth" },
  { label: "BTC", address: "bc1qvtvjnmhf5q6pycqlqejt55pnpvzwf33cj3ve60" },
  { label: "ETH", address: "0x9C2FA8Bae7E83515fa1B9A9d57609a2Ab54FbC9E" },
];

const EMAIL = <a href="mailto:info@masq.foundation">info@masq.foundation</a>;

const FAQ: { question: string; answer: React.ReactNode }[] = [
  {
    question: "Do I have to fill out the form if I donate in cryptocurrency?",
    answer:
      "We ask that you do please fill out the form whenever you make a donation in cryptocurrency. It's not required, but doing so will help notify us about your donation quickly and allow us to send you an acknowledgement.",
  },
  {
    question: "Do you accept other currencies?",
    answer: <>Yes, please contact us directly at {EMAIL} if you need help donating in any other form of fiat or cryptocurrency.</>,
  },
  {
    question: "I accidentally sent my cryptocurrency to the wrong address. Can you help?",
    answer:
      "Unfortunately, the nature of how cryptocurrency works prevents anyone (aside from the actual recipient) to be able to help in these situations. Please be very careful when you send crypto and copy the address exactly as shown. To prevent mistakes, we recommend you use our ENS address: masqfoundation.eth",
  },
  {
    question: "Can I get a refund for my donation?",
    answer: <>For refunds, please contact us directly at {EMAIL}.</>,
  },
  {
    question: "Do I need to make a donation to use any of the software provided by MASQ Foundation?",
    answer:
      "No. All of the software and information we create is permissively licensed and completely free to use. If someone is charging for access, it does not come from the MASQ Foundation and we cannot speak to its safety.",
  },
  {
    question: "Is my donation tax-deductible?",
    answer:
      "The MASQ Foundation is a recognized 501(c)(3) private foundation in the United States. Please consult your accountant or CPA for financial advice. You may need the following information for reporting purposes:\nTax ID Number (EIN): 85-1738862\nAddress: 268 Bush St #3940, San Francisco, CA 94104\nContact: Raymond Cheng, President",
  },
];

export default function Donate() {
  return (
    <PageShell>
      <div className={styles.page}>
        <section className={styles.intro}>
          <p className={`${ui.eyebrow} ${ui.eyebrowLarge}`}>Donate</p>
          <h1 className={ui.pageTitle}>Support our mission</h1>
          <p className={ui.lead}>
            Your support sustains our work for the public good: research, engineering, and education that make
            security, privacy, and decentralization accessible to everyone.
          </p>
        </section>

        <div className={styles.grid}>
          <section className={ui.panel}>
            <p className={ui.eyebrow}>01 — Fiat</p>
            <h2 className={ui.subheading}>Donate in fiat</h2>
            <DonateTabs />
          </section>

          <section className={ui.panel}>
            <p className={`${ui.eyebrow} ${ui.cyan}`}>02 — Crypto</p>
            <h2 className={ui.subheading}>Donate in cryptocurrency</h2>
            <dl className={styles.wallets}>
              {WALLETS.map(({ label, address }) => (
                <div key={label} style={{ display: "contents" }}>
                  <dt className={styles.walletLabel}>{label}</dt>
                  <dd className={styles.walletAddress}>{address}</dd>
                </div>
              ))}
            </dl>
            <iframe
              className={styles.formFrame}
              src="https://tally.so/embed/wzjBM8?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              title="Report your cryptocurrency donation"
            />
          </section>
        </div>

        <section className={ui.panel}>
          <p className={ui.eyebrow}>03 — Questions</p>
          <h2 className={ui.subheading}>FAQ</h2>
          <div className={styles.faq}>
            {FAQ.map(({ question, answer }) => (
              <div key={question} className={styles.faqItem}>
                <h3 className={styles.question}>{question}</h3>
                <p className={styles.answer}>{answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
