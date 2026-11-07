import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import DonateTabs from "./DonateTabs";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Donate" };

const WALLETS = [
  { label: "ENS", address: "masqfoundation.eth" },
  { label: "BTC", address: "bc1qvtvjnmhf5q6pycqlqejt55pnpvzwf33cj3ve60" },
  { label: "ETH", address: "0x9C2FA8Bae7E83515fa1B9A9d57609a2Ab54FbC9E" },
];

const FAQ: { question: string; answer: React.ReactNode }[] = [
  {
    question: "Do I have to fill out the form if I donate in cryptocurrency?",
    answer:
      "We ask that you do please fill out the form whenever you make a donation in cryptocurrency. It's not required, but doing so will help notify us about your donation quickly and allow us to send you an acknowledgement.",
  },
  {
    question: "Do you accept other currencies?",
    answer:
      "Yes, please contact us directly at info@masq.foundation if you need help donating in any other form of fiat or cryptocurrency.",
  },
  {
    question: "I accidentally sent my cryptocurrency to the wrong address. Can you help?",
    answer:
      "Unfortunately, the nature of how cryptocurrency works prevents anyone (aside from the actual recipient) to be able to help in these situations. Please be very careful when you send crypto and copy the address exactly as shown. To prevent mistakes, we recommend you use our ENS address: masqfoundation.eth",
  },
  {
    question: "Can I get a refund for my donation?",
    answer: "For refunds, please contact us directly at info@masq.foundation.",
  },
  {
    question: "Do I need to make a donation to use any of the software provided by MASQ Foundation?",
    answer:
      "No. All of the software and information we create is permissively licensed and completely free to use. If someone is charging for access, it does not come from the MASQ Foundation and we cannot speak to its safety.",
  },
  {
    question: "How will you use my donation?",
    answer: (
      <>
        We use all funds to create, improve, organize and promote open source software and documentation that is free to
        the public. You can help our mission to to help shape the next generation of computing on the Internet. For more
        information about the MASQ Foundation&apos;s finances, you can view our <a href="/public/">reports page</a>.
      </>
    ),
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
        <h1 className={styles.title}>Support our mission</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Donate in fiat</h2>
          <DonateTabs />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Donate in cryptocurrency</h2>
          <div className={styles.columns}>
            <div className={styles.column}>
              <iframe
                className={styles.formFrame}
                src="https://tally.so/embed/wzjBM8?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                title="Cryptocurrency donation form"
              />
            </div>
            <div className={styles.column}>
              <h3 className={styles.walletTitle}>Wallet Addresses</h3>
              <div className={styles.wallets}>
                <div className={styles.walletLabels}>
                  {WALLETS.map(({ label }) => (
                    <div key={label}>{label}</div>
                  ))}
                </div>
                <div className={styles.walletValues}>
                  {WALLETS.map(({ label, address }) => (
                    <div key={label}>{address}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faq}>
          <h2 className={styles.sectionTitle}>FAQ</h2>
          {FAQ.map(({ question, answer }) => (
            <FaqItem key={question} question={question} answer={answer} />
          ))}
        </section>
      </div>
    </PageShell>
  );
}

function FaqItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  return (
    <>
      <h3 className={styles.question}>{question}</h3>
      <div>{answer}</div>
    </>
  );
}
