import Navbar from "../component/partials/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <Navbar />
      <main className="antialiased w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
