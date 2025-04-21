import { LeftNavigation } from "./admin/component/LeftNavigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div>
        <LeftNavigation />
      </div>

      <div>{children}</div>
    </div>
  );
}
