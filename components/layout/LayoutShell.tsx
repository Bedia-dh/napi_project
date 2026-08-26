"use client";

import { useState } from "react";
import Navbar from "./Navbar";
// Ticker temporarily hidden per request — re-enable by uncommenting below
// import Ticker from "./Ticker";
import Footer from "./Footer";
import SearchOverlay from "./SearchOverlay";
import BackToTop from "@/components/ui/BackToTop";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      {/* <Ticker onSearchOpen={() => setSearchOpen(true)} /> */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
