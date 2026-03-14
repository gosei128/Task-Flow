import { auth, signIn, signOut } from "@/auth";
import { Github } from "griddy-icons";
import SidebarGroup from "../SidebarGroup";
import { ChevronsUpDown } from "lucide-react";
import AuthModal from "../AuthModal";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
const Navbar = async () => {
  const session = await auth();

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-3xl font-extrabold text-dark-blue-600 ">
          TaskFlow
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div>
          {session && session.user ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="submit"
                    className="py-6"
                    variant="outline"
                    size="sm"
                  >
                    <div className="text-left flex items-center w-full gap-2">
                      <img
                        src={session.user.image}
                        className="rounded-full w-8"
                        alt=""
                      />
                      <div>
                        <h6>{session.user.name}</h6>
                        <h6>
                          <small className="text-gray-400">
                            {session.user.email}
                          </small>
                        </h6>
                      </div>
                      <ChevronsUpDown size={20} />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="translate-x-45 translate-y-15">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <strong className="text-gray-500">My Account</strong>
                    </DropdownMenuLabel>
                    <DropdownMenuItem variant="destructive">
                      <form
                        action={async () => {
                          "use server";
                          await signOut();
                        }}
                      >
                        <button type="submit" className="cursor-pointer">
                          Logout
                        </button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="text-center">
              <AuthModal>
                <Button
                  type="submit"
                  className="py-6 w-full bg-black text-white "
                  variant="outline"
                  size="sm"
                >
                  Login
                </Button>
              </AuthModal>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
export default Navbar;
