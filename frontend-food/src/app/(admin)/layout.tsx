import { LeftNavigation } from "./alldish/component/LeftNavigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <div className="w-[225px] bg-white">
        <LeftNavigation />
      </div>

      <div>{children}</div>
    </div>
  );
}
