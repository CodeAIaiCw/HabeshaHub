import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "HabeshaHub — Find. Connect. Thrive.",
  description: "The digital home for Ethiopians and Eritreans in North America."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
