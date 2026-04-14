import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AnalyticsBootstrap } from "@/components/analytics";
import { InstallBanner } from "@/components/install-banner";
import { Navbar } from "@/components/navbar";
import { PushBootstrap } from "@/components/push-bootstrap";

const heading = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading"
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://web.shortfundly.com"),
  title: {
    default: "Shortfundly | Short Films & Indie Cinema",
    template: "%s | Shortfundly"
  },
  description:
    "Watch award-winning short films, documentaries, animation, and indie stories on Shortfundly.",
  keywords: [
    "short films",
    "indie cinema",
    "film festival",
    "OTT",
    "Shortfundly"
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://web.shortfundly.com",
    title: "Shortfundly | Short Films & Indie Cinema",
    description:
      "Discover short films, continue watching, and submit your film festival picks.",
    siteName: "Shortfundly"
  },
  twitter: {
    card: "summary_large_image",
    title: "Shortfundly",
    description:
      "Award-winning short films, indie cinema, and festival-ready stories."
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-M9HDWD";

  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="google-site-verification" content="shortfundly-verification" />
        <Script id="datalayer-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || []; window.gtag = function(){window.dataLayer.push(arguments);};`}
        </Script>
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`
          }}
        />
      </head>
      <body className="bg-black text-white">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AnalyticsBootstrap />
        <PushBootstrap />
        <InstallBanner />
        <Navbar />
        <main id="main-content" className="pt-28 md:pt-32">
          {children}
        </main>
      </body>
    </html>
  );
}
