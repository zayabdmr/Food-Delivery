import { LeftNavigation } from "./all-dishes-page/component/LeftNavigation";

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
