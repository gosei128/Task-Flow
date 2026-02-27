import Navbar from "../component/partials/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider className="h-full">
      <Navbar />
      <main className="antialiased flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
