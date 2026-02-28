import { auth, signIn, signOut } from "@/middleware/auth";
import { Github } from "griddy-icons";
import SidebarGroup from "../SidebarGroup";
import { ChevronsUpDown } from "lucide-react";
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
        <h1 className="text-3xl font-bold text-dark-blue-600 ">TaskFlow</h1>
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
                <DropdownMenuContent>
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

              {/* <button type="submit" className="cursor-pointer text-xs w-full">
                  <div className="text-left flex items-center gap-2">
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
                  </div>
                </button> */}
            </div>
          ) : (
            <div className="text-center">
              <div className="border-2 p-2 rounded-lg mb-2 bg-dark-blue-400 text-white border-dark-blue-500">
                <h1>Guest</h1>
              </div>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
                className=" border-2  cursor-pointer bg-[#131316] text-white rounded-lg p-3 ring-2  text-center"
              >
                <button
                  type="submit"
                  className="cursor-pointer w-full items-center gap-1 justify-center flex text-center"
                >
                  <Github size={20} />
                  Login with Github
                </button>
              </form>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
export default Navbar;
