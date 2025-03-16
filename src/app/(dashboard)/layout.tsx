import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const user = getCurrent();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="min-h-screen">
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px]">
          {/* this follows the screen expansion but after more expansion it will stop */}
          <div className="mx-auto max-w-screen-2xl h-full">
            {/* Navbar */}
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};
