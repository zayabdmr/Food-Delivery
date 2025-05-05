"use client";

import { useRef } from "react";
import Footer from "../components/Footer";

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const deliveryInputRef = useRef<any>(null);

  return (
    <div>
<<<<<<< HEAD
      <Header deliveryInputRef={deliveryInputRef} />
=======
      {/* <Header /> */}
>>>>>>> d3fc2883294220f9994d8314803c8ffbf16f9777
      {children}
      <Footer />
    </div>
  );
}
