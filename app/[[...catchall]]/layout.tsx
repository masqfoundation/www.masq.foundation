import * as React from "react";

export default function PlasmicLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return <div className="container">{children}</div>;
}
