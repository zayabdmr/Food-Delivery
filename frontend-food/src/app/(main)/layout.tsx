import Footer from "../components/Footer";

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <Header /> */}
      {children}
      <Footer />
    </div>
  );
}
