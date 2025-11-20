import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LogoutButton from "../lib/LogoutButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyShop",
  description: "Ecommerce project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="navbar navbar-light bg-light px-3 d-flex justify-content-between">
          <a className="navbar-brand" href="/">
            MyShop
          </a>

          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-2">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="/cart">
                Cart
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="/checkout">
                Checkout
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="/admin">
                Admin
              </a>
            </li>
            <li className="nav-item mx-2">
              <LogoutButton />
            </li>
          </ul>
        </nav>

        {children}
      </body>
    </html>
  );
}
