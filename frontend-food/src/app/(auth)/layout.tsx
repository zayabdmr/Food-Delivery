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

      <div className="hidden md:flex w-[60%] h-full items-center justify-center p-[20px]">
        <div className="w-full h-full rounded-[16px] overflow-hidden">
          <img
            src="delivery.png"
            alt="Delivery Background"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
