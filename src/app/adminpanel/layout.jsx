import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
export default function RootLayout({ children }) {
  return (
    <>
      <head>
      </head>
      <body>{children}</body>
    </>
  );
}
