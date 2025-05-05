"use client";

import { useRef } from "react";
import Footer from "../components/Footer";
import { Header } from "../components/Header";

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const deliveryInputRef = useRef<any>(null);

  return (
    <div>
      <Header deliveryInputRef={deliveryInputRef} />
      {children}
      <Footer />
    </div>
  );
}
