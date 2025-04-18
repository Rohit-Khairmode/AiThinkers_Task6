import Link from "next/link";
import React from "react";

function RedirectLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} style={{ color: "#0cbfce" }}>
      {children}
    </Link>
  );
}

export default RedirectLink;
