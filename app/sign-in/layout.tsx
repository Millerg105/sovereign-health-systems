import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | Sovereign Systems",
  description: "Access your Sovereign Systems command centre.",
  robots: { index: false, follow: false },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
