export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex w-full md:w-[40%] items-center justify-center bg-white">
        {children}
      </div>

      <div className="hidden md:flex w-[60%] h-full items-center justify-center p-5">
        <div className="w-full h-full rounded-2xl overflow-hidden">
          <img
            src="delivery.png"
            alt="Delivery Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
