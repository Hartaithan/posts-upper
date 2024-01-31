import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FC, PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Posts Upper",
  description: "Posts Upper App",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
