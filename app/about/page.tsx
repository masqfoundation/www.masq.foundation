import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";

export const metadata: Metadata = { title: "About" };

const ABOUT = `The MASQ Foundation became a 501(c)(3) nonprofit in 2020 to support a common belief: that people should have access to secure technologies that empower and protect individuals and local communities, such that power is decentralized among many diverse groups. Too much of our world has been concentrated into incredibly powerful centralized infrastructure. Whoever controls that infrastructure holds a unilateral power over the products that increasingly shape our lived experience and influence our lives.

With the advent of cryptography and decentralized protocols, we can create new alternative primitives that give power back to the individual. Self-custody means that users have the ultimate authority over what happens to their data and digital assets. Decentralized protocols mean that users can assemble and coordinate while reducing the undue influence of third-parties. On top of this foundation, we want to build towards a society where new forms of community governance and economic markets can emerge, while spurring an innovation engine that can rival and surpass the extractive companies of today. A digital world built on public goods and open source software that put people and their rights first.

`;

export default function About() {
  return <SimplePage title="About">{ABOUT}</SimplePage>;
}
