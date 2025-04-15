import { AuthBigImage } from "../components/AuthBigImage";

export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        {children}
      </div>

      <div className="hidden md:flex w-2/3 h-full items-center justify-center p-4">
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
          <AuthBigImage />
        </div>
      </div>
    </div>
  );
}
