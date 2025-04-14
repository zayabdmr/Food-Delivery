import { AuthBigImage } from "../components/AuthBigImage";

export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <div className="w-[60%] h-full flex items-center justify-end">
        {children}
      </div>
      <AuthBigImage />
    </div>
  );
}
